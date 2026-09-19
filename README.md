# Create Your Own Planet

A browser-only planet-building simulator where every slider changes a fictional world in real time. Build a planet, discover its field report, trigger strange events, and decide whether it deserves to survive.

## Features

- Live CSS-rendered planet with oceans, atmosphere, vegetation, terrain effects, moons, and orbital motion
- Responsive controls for size, gravity, temperature, water, oxygen, atmosphere, day length, moons, terrain, vegetation, wildlife, population, and technology
- Deterministic fictional statistics calculated entirely in the browser
- Local planet profile generation with no AI or network requests
- Randomized planet generator with meaningfully different worlds
- Event system that changes simulation statistics and presents an in-world notification
- Planet ID-style field report and a destroy-planet easter egg
- Keyboard-accessible controls, focus states, semantic labels, and reduced-motion support

## Tech stack

React, Vite, JavaScript, CSS, HTML, and Lucide React icons. There is no server, database, authentication, API route, environment variable, or external backend.

## Project structure

- `src/App.jsx` - application state and main experience flow
- `src/components/` - planet, controls, statistics, profile, events, and star field UI
- `src/data/` - configuration options and event definitions
- `src/utils/` - deterministic calculations and profile generation
- `src/App.css` and `src/index.css` - responsive visual system

## Local setup

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal. Core functionality works without an internet connection after the app's JavaScript loads. Google Fonts are an optional visual enhancement; the app falls back to local font families.

## Build and preview

```bash
npm run build
npm run preview
```

The production output is written to `dist`.

## Vercel deployment

Import this repository into Vercel. Vercel detects Vite automatically. Use `npm run build` as the build command and `dist` as the output directory. No environment variables or server configuration are needed.

## How generation works

The current configuration is the single source of truth. Six fictional statistics are derived from weighted combinations of the sliders and categorical choices, with values clamped to 0-100. Creating a planet maps those values and choices to predefined local templates for climate, planet type, ecosystem, species, resources, civilization, challenge, and unique feature. Random events add deterministic boosts to the current statistics for the rest of that planet's session.
