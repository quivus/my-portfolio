# Quivus

A personal portfolio website, built to showcase software development projects, technical skills, and experiences. The site includes an animated splash screen, a sticky navigation bar, a project showcase with live demos and downloadable builds, and a downloadable CV.

Live site: [https://vraj-quivus.vercel.app](https://vraj-quivus.vercel.app)



## Features

| Feature | Description |
| --- | --- |
| Splash screen | Animated intro shown on first load before the main site appears |
| Navigation | Sticky, responsive bar with Home, Projects, Services, and Contact |
| Project cards | Independent expand and collapse for each project |
| Media previews | Inline video playback with a full-size viewing mode |
| Project links | Live sites, APK downloads, and source repositories |
| CV | Downloadable PDF resume |
| Theme | Follows the system light or dark preference |
| Branding | Quivus logo used as the tab icon on the deployed site |

## Tech Stack

| Area | Tool | Version |
| --- | --- | --- |
| UI library | React | 19 |
| Styling | Tailwind CSS | 4 |
| Bundler | Vite | 8 |
| Language | JavaScript (JSX) | — |
| Hosting | Vercel | [vraj-quivus.vercel.app](https://vraj-quivus.vercel.app) |

## Project Structure

| Path | Role |
| --- | --- |
| `public/favicon.png` | Quivus tab icon |
| `src/assets/images/` | Project stills and the Quivus wordmark |
| `src/assets/videos/` | Inline project video previews |
| `src/components/SplashScreen.jsx` | Opening animation |
| `src/components/Navbar.jsx` | Sticky section navigation |
| `src/components/Hero.jsx` | Home, projects, services, and contact |
| `src/components/Home.jsx` | Page layout that composes navbar, hero, and footer |
| `src/App.jsx` | Splash gate and history handling |
| `src/main.jsx` | React entry point |
| `index.html` | Document shell (local title: Rajiemae Villa) |

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Vite server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Getting Started

| Requirement | Notes |
| --- | --- |
| Node.js | v18 or later |
| Package manager | npm or yarn |

```bash
git clone https://github.com/quivus/my-portfolio.git
cd my-portfolio
npm install
```

```bash
npm run dev
```

```bash
npm run build
```
