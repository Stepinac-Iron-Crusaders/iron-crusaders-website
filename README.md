# Iron Crusaders Website

**Status: Active**

This repository contains the content served at [ironcrusaders.me](https://ironcrusaders.me) and [https://stepinac-iron-crusaders.github.io/iron-crusaders-website/](https://stepinac-iron-crusaders.github.io/iron-crusaders-website/).

This website is built with **Vite + React + TypeScript** and is hosted as a **GitHub Pages** site via GitHub Actions.

---

## Dependencies

- **Node.js** 18+ (20 recommended)
- **npm** 9+

Check versions:

```bash
node --version
npm --version
```

---

## Setup

While in the cloned folder, run:

```bash
npm install
```

Then, to start the dev server, run:

```bash
npm run dev
```

Navigate to `http://localhost:5173` to view the site. The dev server supports HMR.

To create a production build, run:

```bash
npm run build
```

Output is generated to `./dist`. Preview the build with:

```bash
npm run preview
```

Lint:

```bash
npm run lint
```

---

## Pushing

After implementing all the changes necessary, you will need to push to your GitHub fork.

To add your repository fork, run:

```bash
git remote add origin https://github.com/Stepinac-Iron-Crusaders/iron-crusaders-website.git
```

To stage your updated code, run:

```bash
git add .
```

or to stage a specific file:

```bash
git add src/pages/Home.tsx
```

To commit your push, run:

```bash
git commit -m "describe what you did"
```

Finally to push to your forked repository, run:

```bash
git push
```

Go to your GitHub fork — it should say `1 commit ahead of...`. Open a pull request to `main` on `Stepinac-Iron-Crusaders/iron-crusaders-website`.

**Deploy:** Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and deploys to GitHub Pages (source: **GitHub Actions**).

---

## Troubleshooting

- **Install fails / `npm install` errors:** Delete `node_modules` and `package-lock.json`, then retry:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

- **Type errors on build (`tsc -b`):** Ensure you’re on Node 18+ and run `npm run build` again. If types are stale, restart the TS server in your editor.

- **Port in use (`5173`):** Vite will prompt for another port, or run `npm run dev -- --port 3000`.

---

## Authors

- **Iron Crusaders** — Archbishop Stepinac High School FRC Team
- Subash Jonnalagadda — Lead
- Joseph Alex — Lead
- Contributors via [Stepinac-Iron-Crusaders](https://github.com/Stepinac-Iron-Crusaders)

---

## License

This software is protected under the **MIT license**. Basically, do whatever you want as long as you give credit where credit is due and don't hold us liable for anything that happens. More information can be found in `LICENSE`.

---

### Tech Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- [GSAP](https://gsap.com/) + ScrollTrigger for motion
- [React Router](https://reactrouter.com/) (HashRouter)
