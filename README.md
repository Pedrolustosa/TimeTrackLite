# TimeTrack Lite

<p align="center">
  <img alt="Angular" src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img alt="RxJS" src="https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white" />
  <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img alt="npm" src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
  <img alt="ESLint" src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" />
  <img alt="Prettier" src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black" />
  <img alt="GitHub Pages" src="https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white" />
  <img alt="VS Code" src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white" />
  <img alt="GitHub" src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />
</p>

A lightweight web app to calculate your daily work schedule against an 8-hour goal. Enter start, lunch break, and end times to see total hours worked, daily balance, projected end time, and smart suggestions to hit exactly 8 hours.

**Live demo:** [https://pedrolustosa.github.io/TimeTrackLite/](https://pedrolustosa.github.io/TimeTrackLite/)

<p align="center">
  <a href="https://www.linkedin.com/in/pedrolustosadev/">
    <img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
  <a href="https://buymeacoffee.com/pedrolustosa">
    <img alt="Buy Me a Coffee" src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" />
  </a>
</p>

## Features

- **Work schedule form** — start, lunch out, lunch in, and end times with chronological validation
- **Workday summary** — total worked, daily goal (8h), balance, time remaining, and projected end
- **Status notifications** — incomplete, near goal, completed, overtime, or below target
- **Smart time adjustment** — pick one field and get a suggested time that completes exactly 8 hours while keeping the other three unchanged
- **Internationalization** — Portuguese (Brazil) and English
- **Light / dark theme** — persisted preference
- **Installable icons & manifest** — PWA-friendly assets for home-screen use

## Tech stack

- [Angular](https://angular.dev/) 20 (standalone, zoneless)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Lucide](https://lucide.dev/) icons (`@lucide/angular`)
- TypeScript 5.9
- ESLint + Prettier

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm

### Install

```bash
npm install
```

### Development server

```bash
npm start
```

Open `http://localhost:4200/`. The app reloads on source changes.

### Production build

```bash
npm run build
```

Output is written to `dist/`.

### Tests

```bash
npm test
```

### Lint

```bash
npm run lint
```

## Deploy (GitHub Pages)

The project is configured with [`angular-cli-ghpages`](https://github.com/angular-schule/angular-cli-ghpages):

```bash
ng deploy --base-href=/TimeTrackLite/
```

## Project structure

```
src/app/
├── core/theme/              # Light/dark theme service
├── features/time-calculator/
│   ├── components/          # Page, form, summary, notification, adjustment
│   ├── models/              # Schedule, calculation, notification types
│   ├── services/            # Work time calculation
│   ├── utils/               # Time parsing/formatting
│   └── validators/          # Schedule chronological rules
├── i18n/                    # Language service and en / pt-BR catalogs
└── shared/components/       # Language selector, theme toggle
```
