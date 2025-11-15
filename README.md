# 🚀 Personal Portfolio

Personal website built with React, Vite, and Tailwind CSS, with animations powered by Framer Motion. It showcases experience, skills, certifications, and contact information.

Live demo: https://stefanoauciello.github.io/aboutme

---

## 🧰 Tech Stack

- ⚛️ React 19
- 🧩 React Router
- 🎨 Tailwind CSS 3
- 🎭 Framer Motion 12
- ⚡ Vite 6
- 🧹 ESLint

---

## ▶️ Run locally

Prerequisites:
- Node.js >= 18 (LTS recommended; check with `node -v`)
- npm >= 9 (you can use pnpm/yarn, but this repo uses npm)

Steps:
1. Install dependencies
   - `npm install`
2. Start the dev server
   - `npm run dev`
3. Open the URL printed in the terminal (typically http://localhost:5173)

Notes:
- If the default port is busy, Vite will automatically pick a free one and print it.
- Hot Module Replacement is enabled: changes are reflected in real time.

---

## 🏗️ Production build

1. Create an optimized build
   - `npm run build`
2. Preview the local production build
   - `npm run preview`
3. Open the printed URL (e.g., http://localhost:4173)

The build output is generated in the `dist/` folder.

---

## 🌐 Deploy to GitHub Pages

This project is already configured to deploy to GitHub Pages using:

- `homepage` in `package.json`: `https://stefanoauciello.github.io/aboutme`
- `base` in `vite.config.js`: `/aboutme/`
- npm scripts:
  - `predeploy`: builds the project
  - `deploy`: publishes the `dist` folder to the `gh-pages` branch

How to deploy:
1. Make sure you are authenticated with GitHub from your terminal (token or GitHub CLI).
2. Run: `npm run deploy`
3. Wait for GitHub Pages to update the site (it may take a couple of minutes).

---

## 🔧 Available scripts

- `npm run dev` — Start Vite in development
- `npm run build` — Production build
- `npm run preview` — Preview the local production build
- `npm run lint` — Lint the codebase
- `npm run deploy` — Deploy to GitHub Pages (runs `predeploy` → `build`)

---

## 🗂️ Project structure (partial)

- `src/`
  - `pages/` — Application pages (About, Home, Experience, etc.)
  - `components/` — Reusable components (e.g., skill-card)
  - `styles/` — Theme/animations and CSS (Tailwind via `index.css`)
  - `App.jsx` — Router and main layout
- `public/` — Static assets served as-is
- `index.html` — Vite entrypoint
- `vite.config.js` — Vite configuration (mind the `base` setting for GitHub Pages)

---

## ⚙️ Key configuration

- `vite.config.js`
  - `base: "/aboutme/"` ensures assets and routes resolve correctly on GitHub Pages.
- `import.meta.env.BASE_URL`
  - Use it to prefix asset paths according to Vite’s `base`, e.g.: `src={import.meta.env.BASE_URL + "image.png"}`.
- Custom environment variables
  - Prefix with `VITE_` to expose them to the client, e.g.: `VITE_API_URL`.

---

## 📄 License

This repository is intended for personal use. If you reuse parts of the code or design, please provide attribution.
