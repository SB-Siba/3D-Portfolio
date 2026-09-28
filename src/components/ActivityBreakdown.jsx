import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const COLORS = {
  commits: "#39d353",
  issues: "#2ea043",
  pullRequests: "#26a641",
  reviews: "#0e4429",
};

const LABELS = {
  commits: "Commits",
  issues: "Issues",
  pullRequests: "Pull requests",
  reviews: "Code review",
};

const ActivityBreakdown = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/github-graph")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (json.error) throw new Error(JSON.stringify(json.error));
        setData(json.breakdown);
        setLoading(false);
      })
      .catch((err) => {
        console.error("ActivityBreakdown error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="w-full flex flex-col items-center py-4 animate-pulse">
        <svg
          width={260}
          height={260}
          viewBox="0 0 260 260"
          className="overflow-visible"
        >
          {/* Axis lines skeleton */}
          <line
            x1="130"
            y1="40"
            x2="130"
            y2="130"
            stroke="#161b22"
            strokeWidth={1.5}
          />
          <line
            x1="130"
            y1="130"
            x2="220"
            y2="130"
            stroke="#161b22"
            strokeWidth={1.5}
          />
          <line
            x1="130"
            y1="130"
            x2="130"
            y2="220"
            stroke="#161b22"
            strokeWidth={1.5}
          />
          <line
            x1="130"
            y1="130"
            x2="40"
            y2="130"
            stroke="#161b22"
            strokeWidth={1.5}
          />

          {/* Filled polygon skeleton */}
          <polygon
            points="130,70 180,130 130,180 80,130"
            fill="#0e4429"
            fillOpacity={0.5}
          />

          {/* Dots skeleton */}
          <circle cx="130" cy="70" r="4" fill="#161b22" />
          <circle cx="180" cy="130" r="4" fill="#161b22" />
          <circle cx="130" cy="180" r="4" fill="#161b22" />
          <circle cx="80" cy="130" r="4" fill="#161b22" />
          <circle cx="130" cy="130" r="3" fill="#161b22" />

          {/* Labels skeleton (top, right, bottom, left) */}
          <rect x="110" y="10" width="40" height="10" rx="3" fill="#161b22" />
          <rect x="110" y="24" width="60" height="10" rx="3" fill="#161b22" />

          <rect x="240" y="122" width="30" height="10" rx="3" fill="#161b22" />
          <rect x="240" y="138" width="50" height="10" rx="3" fill="#161b22" />

          <rect x="110" y="238" width="40" height="10" rx="3" fill="#161b22" />
          <rect x="95" y="252" width="70" height="10" rx="3" fill="#161b22" />

          <rect x="-10" y="122" width="30" height="10" rx="3" fill="#161b22" />
          <rect x="-20" y="138" width="50" height="10" rx="3" fill="#161b22" />
        </svg>
      </div>
    );

  if (error || !data)
    return (
      <div className="text-red-400 text-sm py-4 text-center">
        Could not load activity data.
        <div className="text-slate-500 text-xs mt-1">{error}</div>
      </div>
    );

  const total =
    data.commits + data.issues + data.pullRequests + data.reviews || 1;

  // Percentages (rounded)
  const pct = {
    commits: Math.round((data.commits / total) * 100),
    issues: Math.round((data.issues / total) * 100),
    pullRequests: Math.round((data.pullRequests / total) * 100),
    reviews: Math.round((data.reviews / total) * 100),
  };

  // SVG geometry — 4 quadrants around the centre
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 90;

  // Order: top = reviews, right = issues, bottom = pullRequests, left = commits
  const points = [
    { key: "reviews", angle: -Math.PI / 2, value: data.reviews },
    { key: "issues", angle: 0, value: data.issues },
    { key: "pullRequests", angle: Math.PI / 2, value: data.pullRequests },
    { key: "commits", angle: Math.PI, value: data.commits },
  ];

  const max =
    Math.max(data.commits, data.issues, data.pullRequests, data.reviews) || 1;

  const scaled = points.map((p) => {
    const r = (p.value / max) * radius;
    return {
      ...p,
      x: cx + Math.cos(p.angle) * r,
      y: cy + Math.sin(p.angle) * r,
      endX: cx + Math.cos(p.angle) * radius,
      endY: cy + Math.sin(p.angle) * radius,
    };
  });

  const polygon = scaled.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full flex flex-col items-center py-4"
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        {/* Axis lines */}
        {scaled.map((p) => (
          <line
            key={`axis-${p.key}`}
            x1={cx}
            y1={cy}
            x2={p.endX}
            y2={p.endY}
            stroke={COLORS[p.key]}
            strokeWidth={1.5}
          />
        ))}

        {/* Filled polygon */}
        <polygon
          points={polygon}
          fill={COLORS.commits}
          fillOpacity={0.35}
          stroke={COLORS.commits}
          strokeWidth={2}
        />

        {/* Dots on each axis */}
        {scaled.map((p) => (
          <g key={`dot-${p.key}`}>
            <circle cx={p.x} cy={p.y} r={4} fill={COLORS[p.key]} />
            <circle
              cx={p.x}
              cy={p.y}
              r={7}
              fill="none"
              stroke={COLORS[p.key]}
              strokeOpacity={0.4}
              strokeWidth={1.5}
            />
          </g>
        ))}

        {/* Centre dot */}
        <circle cx={cx} cy={cy} r={3} fill="#c9d1d9" />

        {/* Percent + label texts */}
        {/* Reviews — top */}
        <text
          x={cx}
          y={cy - radius - 30}
          textAnchor="middle"
          fill="#c9d1d9"
          fontSize="13"
        >
          {pct.reviews}%
        </text>
        <text
          x={cx}
          y={cy - radius - 14}
          textAnchor="middle"
          fill="#8b949e"
          fontSize="12"
        >
          {LABELS.reviews}
        </text>

        {/* Issues — right */}
        <text
          x={cx + radius + 20}
          y={cy - 4}
          textAnchor="start"
          fill="#c9d1d9"
          fontSize="13"
        >
          {pct.issues}%
        </text>
        <text
          x={cx + radius + 20}
          y={cy + 14}
          textAnchor="start"
          fill="#8b949e"
          fontSize="12"
        >
          {LABELS.issues}
        </text>

        {/* PRs — bottom */}
        <text
          x={cx}
          y={cy + radius + 22}
          textAnchor="middle"
          fill="#c9d1d9"
          fontSize="13"
        >
          {pct.pullRequests}%
        </text>
        <text
          x={cx}
          y={cy + radius + 38}
          textAnchor="middle"
          fill="#8b949e"
          fontSize="12"
        >
          {LABELS.pullRequests}
        </text>

        {/* Commits — left */}
        <text
          x={cx - radius - 20}
          y={cy - 4}
          textAnchor="end"
          fill="#c9d1d9"
          fontSize="13"
        >
          {pct.commits}%
        </text>
        <text
          x={cx - radius - 20}
          y={cy + 14}
          textAnchor="end"
          fill="#8b949e"
          fontSize="12"
        >
          {LABELS.commits}
        </text>
      </svg>
    </motion.div>
  );
};

export default ActivityBreakdown;
