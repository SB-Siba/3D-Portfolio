# 3D Portfolio

A modern, interactive developer portfolio built with React, Three.js, Framer Motion, and Tailwind CSS. The project highlights services, experience, projects, and contact workflows with immersive visuals and responsive UI behavior across mobile, tablet, and desktop.

## Live Demo

- Production URL: Add your deployed URL here
- Example: https://your-portfolio-domain.vercel.app

## Tech Stack

- React (Vite)
- TypeScript-ready architecture (current implementation uses JSX)
- Tailwind CSS
- Framer Motion
- Three.js with @react-three/fiber and @react-three/drei
- React Router
- shadcn/ui style design patterns (recommended for future component standardization)

## Features

- Hero section with animated gradient typography and interaction cues
- 3D canvas and animated background effects
- Featured projects and complete projects listing
- Work experience timeline with animated reveal
- Services showcase and inquiry flow
- Contact section and chatbot-assisted service guidance
- Fully responsive layout with mobile-first behavior

## Folder Structure

```text
.
|- public/
|  |- desktop_pc/
|  |- planet/
|- src/
|  |- assets/
|  |- components/
|  |  |- canvas/
|  |- constants/
|  |- hoc/
|  |- utils/
|  |- App.jsx
|  |- index.css
|  |- main.jsx
|  |- style.js
|- index.html
|- package.json
|- tailwind.config.js
|- vite.config.js
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/SB-Siba/3D-Portfolio.git
```

2. Open the project directory:

```bash
cd 3D-Portfolio
```

3. Install dependencies:

```bash
npm install
```

## Run Locally

Start the development server:

```bash
npm run dev
```

Open the local URL shown in your terminal (typically http://localhost:5173).

## Build Instructions

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment Guide

### Vercel (Recommended)

1. Push your latest branch to GitHub.
2. Import the repository in Vercel.
3. Use default Vite settings:
	- Build command: npm run build
	- Output directory: dist
4. Deploy.

### Manual Static Hosting

1. Run npm run build.
2. Upload the dist directory to your hosting provider.
3. Configure SPA fallback to index.html when required.

## Screenshots

- Hero section: Add screenshot in docs/screenshots/hero.png
- Projects section: Add screenshot in docs/screenshots/projects.png
- Experience section: Add screenshot in docs/screenshots/experience.png
- Contact/chatbot section: Add screenshot in docs/screenshots/contact.png

## Future Improvements

- Migrate from JSX to strict TypeScript for stronger type safety
- Introduce reusable design tokens and component variants
- Add automated testing (unit and integration)
- Add performance budgets and Lighthouse CI checks
- Integrate shadcn/ui components for shared UI primitives

## Author

- Name: Sibananda Behera
- GitHub: https://github.com/SB-Siba
- LinkedIn: https://linkedin.com/in/sibananda-behera-276274222
- Email: sbehera0330@gmail.com