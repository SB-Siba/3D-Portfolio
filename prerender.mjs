// prerender.mjs
// Generates static HTML for each route so crawlers see real content.
// Runs AFTER `vite build` (dist/ must already exist).
// Does NOT touch GITHUB_TOKEN — that lives only in the Vercel function.

import puppeteer from "puppeteer";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import http from "http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "dist");
const PORT = 4173;
const BASE = `http://localhost:${PORT}`;

const ROUTES = ["/", "/all-projects", "/services"];
const RENDER_WAIT_MS = 5000;

// Poll the server until it responds (max ~20s)
function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const attempt = () => {
      const req = http.get(url, (res) => {
        res.resume();
        if (res.statusCode && res.statusCode < 500) {
          resolve();
        } else {
          retry();
        }
      });
      req.on("error", retry);
      req.setTimeout(2000, () => {
        req.destroy();
        retry();
      });
    };
    const retry = () => {
      if (Date.now() - start > timeoutMs) {
        reject(new Error(`Server at ${url} never became ready`));
        return;
      }
      setTimeout(attempt, 300);
    };
    attempt();
  });
}

async function startPreviewServer() {
  const child = spawn(
    "npm",
    ["run", "preview", "--", "--port", String(PORT), "--strictPort"],
    {
      cwd: __dirname,
      stdio: ["ignore", "pipe", "pipe"],
      shell: true,
    }
  );

  child.stdout.on("data", (d) => process.stdout.write(d.toString()));
  child.stderr.on("data", (d) => process.stderr.write(d.toString()));

  child.on("error", (err) => {
    console.error("Preview process error:", err);
  });

  await waitForServer(BASE);
  return child;
}

async function prerender() {
  if (!fs.existsSync(DIST)) {
    console.error("❌ dist/ not found. Run `npm run build` first.");
    process.exit(1);
  }

  console.log("🚀 Starting preview server...");
  const server = await startPreviewServer();

  console.log("🧭 Launching headless browser...");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    for (const route of ROUTES) {
      const url = `${BASE}${route}`;
      console.log(`📄 Rendering ${route}...`);

      const page = await browser.newPage();
      await page.setViewport({ width: 1400, height: 900 });
      await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

      await new Promise((r) => setTimeout(r, RENDER_WAIT_MS));

      const html = await page.content();

      const outPath =
        route === "/"
          ? path.join(DIST, "index.html")
          : path.join(DIST, route.replace(/^\//, ""), "index.html");

      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, html, "utf8");

      console.log(`   ✅ saved to ${path.relative(__dirname, outPath)}`);
      await page.close();
    }
  } finally {
    await browser.close();
    server.kill();
    console.log("✅ Prerender complete.");
  }
}

prerender().catch((err) => {
  console.error("❌ Prerender failed:", err);
  process.exit(1);
});