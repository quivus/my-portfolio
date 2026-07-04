# Ime

A personal portfolio website, built to showcase software development projects, technical skills, and experiences. The site includes an animated splash screen, a sticky navigation bar, a project showcase with live demos and downloadable builds, and a downloadable CV.

## Overview

The portfolio opens with a brief splash screen introduction before loading the main site. Visitors can browse featured projects, each presented with a media preview (image or video), a description, the technologies used, and links to the live application, downloadable APK, and source code where available.

## Features

- Animated splash screen shown on initial load
- Sticky, responsive navigation bar with section links (Home, Projects, Services, Contact)
- Project showcase with independent expand/collapse behavior per project card
- Inline video previews with a full-size viewing mode
- Direct links to live websites, downloadable APK builds, and source code repositories
- Downloadable CV (PDF)
- Dark mode support (Adapts on system mode)
- Built with React and Tailwind CSS

## Tech Stack

- React
- Tailwind CSS
- JavaScript (JSX)

## Project Structure

```
ime-portfolio/
├── public/
│   └── cv.pdf
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── videos/
│   ├── components/
│   │   ├── SplashScreen.jsx
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   └── Home.jsx
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/quivus/Ime.git
cd ime
npm install
```

### Running Locally

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```
