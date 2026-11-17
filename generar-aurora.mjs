import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const srcDir = path.join(rootDir, 'src');

if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir, { recursive: true });
}

const packageJson = {
  name: 'aurora-mvp',
  private: true,
  version: '1.0.0',
  type: 'module',
  scripts: {
    dev: 'vite',
    build: 'vite build',
    preview: 'vite preview',
  },
  dependencies: {
    react: '^18.3.1',
    'react-dom': '^18.3.1',
  },
  devDependencies: {
    '@vitejs/plugin-react': '^4.3.1',
    autoprefixer: '^10.4.20',
    postcss: '^8.4.47',
    tailwindcss: '^3.4.13',
    vite: '^5.4.8',
  },
};

const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`;

const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
`;

const postcssConfig = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`;

const indexHtml = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
    <meta name="theme-color" content="#f4e7e6" />
    <title>A.U.R.O.R.A | Monitor Clínico Adaptativo</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;

const mainJsx = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;

const indexCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

/* 1. Tonos Pastel (ND) - PREDETERMINADO: Crema rosado mate, rosa pétalo y cacao cálido */
:root, [data-theme="pastel"] {
  --bg-page: #f4e7e6;
  --bg-card: rgba(251, 244, 243, 0.84);
  --bg-input: rgba(242, 224, 224, 0.78);
  --text-main: #49282c;
  --text-muted: #7c585c;
  --accent: #df9aa8;
  --accent-soft: rgba(223, 154, 168, 0.22);
  --accent-contrast: #3b1c20;
  --border-card: rgba(196, 142, 150, 0.28);
  --border-highlight: rgba(223, 154, 168, 0.58);
  --orb-1: rgba(235, 179, 189, 0.28);
  --orb-2: rgba(232, 188, 164, 0.24);
  --glow: 0 14px 36px -12px rgba(92, 48, 54, 0.09);
  --glass-blur: blur(16px) saturate(108%);
}

/* 2. Aurora Boreal Tenue - Pizarra abisal y salvia-turquesa desaturado */
[data-theme="boreal"] {
  --bg-page: #070d12;
  --bg-card: rgba(13, 24, 32, 0.76);
  --bg-input: rgba(8, 16, 23, 0.72);
  --text-main: #e6eff3;
  --text-muted: #849ca8;
  --accent: #56b4a9;
  --accent-soft: rgba(86, 180, 169, 0.14);
  --accent-contrast: #051413;
  --border-card: rgba(132, 175, 170, 0.18);
  --border-highlight: rgba(132, 210, 200, 0.34);
  --orb-1: rgba(86, 180, 169, 0.16);
  --orb-2: rgba(110, 130, 175, 0.14);
  --glow: 0 18px 42px -14px rgba(0, 0, 0, 0.55);
  --glass-blur: blur(18px) saturate(115%);
}

/* 3. Niebla Nórdica (Baja Saturación) - Grafito aterciopelado y azul pizarra */
[data-theme="low-saturation"] {
  --bg-page: #1b1f25;
  --bg-card: rgba(35, 40, 48, 0.78);
  --bg-input: rgba(25, 29, 35, 0.74);
  --text-main: #d6dce5;
  --text-muted: #8b96a5;
  --accent: #7d90a6;
  --accent-soft: rgba(125, 144, 166, 0.15);
  --accent-contrast: #0f141a;
  --border-card: rgba(143, 154, 168, 0.18);
  --border-highlight: rgba(165, 182, 202, 0.32);
  --orb-1: rgba(125, 144, 166, 0.14);
  --orb-2: rgba(110, 118, 135, 0.12);
  --glow: 0 16px 38px -12px rgba(0, 0, 0, 0.45);
  --glass-blur: blur(18px) saturate(105%);
}

/* 4. Alto Contraste (AAA) - Nitidez absoluta sin transparencias */
[data-theme="high-contrast"] {
  --bg-page: #000000;
  --bg-card: #090909;
  --bg-input: #000000;
  --text-main: #ffffff;
  --text-muted: #e2e8f0;
  --accent: #eab308;
  --accent-soft: rgba(234, 179, 8, 0.18);
  --accent-contrast: #000000;
  --border-card: #eab308;
  --border-highlight: #fde047;
  --orb-1: transparent;
  --orb-2: transparent;
  --glow: none;
  --glass-blur: none;
}

* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

html, body {
  overflow-x: hidden;
  width: 100%;
  background-color: var(--bg-page);
  color: var(--text-main);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: background-color 0.55s cubic-bezier(0.22, 1, 0.36, 1), color 0.4s ease;
  margin: 0;
  -webkit-font-smoothing: antialiased;
}

/* Orbes ambientales Aurora de movimiento ultra-lento y tenue */
.aurora-backdrop {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.aurora-orb {
  position: absolute;
  border-radius: 9999px;
  filter: blur(95px);
  opacity: 0.9;
  will-change: transform;
}

.aurora-orb-1 {
  width: 46vw;
  height: 46vw;
  min-width: 300px;
  min-height: 300px;
  top: -10%;
  left: -6%;
  background: radial-gradient(circle, var(--orb-1) 0%, transparent 72%);
  animation: auroraDriftOne 18s ease-in-out infinite alternate;
}

.aurora-orb-2 {
  width: 50vw;
  height: 50vw;
  min-width: 320px;
  min-height: 320px;
  bottom: -12%;
  right: -8%;
  background: radial-gradient(circle, var(--orb-2) 0%, transparent 72%);
  animation: auroraDriftTwo 22s ease-in-out infinite alternate;
}

@keyframes auroraDriftOne {
  0% { transform: translate3d(0, 0, 0) scale(1); }
  100% { transform: translate3d(5vw, 4vh, 0) scale(1.08); }
}

@keyframes auroraDriftTwo {
  0% { transform: translate3d(0, 0, 0) scale(1.04); }
  100% { transform: translate3d(-5vw, -4vh, 0) scale(0.96); }
}

/* Glassmorphism 2.0 + Light-Catcher Border */
.bento-card {
  position: relative;
  background-color: var(--bg-card);
  background-image: linear-gradient(145deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 65%);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--border-card);
  box-shadow: var(--glow), inset 0 1px 0 0 rgba(255, 255, 255, 0.35);
  transition:
    background-color 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.35s ease,
    box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

@media (hover: hover) {
  .bento-card:hover {
    border-color: var(--border-highlight);
    transform: translateY(-2px);
  }
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: translate3d(0, 12px, 0) scale(0.98);
    filter: blur(4px);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
    filter: blur(0);
  }
}

@keyframes pulseAura {
  0%, 100% { transform: scale(1); opacity: 0.85; }
  50% { transform: scale(1.12); opacity: 1; }
}

.animate-pop {
  animation: popIn 0.38s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.animate-aura {
  animation: pulseAura 5s ease-in-out infinite;
}

.chip-btn {
  min-height: 40px;
  touch-action: manipulation;
  transition:
    transform 0.24s cubic-bezier(0.22, 1, 0.36, 1),
    background-color 0.3s ease,
    border-color 0.3s ease,
    color 0.25s ease,
    box-shadow 0.3s ease;
}

@media (hover: hover) {
  .chip-btn:hover {
    transform: translateY(-1.5px);
    border-color: var(--accent);
    box-shadow: 0 6px 18px -6px var(--accent-soft);
  }
}

.chip-btn:active {
  transform: scale(0.96);
}

[data-motion="reduced"] *,
[data-motion="reduced"] ::before,
[data-motion="reduced"] ::after {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
}

@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

@media print {
  .no-print, .aurora-backdrop { display: none !important; }
  .print-only { display: block !important; }
  body { background: #ffffff !important; color: #000000 !important; }
  .bento-card {
    border: 1px solid #cbd5e1 !important;
    box-shadow: none !important;
    background: #ffffff !important;
    backdrop-filter: none !important;
  }
}
`;

const appJsx = `import React, { useState, useEffect } from 'react';

const PRESET_THEMES = [
  { id: 'pastel', name: 'Tonos Pastel (ND)', swatch: '#df9aa8', desc: 'Crema rosado mate y cacao cálido' },
  { id: 'boreal', name: 'Aurora Boreal', swatch: '#56b4a9', desc: 'Salvia nocturna y cristal tenue' },
  { id: 'low-saturation', name: 'Niebla Nórdica', swatch: '#7d90a6', desc: 'Baja saturación y calma visual' },
  { id: 'high-contrast', name: 'Alto Contraste', swatch: '#eab308', desc: 'Máxima legibilidad AAA' },
];

const CYCLE_REGULARITY_OPTIONS = [
  { id: 'unknown', label: 'No lo sé / En observación' },
  { id: 'regular', label: 'Regular (estable)' },
  { id: 'irregular', label: 'Irregular / Variable' },
];

const NEUROTYPE_OPTIONS = [
  'En exploración / Sin diagnóstico',
  'TDAH',
  'Autismo / CEA',
  'AuDHD (TDAH + CEA)',
  'Alta Sensibilidad (PAS)',
  'Neurotípica',
];

const FLOW_LEVELS = ['Nada', 'Poco', 'Medio', 'Alto'];

const FLOW_DETAILS_LIST = [
  'Coágulos pequeños',
  'Coágulos abundantes',
  'Flujo variable / cambiante',
  'Manchado intermitente',
];

const SYMPTOMS_LIST = [
  'Cólicos', 'Fatiga', 'Dolor de cabeza', 'Sensibilidad',
  'Energía alta', 'Tristeza', 'Ansiedad', 'Niebla mental'
];

const NEURO_LIST = [
  'Sobrecarga sensorial', 'Parálisis ejecutiva', 'Hipersensibilidad',
  'Batería social baja', 'Hiperfoco'
];

function getAccessibleTextColor(hex) {
  if (!hex || !hex.startsWith('#') || hex.length < 7) return '#ffffff';
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? '#3b1c20' : '#ffffff';
}

function getCyclePhase(day, cycleLength, periodLength, regularity) {
  if (day <= periodLength) return 'Fase Menstrual';
  if (regularity === 'unknown' || regularity === 'irregular') {
    return 'Fase Intermenstrual (En observación)';
  }
  const ovulationDay = Math.max(periodLength + 2, cycleLength - 14);
  if (day < ovulationDay - 1) return 'Fase Folicular';
  if (day <= ovulationDay + 1) return 'Ventana Ovulatoria';
  return 'Fase Lútea';
}

const Icons = {
  Sparkles: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" /><path d="M22 5h-4" />
    </svg>
  ),
  Palette: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  ),
  FileMedical: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M12 11v6" /><path d="M9 14h6" />
    </svg>
  ),
  ShieldCheck: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  MessageSquare: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Close: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  ),
  Send: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  ),
  Check: ({ className = 'w-3.5 h-3.5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  Orbit: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <path d="M10.4 21.9a10 10 0 0 0 9.941-15.416" />
      <path d="M13.5 2.1a10 10 0 0 0-9.841 15.416" />
    </svg>
  ),
  Brain: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
    </svg>
  ),
  Activity: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  ),
  Droplet: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </svg>
  ),
  Lock: ({ className = 'w-3.5 h-3.5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  ChevronDown: ({ className = 'w-3.5 h-3.5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  User: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  ),
  Sliders: ({ className = 'w-3.5 h-3.5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="4" y1="21" y2="14" /><line x1="4" x2="4" y1="10" y2="3" />
      <line x1="12" x2="12" y1="21" y2="12" /><line x1="12" x2="12" y1="8" y2="3" />
      <line x1="20" x2="20" y1="21" y2="16" /><line x1="20" x2="20" y1="12" y2="3" />
      <line x1="2" x2="6" y1="14" y2="14" /><line x1="10" x2="14" y1="8" y2="8" /><line x1="18" x2="22" y1="16" y2="16" />
    </svg>
  ),
  Bookmark: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  ),
  Trash: ({ className = 'w-3.5 h-3.5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  ),
  ClipboardList: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" />
    </svg>
  ),
  Wind: ({ className = 'w-3.5 h-3.5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
    </svg>
  ),
};

export default function App() {
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('aurora-user-profile-v3');
    return saved ? JSON.parse(saved) : null;
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [formProfile, setFormProfile] = useState({
    firstName: '',
    lastName: '',
    alias: '',
    age: '',
    regularity: 'unknown',
    cycleLength: 28,
    periodLength: 5,
    initialCycleDay: 1,
    hasClotsHistory: true,
    variableFlowHistory: true,
    neurotype: 'En exploración / Sin diagnóstico',
    baselineSensoryThreshold: 5,
  });

  const [mobileTab, setMobileTab] = useState('registro');

  // Tema Pastel (ND) cálido configurado como predeterminado
  const [themeId, setThemeId] = useState(() => localStorage.getItem('aurora-theme-id-v2') || 'pastel');
  const [reducedMotion, setReducedMotion] = useState(() => localStorage.getItem('aurora-reduced-motion') === 'true');
  const [customColors, setCustomColors] = useState(() => {
    const saved = localStorage.getItem('aurora-custom-colors');
    return saved ? JSON.parse(saved) : { page: '', card: '', accent: '' };
  });
  const [paletteOpen, setPaletteOpen] = useState(false);

  const [cycleDay, setCycleDay] = useState(() => Number(localStorage.getItem('aurora-cycle-day')) || 1);
  const [role, setRole] = useState('Usuaria');
  const [privacy, setPrivacy] = useState({ flow: true, symptoms: true, nd: true, notes: true });

  const [diaryInput, setDiaryInput] = useState('');
  const [savedNotes, setSavedNotes] = useState(() => localStorage.getItem('aurora-notes') || '');
  const [aiFeedback, setAiFeedback] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  const [selectedFlow, setSelectedFlow] = useState(() => localStorage.getItem('aurora-flow') || 'Medio');
  const [selectedFlowDetails, setSelectedFlowDetails] = useState(() => {
    const saved = localStorage.getItem('aurora-flow-details');
    return saved ? JSON.parse(saved) : [];
  });
  const [sensoryLoadToday, setSensoryLoadToday] = useState(() => Number(localStorage.getItem('aurora-sensory-today')) || 5);
  const [selectedSymptoms, setSelectedSymptoms] = useState(() => {
    const saved = localStorage.getItem('aurora-symptoms');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedNeuro, setSelectedNeuro] = useState(() => {
    const saved = localStorage.getItem('aurora-neuro');
    return saved ? JSON.parse(saved) : [];
  });

  const [historyLogs, setHistoryLogs] = useState(() => {
    const saved = localStorage.getItem('aurora-history-logs');
    return saved ? JSON.parse(saved) : [];
  });

  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', themeId);
    root.setAttribute('data-motion', reducedMotion ? 'reduced' : 'smooth');
    localStorage.setItem('aurora-theme-id-v2', themeId);
    localStorage.setItem('aurora-reduced-motion', String(reducedMotion));
    localStorage.setItem('aurora-custom-colors', JSON.stringify(customColors));

    if (customColors.page) root.style.setProperty('--bg-page', customColors.page);
    else root.style.removeProperty('--bg-page');

    if (customColors.card) root.style.setProperty('--bg-card', customColors.card);
    else root.style.removeProperty('--bg-card');

    if (customColors.accent) {
      root.style.setProperty('--accent', customColors.accent);
      root.style.setProperty('--accent-contrast', getAccessibleTextColor(customColors.accent));
      root.style.setProperty('--border-card', \`\${customColors.accent}44\`);
    } else {
      root.style.removeProperty('--accent');
      root.style.removeProperty('--accent-contrast');
      root.style.removeProperty('--border-card');
    }
  }, [themeId, reducedMotion, customColors]);

  useEffect(() => { localStorage.setItem('aurora-cycle-day', String(cycleDay)); }, [cycleDay]);
  useEffect(() => { localStorage.setItem('aurora-flow', selectedFlow); }, [selectedFlow]);
  useEffect(() => { localStorage.setItem('aurora-flow-details', JSON.stringify(selectedFlowDetails)); }, [selectedFlowDetails]);
  useEffect(() => { localStorage.setItem('aurora-sensory-today', String(sensoryLoadToday)); }, [sensoryLoadToday]);
  useEffect(() => { localStorage.setItem('aurora-symptoms', JSON.stringify(selectedSymptoms)); }, [selectedSymptoms]);
  useEffect(() => { localStorage.setItem('aurora-neuro', JSON.stringify(selectedNeuro)); }, [selectedNeuro]);
  useEffect(() => { localStorage.setItem('aurora-notes', savedNotes); }, [savedNotes]);
  useEffect(() => { localStorage.setItem('aurora-history-logs', JSON.stringify(historyLogs)); }, [historyLogs]);

  useEffect(() => {
    if (userProfile) {
      const displayName = userProfile.alias || userProfile.firstName;
      setChatMessages([
        { sender: 'aurora', text: \`Hola, \${displayName}. Soy A.U.R.O.R.A. Tu entorno clínico está calibrado a tu perfil personal. ¿En qué puedo apoyarte hoy?\` }
      ]);
    }
  }, [userProfile]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!formProfile.firstName.trim()) return;
    const cleanCycleLen = Math.min(45, Math.max(21, Number(formProfile.cycleLength) || 28));
    const cleanPeriodLen = Math.min(12, Math.max(2, Number(formProfile.periodLength) || 5));
    const cleanInitDay = Math.min(cleanCycleLen, Math.max(1, Number(formProfile.initialCycleDay) || 1));

    const cleanProfile = {
      firstName: formProfile.firstName.trim(),
      lastName: formProfile.lastName.trim(),
      alias: formProfile.alias.trim() || formProfile.firstName.trim(),
      age: formProfile.age ? Number(formProfile.age) : null,
      regularity: formProfile.regularity,
      cycleLength: cleanCycleLen,
      periodLength: cleanPeriodLen,
      hasClotsHistory: Boolean(formProfile.hasClotsHistory),
      variableFlowHistory: Boolean(formProfile.variableFlowHistory),
      neurotype: formProfile.neurotype,
      baselineSensoryThreshold: Number(formProfile.baselineSensoryThreshold) || 5,
    };

    setUserProfile(cleanProfile);
    setCycleDay(cleanInitDay);
    setSensoryLoadToday(cleanProfile.baselineSensoryThreshold);
    localStorage.setItem('aurora-user-profile-v3', JSON.stringify(cleanProfile));
    setIsEditingProfile(false);
  };

  const openProfileEditor = () => {
    setFormProfile({
      firstName: userProfile?.firstName || '',
      lastName: userProfile?.lastName || '',
      alias: userProfile?.alias || '',
      age: userProfile?.age || '',
      regularity: userProfile?.regularity || 'unknown',
      cycleLength: userProfile?.cycleLength || 28,
      periodLength: userProfile?.periodLength || 5,
      initialCycleDay: cycleDay,
      hasClotsHistory: userProfile?.hasClotsHistory ?? true,
      variableFlowHistory: userProfile?.variableFlowHistory ?? true,
      neurotype: userProfile?.neurotype || 'En exploración / Sin diagnóstico',
      baselineSensoryThreshold: userProfile?.baselineSensoryThreshold || 5,
    });
    setIsEditingProfile(true);
  };

  const applyPreset = (id) => {
    setCustomColors({ page: '', card: '', accent: '' });
    setThemeId(id);
  };

  const toggleItem = (list, setList, item) => {
    setList((prev) => prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]);
  };

  const handleSmartAnalyze = (e) => {
    e.preventDefault();
    if (!diaryInput.trim()) return;
    const text = diaryInput.toLowerCase();
    const detectedSym = [];
    const detectedNd = [];
    const detectedFlowDet = [];

    if (text.includes('cabeza') || text.includes('migraña')) detectedSym.push('Dolor de cabeza');
    if (text.includes('cansad') || text.includes('fatiga')) detectedSym.push('Fatiga');
    if (text.includes('ansie') || text.includes('nervi')) detectedSym.push('Ansiedad');
    if (text.includes('cólico') || text.includes('colico') || text.includes('dolor')) detectedSym.push('Cólicos');
    if (text.includes('abrumad') || text.includes('ruido') || text.includes('luz')) detectedNd.push('Sobrecarga sensorial');
    if (text.includes('concentr') || text.includes('enfoc')) detectedNd.push('Hiperfoco');
    if (text.includes('coágulo') || text.includes('coagulo')) detectedFlowDet.push('Coágulos pequeños');
    if (text.includes('cambi') || text.includes('mucho flujo')) detectedFlowDet.push('Flujo variable / cambiante');

    if (detectedSym.length) setSelectedSymptoms((prev) => [...new Set([...prev, ...detectedSym])]);
    if (detectedNd.length) setSelectedNeuro((prev) => [...new Set([...prev, ...detectedNd])]);
    if (detectedFlowDet.length) setSelectedFlowDetails((prev) => [...new Set([...prev, ...detectedFlowDet])]);

    setSavedNotes(diaryInput.trim());
    setAiFeedback(
      detectedSym.length || detectedNd.length || detectedFlowDet.length
        ? 'Indicadores detectados y vinculados automáticamente en tu registro.'
        : 'Nota guardada localmente en tu bitácora del día.'
    );
    setDiaryInput('');
  };

  const handleSaveSnapshot = () => {
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toLocaleDateString('es-CL', { day: '2-digit', month: 'short' }) + ' · ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      cycleDay,
      cycleLength: userProfile.cycleLength,
      phase: getCyclePhase(cycleDay, userProfile.cycleLength, userProfile.periodLength, userProfile.regularity),
      flow: selectedFlow,
      flowDetails: [...selectedFlowDetails],
      sensoryLoad: sensoryLoadToday,
      symptoms: [...selectedSymptoms],
      neuro: [...selectedNeuro],
      note: savedNotes,
    };
    setHistoryLogs([newEntry, ...historyLogs]);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2600);
  };

  const handleDeleteLog = (id) => {
    setHistoryLogs((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const msg = chatInput;
    setChatInput('');
    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: msg },
      {
        sender: 'aurora',
        text: 'El módulo conversacional estará disponible Próximamente. Puedes registrar tus indicadores calibrados y generar tu informe PDF Médico.',
      },
    ]);
  };

  const AuroraAmbientLayer = () => (
    <div className="aurora-backdrop" aria-hidden="true">
      <div className="aurora-orb aurora-orb-1" />
      <div className="aurora-orb aurora-orb-2" />
    </div>
  );

  if (!userProfile || isEditingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative">
        <AuroraAmbientLayer />
        <div className="bento-card animate-pop w-full max-w-2xl rounded-3xl p-5 sm:p-9 space-y-6 relative z-10">
          <div className="flex flex-col items-center text-center space-y-2">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center relative"
              style={{ backgroundColor: 'var(--bg-input)', border: '1.5px solid var(--accent)' }}
            >
              <span
                className="w-4 h-4 rounded-full animate-aura"
                style={{ backgroundColor: 'var(--accent)', boxShadow: '0 0 18px var(--accent)' }}
              />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                Configuración Clínica y Sensorial Personalizada
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                {userProfile ? 'Ajustar Datos y Métricas Basales' : 'Bienvenida a A.U.R.O.R.A'}
              </h1>
              <p className="text-xs sm:text-sm mt-1.5 max-w-lg mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Ingresa tus datos y antecedentes basales. Si desconoces la regularidad exacta de tu ciclo, el sistema se adaptará en modo observación.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-5">
            <div className="p-4 sm:p-5 rounded-2xl border space-y-4" style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-card)' }}>
              <div className="flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                <Icons.User className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                <h2 className="text-xs font-bold uppercase tracking-wider">1. Identidad de la Usuaria</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Nombres *</label>
                  <input
                    type="text"
                    required
                    value={formProfile.firstName}
                    onChange={(e) => setFormProfile({ ...formProfile, firstName: e.target.value })}
                    placeholder="Ej. María Fernanda"
                    className="w-full px-3.5 py-2.5 rounded-xl border text-base sm:text-sm outline-none"
                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)', color: 'var(--text-main)' }}
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Apellidos *</label>
                  <input
                    type="text"
                    required
                    value={formProfile.lastName}
                    onChange={(e) => setFormProfile({ ...formProfile, lastName: e.target.value })}
                    placeholder="Ej. Vergara Carmona"
                    className="w-full px-3.5 py-2.5 rounded-xl border text-base sm:text-sm outline-none"
                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-xs font-semibold" style={{ color: 'var(--text-main)' }}>
                    Alias (¿Cómo te gustaría que te digamos?)
                  </label>
                  <input
                    type="text"
                    value={formProfile.alias}
                    onChange={(e) => setFormProfile({ ...formProfile, alias: e.target.value })}
                    placeholder="Ej. Mafer, Fer, o tu nombre preferido"
                    className="w-full px-3.5 py-2.5 rounded-xl border text-base sm:text-sm outline-none"
                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)', color: 'var(--text-main)' }}
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Edad (años)</label>
                  <input
                    type="number"
                    min="12"
                    max="99"
                    value={formProfile.age}
                    onChange={(e) => setFormProfile({ ...formProfile, age: e.target.value })}
                    placeholder="Ej. 23"
                    className="w-full px-3.5 py-2.5 rounded-xl border text-base sm:text-sm outline-none"
                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl border space-y-4" style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-card)' }}>
              <div className="flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                <Icons.Sliders className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                <h2 className="text-xs font-bold uppercase tracking-wider">2. Métricas Clínicas y Basales</h2>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                  Patrón habitual de tu ciclo
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {CYCLE_REGULARITY_OPTIONS.map((opt) => {
                    const active = formProfile.regularity === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setFormProfile({ ...formProfile, regularity: opt.id })}
                        className="chip-btn px-3 py-2 rounded-xl border text-xs font-semibold text-center cursor-pointer"
                        style={{
                          backgroundColor: active ? 'var(--accent)' : 'var(--bg-card)',
                          borderColor: active ? 'var(--accent)' : 'var(--border-card)',
                          color: active ? 'var(--accent-contrast)' : 'var(--text-main)',
                        }}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                    {formProfile.regularity === 'unknown' ? 'Duración ref. (días)' : 'Duración Ciclo (días)'}
                  </label>
                  <input
                    type="number"
                    min="21"
                    max="45"
                    required
                    value={formProfile.cycleLength}
                    onChange={(e) => setFormProfile({ ...formProfile, cycleLength: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border text-base sm:text-sm font-bold tabular-nums outline-none"
                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)', color: 'var(--text-main)' }}
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                    Días de Sangrado
                  </label>
                  <input
                    type="number"
                    min="2"
                    max="12"
                    required
                    value={formProfile.periodLength}
                    onChange={(e) => setFormProfile({ ...formProfile, periodLength: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border text-base sm:text-sm font-bold tabular-nums outline-none"
                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)', color: 'var(--text-main)' }}
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                    Día Actual (aprox.)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="45"
                    required
                    value={formProfile.initialCycleDay}
                    onChange={(e) => setFormProfile({ ...formProfile, initialCycleDay: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border text-base sm:text-sm font-bold tabular-nums outline-none"
                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div className="pt-1 space-y-2">
                <span className="block text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                  Antecedentes habituales del sangrado (relevante para informe médico):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <label className="flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-medium cursor-pointer" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}>
                    <input
                      type="checkbox"
                      checked={formProfile.hasClotsHistory}
                      onChange={(e) => setFormProfile({ ...formProfile, hasClotsHistory: e.target.checked })}
                      className="w-4 h-4 rounded cursor-pointer"
                      style={{ accentColor: 'var(--accent)' }}
                    />
                    <span>Presenta coágulos ocasionales o frecuentes</span>
                  </label>
                  <label className="flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-medium cursor-pointer" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}>
                    <input
                      type="checkbox"
                      checked={formProfile.variableFlowHistory}
                      onChange={(e) => setFormProfile({ ...formProfile, variableFlowHistory: e.target.checked })}
                      className="w-4 h-4 rounded cursor-pointer"
                      style={{ accentColor: 'var(--accent)' }}
                    />
                    <span>Variación marcada de flujo entre días</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                    Perfil Neurocognitivo Basal
                  </label>
                  <select
                    value={formProfile.neurotype}
                    onChange={(e) => setFormProfile({ ...formProfile, neurotype: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border text-base sm:text-sm outline-none cursor-pointer"
                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)', color: 'var(--text-main)' }}
                  >
                    {NEUROTYPE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span style={{ color: 'var(--text-muted)' }}>Umbral Sensorial Habitual</span>
                    <span className="tabular-nums font-bold" style={{ color: 'var(--text-main)' }}>
                      {formProfile.baselineSensoryThreshold} / 10
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formProfile.baselineSensoryThreshold}
                    onChange={(e) => setFormProfile({ ...formProfile, baselineSensoryThreshold: e.target.value })}
                    className="w-full mt-2 cursor-pointer"
                    style={{ accentColor: 'var(--accent)' }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="block text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Ambiente Visual Tenue Inicial
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRESET_THEMES.map((t) => {
                  const active = themeId === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => applyPreset(t.id)}
                      className="chip-btn p-2.5 rounded-xl border flex flex-col items-center gap-1.5 text-center cursor-pointer"
                      style={{
                        backgroundColor: 'var(--bg-input)',
                        borderColor: active ? 'var(--accent)' : 'var(--border-card)',
                      }}
                    >
                      <span className="w-4 h-4 rounded-full border border-black/10" style={{ backgroundColor: t.swatch }} />
                      <span className="text-[11px] font-semibold leading-tight">{t.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-1 flex flex-col-reverse sm:flex-row items-center gap-3">
              {userProfile && (
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="chip-btn w-full sm:flex-1 py-3.5 rounded-2xl border text-sm font-bold cursor-pointer"
                  style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-input)', color: 'var(--text-main)' }}
                >
                  Cancelar
                </button>
              )}
              <button
                type="submit"
                className="chip-btn w-full sm:flex-1 py-3.5 rounded-2xl text-sm font-bold cursor-pointer shadow-sm"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-contrast)' }}
              >
                {userProfile ? 'Guardar Parámetros' : 'Iniciar mi Entorno Clínico'}
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-center" style={{ color: 'var(--text-muted)' }}>
              <Icons.ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>Tus datos y antecedentes basales se almacenan exclusivamente de forma local en este dispositivo.</span>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const displayName = userProfile.alias || userProfile.firstName;
  const fullName = \`\${userProfile.firstName} \${userProfile.lastName}\`.trim();
  const userCycleLength = userProfile.cycleLength || 28;
  const userPeriodLength = userProfile.periodLength || 5;
  const regularityLabel = CYCLE_REGULARITY_OPTIONS.find((o) => o.id === userProfile.regularity)?.label || 'En observación';
  const currentPhase = getCyclePhase(cycleDay, userCycleLength, userPeriodLength, userProfile.regularity);
  const sensoryDelta = sensoryLoadToday - (userProfile.baselineSensoryThreshold || 5);

  const currentThemeName =
    customColors.page || customColors.card || customColors.accent
      ? 'Personalizado'
      : PRESET_THEMES.find((t) => t.id === themeId)?.name || 'Tonos Pastel (ND)';

  const circleCircumference = 2 * Math.PI * 52;
  const strokeDashoffset = circleCircumference - (Math.min(cycleDay, userCycleLength) / userCycleLength) * circleCircumference;

  return (
    <div className="min-h-screen flex flex-col justify-between p-3 sm:p-6 pb-24 lg:pb-6 max-w-7xl mx-auto gap-4 sm:gap-6 relative">
      <AuroraAmbientLayer />

      {/* FICHA CLÍNICA EXCLUSIVA PARA IMPRESIÓN PDF MÉDICO */}
      <div className="hidden print-only border-b-2 border-slate-800 pb-4 mb-4 space-y-2 relative z-10">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold uppercase tracking-wide">Informe Clínico de Seguimiento — A.U.R.O.R.A</h1>
            <p className="text-xs text-slate-600">Generado el {new Date().toLocaleDateString('es-CL', { dateStyle: 'long' })}</p>
          </div>
          <div className="text-right text-xs">
            <p><strong>Paciente:</strong> {fullName} ({displayName})</p>
            {userProfile.age && <p><strong>Edad:</strong> {userProfile.age} años</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-2 border-t text-xs">
          <p><strong>Patrón de Ciclo:</strong> {regularityLabel} (Ref: {userCycleLength}d / Sangrado: {userPeriodLength}d)</p>
          <p><strong>Estado Actual:</strong> Día {cycleDay} · {currentPhase}</p>
          <p><strong>Antecedentes de Sangrado:</strong> {userProfile.hasClotsHistory ? 'Presencia de coágulos' : 'Sin coágulos habituales'} · {userProfile.variableFlowHistory ? 'Flujos variables' : 'Flujo estable'}</p>
          <p><strong>Perfil Neurocognitivo:</strong> {userProfile.neurotype} (Umbral base: {userProfile.baselineSensoryThreshold}/10)</p>
        </div>
        {selectedFlowDetails.length > 0 && (
          <p className="text-xs pt-1"><strong>Observaciones de Flujo Hoy:</strong> {selectedFlow} ({selectedFlowDetails.join(', ')})</p>
        )}
      </div>

      {/* HEADER SUPERIOR RESPONSIVO */}
      <header className="bento-card rounded-2xl sm:rounded-3xl px-4 sm:px-5 py-3.5 sm:py-4 flex flex-wrap items-center justify-between gap-3 relative z-30">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: 'var(--bg-input)', border: '1.5px solid var(--accent)' }}
          >
            <span
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full animate-aura"
              style={{ backgroundColor: 'var(--accent)', boxShadow: '0 0 14px var(--accent)' }}
            />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-base sm:text-xl font-extrabold tracking-wide leading-tight">A.U.R.O.R.A</h1>
              <span
                className="text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full border"
                style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-card)', color: 'var(--text-main)' }}
              >
                Hola, {displayName}
              </span>
            </div>
            <p className="hidden sm:block text-[11px] tracking-widest uppercase mt-0.5" style={{ color: 'var(--text-muted)' }}>
              {regularityLabel} · {userProfile.neurotype}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 no-print ml-auto sm:ml-0">
          <button
            onClick={openProfileEditor}
            aria-label="Editar perfil y métricas personales"
            className="chip-btn px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 border cursor-pointer"
            style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-card)', color: 'var(--text-main)' }}
          >
            <Icons.Sliders className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
            <span className="hidden md:inline">Mis Métricas</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setPaletteOpen(!paletteOpen)}
              aria-expanded={paletteOpen}
              aria-label="Personalizar paleta de colores y animaciones"
              className="chip-btn px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 border cursor-pointer"
              style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-card)', color: 'var(--text-main)' }}
            >
              <span style={{ color: 'var(--accent)' }}>
                <Icons.Palette className="w-4 h-4" />
              </span>
              <span className="hidden xs:inline sm:inline">{currentThemeName}</span>
              <Icons.ChevronDown className={\`w-3.5 h-3.5 transition-transform duration-300 \${paletteOpen ? 'rotate-180' : ''}\`} />
            </button>

            {paletteOpen && (
              <div
                className="bento-card animate-pop fixed sm:absolute left-4 right-4 sm:left-auto sm:right-0 mt-2.5 sm:w-80 p-4 rounded-3xl shadow-2xl z-50 space-y-4"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    Confort Visual y Paletas Tenues
                  </span>
                  <button
                    onClick={() => setPaletteOpen(false)}
                    aria-label="Cerrar menú de temas"
                    className="p-1.5 rounded-lg opacity-75 hover:opacity-100 cursor-pointer"
                  >
                    <Icons.Close className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2">
                  {PRESET_THEMES.map((t) => {
                    const active = themeId === t.id && !customColors.page && !customColors.card && !customColors.accent;
                    return (
                      <button
                        key={t.id}
                        onClick={() => applyPreset(t.id)}
                        className="chip-btn w-full p-2.5 rounded-2xl border flex items-center justify-between text-left cursor-pointer"
                        style={{
                          backgroundColor: 'var(--bg-input)',
                          borderColor: active ? 'var(--accent)' : 'var(--border-card)',
                        }}
                      >
                        <div>
                          <div className="text-xs sm:text-sm font-bold">{t.name}</div>
                          <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{t.desc}</div>
                        </div>
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center border border-black/15 shrink-0"
                          style={{ backgroundColor: t.swatch }}
                        >
                          {active && <Icons.Check className="w-3 h-3 text-black/80" />}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2.5 border-t flex items-center justify-between" style={{ borderColor: 'var(--border-card)' }}>
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <Icons.Wind className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
                    <span>Animaciones fluidas</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setReducedMotion(!reducedMotion)}
                    className="px-2.5 py-1 rounded-lg border text-[11px] font-bold cursor-pointer"
                    style={{
                      backgroundColor: !reducedMotion ? 'var(--accent-soft)' : 'var(--bg-input)',
                      borderColor: !reducedMotion ? 'var(--accent)' : 'var(--border-card)',
                      color: 'var(--text-main)',
                    }}
                  >
                    {reducedMotion ? 'Estático' : 'Activo'}
                  </button>
                </div>

                <div className="pt-2.5 border-t space-y-2.5" style={{ borderColor: 'var(--border-card)' }}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                      Designar mis propios tonos
                    </span>
                    {(customColors.page || customColors.card || customColors.accent) && (
                      <button
                        onClick={() => applyPreset(themeId)}
                        className="text-[11px] font-semibold underline cursor-pointer"
                        style={{ color: 'var(--text-main)' }}
                      >
                        Restaurar
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <label className="flex flex-col items-center gap-1.5 p-2 rounded-xl border text-[11px] cursor-pointer" style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-input)' }}>
                      <span>Fondo</span>
                      <input type="color" value={customColors.page || '#f4e7e6'} onChange={(e) => setCustomColors({ ...customColors, page: e.target.value })} className="w-full h-7 rounded cursor-pointer bg-transparent border-0" />
                    </label>
                    <label className="flex flex-col items-center gap-1.5 p-2 rounded-xl border text-[11px] cursor-pointer" style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-input)' }}>
                      <span>Tarjetas</span>
                      <input type="color" value={customColors.card || '#fbf4f3'} onChange={(e) => setCustomColors({ ...customColors, card: e.target.value })} className="w-full h-7 rounded cursor-pointer bg-transparent border-0" />
                    </label>
                    <label className="flex flex-col items-center gap-1.5 p-2 rounded-xl border text-[11px] cursor-pointer" style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-input)' }}>
                      <span>Acento</span>
                      <input type="color" value={customColors.accent || '#df9aa8'} onChange={(e) => setCustomColors({ ...customColors, accent: e.target.value })} className="w-full h-7 rounded cursor-pointer bg-transparent border-0" />
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => window.print()}
            aria-label="Exportar PDF Médico"
            className="chip-btn px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-contrast)' }}
          >
            <Icons.FileMedical className="w-4 h-4" />
            <span className="hidden sm:inline">PDF Médico</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>
      </header>

      {/* BENTO GRID PRINCIPAL */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 flex-1 relative z-10">
        {/* COLUMNA IZQUIERDA (4 cols) */}
        <div className={\`lg:col-span-4 flex flex-col gap-5 sm:gap-6 \${mobileTab === 'ciclo' ? 'flex' : 'hidden lg:flex'}\`}>
          <section className="bento-card rounded-3xl p-5 sm:p-6 flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-3" style={{ color: 'var(--text-muted)' }}>
              <Icons.Orbit className="w-4 h-4" />
              <h2 className="text-xs font-bold uppercase tracking-widest">Mapa Orbital del Ciclo</h2>
            </div>

            <span
              className="text-xs font-bold px-3 py-1 rounded-full mb-4 border"
              style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-card)', color: 'var(--text-main)' }}
            >
              {currentPhase}
            </span>

            <div className="relative w-36 h-36 flex items-center justify-center mb-4">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="var(--border-card)" strokeWidth="7" />
                <circle
                  cx="60" cy="60" r="52" fill="none" stroke="var(--accent)" strokeWidth="7" strokeLinecap="round"
                  strokeDasharray={circleCircumference} strokeDashoffset={strokeDashoffset}
                  style={{ filter: 'drop-shadow(0 0 6px var(--accent-soft))' }}
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: 'var(--text-muted)' }}>
                  Día Actual
                </span>
                <span className="text-4xl font-extrabold tabular-nums leading-none my-0.5">{cycleDay}</span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {userProfile.regularity === 'unknown' ? 'en obs.' : \`de \${userCycleLength}\`}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 mb-3 no-print">
              <button
                onClick={() => setCycleDay((d) => (d > 1 ? d - 1 : userCycleLength))}
                className="chip-btn px-3.5 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer"
                style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-input)' }}
              >
                -1 día
              </button>
              <button
                onClick={() => setCycleDay((d) => (d < userCycleLength ? d + 1 : 1))}
                className="chip-btn px-3.5 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer"
                style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-input)' }}
              >
                +1 día
              </button>
            </div>

            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {userProfile.regularity === 'unknown'
                ? \`Modo observación activo para \${displayName}: registrando patrones reales sin forzar fechas.\`
                : \`Calibrado a tu ciclo de \${userCycleLength} días (\${userPeriodLength}d sangrado).\`}
            </p>
          </section>

          <section className="bento-card rounded-3xl p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                  Privacidad y Rol
                </h2>
                <span style={{ color: 'var(--accent)' }}>
                  <Icons.ShieldCheck className="w-4 h-4" />
                </span>
              </div>

              <div
                className="grid grid-cols-2 p-1 rounded-2xl border mb-4 no-print"
                style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-card)' }}
              >
                {['Usuaria', 'Acompañante'].map((r) => {
                  const isActive = role === r;
                  return (
                    <button
                      key={r}
                      onClick={() => setRole(r)}
                      className="chip-btn py-2 rounded-xl text-xs font-bold cursor-pointer"
                      style={{
                        backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                        color: isActive ? 'var(--accent-contrast)' : 'var(--text-muted)',
                      }}
                    >
                      {r}
                    </button>
                  );
                })}
              </div>

              <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                Datos compartidos con la vista de Acompañante:
              </p>

              <div className="space-y-3">
                {[
                  { key: 'flow', label: 'Compartir Flujo y Coágulos' },
                  { key: 'symptoms', label: 'Compartir Síntomas' },
                  { key: 'nd', label: 'Compartir ND y Carga Sensorial' },
                  { key: 'notes', label: 'Compartir Notas del Diario' },
                ].map((item) => (
                  <label key={item.key} className="flex items-center justify-between text-xs sm:text-sm font-medium cursor-pointer py-0.5">
                    <span>{item.label}</span>
                    <input
                      type="checkbox"
                      checked={privacy[item.key]}
                      onChange={() => setPrivacy({ ...privacy, [item.key]: !privacy[item.key] })}
                      className="w-4 h-4 rounded cursor-pointer"
                      style={{ accentColor: 'var(--accent)' }}
                    />
                  </label>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* COLUMNA DERECHA (8 cols) */}
        <div className={\`lg:col-span-8 flex flex-col gap-5 sm:gap-6 \${mobileTab !== 'ciclo' ? 'flex' : 'hidden lg:flex'}\`}>
          <section className={\`bento-card rounded-3xl p-5 sm:p-8 flex flex-col justify-between space-y-6 \${mobileTab === 'historial' ? 'hidden lg:flex' : 'flex'}\`}>
            {role === 'Acompañante' ? (
              <div className="animate-pop space-y-6 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b" style={{ borderColor: 'var(--border-card)' }}>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold">Estado de {displayName} (Vista Acompañante)</h2>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      Visualización filtrada según los permisos de privacidad activos
                    </p>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border"
                    style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-input)', color: 'var(--text-main)' }}
                  >
                    <Icons.Lock className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
                    <span>Solo lectura</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl border space-y-1.5" style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-card)' }}>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Flujo y Características</span>
                    <p className="text-sm font-semibold">
                      {privacy.flow
                        ? \`\${selectedFlow}\${selectedFlowDetails.length > 0 ? ' (' + selectedFlowDetails.join(', ') + ')' : ''}\`
                        : 'Oculto por privacidad'}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border space-y-1.5" style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-card)' }}>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Síntomas Activos</span>
                    <p className="text-sm font-semibold">
                      {privacy.symptoms
                        ? selectedSymptoms.length > 0 ? selectedSymptoms.join(', ') : 'Sin síntomas registrados'
                        : 'Oculto por privacidad'}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border space-y-1.5" style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-card)' }}>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Estado Neurocognitivo</span>
                    <p className="text-sm font-semibold">
                      {privacy.nd
                        ? \`Carga \${sensoryLoadToday}/10 (Base: \${userProfile.baselineSensoryThreshold}/10)\${selectedNeuro.length > 0 ? ' · ' + selectedNeuro.join(', ') : ''}\`
                        : 'Oculto por privacidad'}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border space-y-1.5" style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-card)' }}>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Notas del Diario</span>
                    <p className="text-sm font-semibold">
                      {privacy.notes ? savedNotes || 'Sin notas recientes' : 'Oculto por privacidad'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-3 pb-6 border-b no-print" style={{ borderColor: 'var(--border-card)' }}>
                  <div className="flex items-center gap-2">
                    <span style={{ color: 'var(--accent)' }}>
                      <Icons.Sparkles className="w-5 h-5" />
                    </span>
                    <h2 className="text-base sm:text-lg font-bold">Registro Inteligente</h2>
                  </div>
                  <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
                    Cuéntanos cómo te sientes hoy, {displayName} (ej. &quot;Hoy tengo cólicos, coágulos pequeños y me siento abrumada&quot;).
                  </p>
                  <form onSubmit={handleSmartAnalyze} className="flex flex-col sm:flex-row gap-2.5 pt-1">
                    <input
                      type="text"
                      value={diaryInput}
                      onChange={(e) => setDiaryInput(e.target.value)}
                      placeholder="Escribe tu diario aquí..."
                      className="flex-1 px-4 py-3 rounded-2xl border text-base sm:text-sm outline-none transition-colors"
                      style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-card)', color: 'var(--text-main)' }}
                    />
                    <button
                      type="submit"
                      className="chip-btn px-6 py-3 rounded-2xl text-sm font-bold cursor-pointer"
                      style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-contrast)' }}
                    >
                      Analizar
                    </button>
                  </form>
                  {aiFeedback && (
                    <p className="text-xs font-medium pt-1 flex items-center gap-1.5 animate-pop" style={{ color: 'var(--text-main)' }}>
                      <Icons.Check className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--accent)' }} />
                      <span>{aiFeedback}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-6 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-base sm:text-lg font-bold">Registro Manual</h2>
                    <button
                      type="button"
                      onClick={handleSaveSnapshot}
                      className="chip-btn no-print px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border cursor-pointer"
                      style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--accent)', color: 'var(--text-main)' }}
                    >
                      <Icons.Bookmark className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
                      <span>{saveToast ? 'Guardado en bitácora' : 'Guardar en Bitácora'}</span>
                    </button>
                  </div>

                  {/* Intensidad y Características de Flujo */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                      <Icons.Droplet className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
                      <span className="text-xs font-bold uppercase tracking-wider">Intensidad y Características de Flujo</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                      {FLOW_LEVELS.map((level) => {
                        const active = selectedFlow === level;
                        return (
                          <button
                            key={level}
                            type="button"
                            onClick={() => setSelectedFlow(level)}
                            className="chip-btn py-3 px-4 rounded-2xl border text-xs sm:text-sm font-bold cursor-pointer"
                            style={{
                              backgroundColor: active ? 'var(--accent)' : 'var(--bg-input)',
                              borderColor: active ? 'var(--accent)' : 'var(--border-card)',
                              color: active ? 'var(--accent-contrast)' : 'var(--text-main)',
                            }}
                          >
                            {level}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {FLOW_DETAILS_LIST.map((det) => {
                        const active = selectedFlowDetails.includes(det);
                        return (
                          <button
                            key={det}
                            type="button"
                            onClick={() => toggleItem(selectedFlowDetails, setSelectedFlowDetails, det)}
                            className="chip-btn px-3.5 py-1.5 rounded-full border text-xs font-medium cursor-pointer flex items-center gap-1.5"
                            style={{
                              backgroundColor: active ? 'var(--accent)' : 'var(--bg-input)',
                              borderColor: active ? 'var(--accent)' : 'var(--border-card)',
                              color: active ? 'var(--accent-contrast)' : 'var(--text-main)',
                            }}
                          >
                            {active && <Icons.Check className="w-3 h-3" />}
                            <span>{det}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Síntomas */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                      <Icons.Activity className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
                      <span className="text-xs font-bold uppercase tracking-wider">Síntomas</span>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                      {SYMPTOMS_LIST.map((sym) => {
                        const active = selectedSymptoms.includes(sym);
                        return (
                          <button
                            key={sym}
                            type="button"
                            onClick={() => toggleItem(selectedSymptoms, setSelectedSymptoms, sym)}
                            className="chip-btn px-3.5 sm:px-4 py-2 rounded-full border text-xs sm:text-sm font-medium cursor-pointer flex items-center gap-1.5"
                            style={{
                              backgroundColor: active ? 'var(--accent)' : 'var(--bg-input)',
                              borderColor: active ? 'var(--accent)' : 'var(--border-card)',
                              color: active ? 'var(--accent-contrast)' : 'var(--text-main)',
                            }}
                          >
                            {active && <Icons.Check className="w-3.5 h-3.5" />}
                            <span>{sym}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Panel Neurocognitivo */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5" style={{ color: 'var(--text-main)' }}>
                        <Icons.Brain className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
                        <span className="text-xs font-bold uppercase tracking-wider">Panel Neurocognitivo</span>
                      </div>
                      <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>
                        Tu umbral habitual: <strong style={{ color: 'var(--text-main)' }}>{userProfile.baselineSensoryThreshold}/10</strong>
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl border space-y-2" style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-card)' }}>
                      <div className="flex items-center justify-between text-xs">
                        <span style={{ color: 'var(--text-muted)' }}>Carga sensorial actual</span>
                        <span className="font-bold tabular-nums" style={{ color: 'var(--text-main)' }}>
                          {sensoryLoadToday}/10 {sensoryDelta === 0 ? '(En tu línea base)' : sensoryDelta > 0 ? \`(+\${sensoryDelta} sobre tu base)\` : \`(\${sensoryDelta} bajo tu base)\`}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={sensoryLoadToday}
                        onChange={(e) => setSensoryLoadToday(Number(e.target.value))}
                        className="w-full cursor-pointer"
                        style={{ accentColor: 'var(--accent)' }}
                      />
                    </div>

                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                      {NEURO_LIST.map((item) => {
                        const active = selectedNeuro.includes(item);
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => toggleItem(selectedNeuro, setSelectedNeuro, item)}
                            className="chip-btn px-3.5 sm:px-4 py-2 rounded-full border text-xs sm:text-sm font-medium cursor-pointer flex items-center gap-1.5"
                            style={{
                              backgroundColor: active ? 'var(--accent)' : 'var(--bg-input)',
                              borderColor: active ? 'var(--accent)' : 'var(--border-card)',
                              color: active ? 'var(--accent-contrast)' : 'var(--text-main)',
                            }}
                          >
                            {active && <Icons.Check className="w-3.5 h-3.5" />}
                            <span>{item}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>

          {/* BITÁCORA HISTÓRICA INTERACTIVA */}
          {historyLogs.length > 0 && (
            <section className={\`bento-card rounded-3xl p-5 sm:p-6 space-y-4 \${mobileTab === 'historial' ? 'flex flex-col' : 'hidden lg:flex lg:flex-col'}\`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                  <Icons.ClipboardList className="w-4 h-4" />
                  <h2 className="text-xs font-bold uppercase tracking-widest">Bitácora de Registros Guardados</h2>
                </div>
                <span className="text-xs font-semibold tabular-nums" style={{ color: 'var(--text-main)' }}>
                  {historyLogs.length} {historyLogs.length === 1 ? 'registro' : 'registros'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1">
                {historyLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3.5 rounded-2xl border flex flex-col justify-between gap-2 animate-pop"
                    style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-card)' }}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold" style={{ color: 'var(--text-main)' }}>
                        Día {log.cycleDay} · {log.timestamp}
                      </span>
                      <button
                        onClick={() => handleDeleteLog(log.id)}
                        aria-label="Eliminar registro"
                        className="p-1 opacity-60 hover:opacity-100 cursor-pointer no-print"
                      >
                        <Icons.Trash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-xs space-y-1">
                      <p><span style={{ color: 'var(--text-muted)' }}>Flujo:</span> {log.flow}{log.flowDetails?.length ? \` (\${log.flowDetails.join(', ')})\` : ''}</p>
                      <p><span style={{ color: 'var(--text-muted)' }}>Carga Sensorial:</span> {log.sensoryLoad || userProfile.baselineSensoryThreshold}/10</p>
                      {log.symptoms.length > 0 && <p><span style={{ color: 'var(--text-muted)' }}>Síntomas:</span> {log.symptoms.join(', ')}</p>}
                      {log.neuro.length > 0 && <p><span style={{ color: 'var(--text-muted)' }}>Neuro:</span> {log.neuro.join(', ')}</p>}
                      {log.note && <p className="italic opacity-85 pt-0.5">&quot;{log.note}&quot;</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* BARRA DE NAVEGACIÓN INFERIOR SOLO EN MÓVIL */}
      <nav
        aria-label="Navegación móvil"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 border-t backdrop-blur-md px-4 py-2 flex items-center justify-around no-print"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
      >
        {[
          { id: 'registro', label: 'Registro', icon: Icons.Activity },
          { id: 'ciclo', label: 'Ciclo y Rol', icon: Icons.Orbit },
          { id: 'historial', label: \`Bitácora (\${historyLogs.length})\`, icon: Icons.ClipboardList },
        ].map((tab) => {
          const IconComp = tab.icon;
          const active = mobileTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setMobileTab(tab.id)}
              className="flex flex-col items-center justify-center py-1.5 px-3 rounded-xl text-[11px] font-bold gap-1 transition-colors cursor-pointer"
              style={{ color: active ? 'var(--text-main)' : 'var(--text-muted)' }}
            >
              <IconComp className="w-4 h-4" style={active ? { color: 'var(--accent)' } : {}} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* BOTÓN FLOTANTE Y VENTANA DE CHAT (PRÓXIMAMENTE) */}
      <div className="fixed bottom-16 lg:bottom-5 right-4 sm:right-5 z-40 no-print">
        {chatOpen ? (
          <div
            className="bento-card animate-pop w-[calc(100vw-2rem)] sm:w-96 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--accent)' }}
          >
            <div className="p-4 flex items-center justify-between border-b" style={{ borderColor: 'var(--border-card)' }}>
              <div className="flex items-center gap-2">
                <span style={{ color: 'var(--accent)' }}>
                  <Icons.Sparkles className="w-4 h-4" />
                </span>
                <span className="font-bold text-sm">A.U.R.O.R.A Chat</span>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-contrast)' }}
                >
                  Próximamente
                </span>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                aria-label="Cerrar chat"
                className="p-1.5 rounded-lg opacity-75 hover:opacity-100 cursor-pointer"
              >
                <Icons.Close className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 h-56 sm:h-60 overflow-y-auto space-y-3">
              {chatMessages.map((m, i) => (
                <div
                  key={i}
                  className={\`p-3 rounded-2xl text-xs sm:text-sm max-w-[85%] \${m.sender === 'user' ? 'ml-auto font-medium' : ''}\`}
                  style={{
                    backgroundColor: m.sender === 'user' ? 'var(--accent)' : 'var(--bg-input)',
                    color: m.sender === 'user' ? 'var(--accent-contrast)' : 'var(--text-main)',
                    border: m.sender === 'aurora' ? '1px solid var(--border-card)' : 'none',
                  }}
                >
                  {m.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="p-3 border-t flex gap-2" style={{ borderColor: 'var(--border-card)' }}>
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Escribe aquí..."
                className="flex-1 px-3 py-2 rounded-xl text-base sm:text-sm border outline-none"
                style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-card)', color: 'var(--text-main)' }}
              />
              <button
                type="submit"
                aria-label="Enviar mensaje"
                className="chip-btn px-3.5 py-2 rounded-xl font-bold flex items-center justify-center cursor-pointer"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-contrast)' }}
              >
                <Icons.Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <button
            onClick={() => setChatOpen(true)}
            aria-label="Abrir chat (Próximamente)"
            className="chip-btn w-12 h-12 rounded-full shadow-lg flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-contrast)' }}
          >
            <Icons.MessageSquare className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join(rootDir, 'package.json'), JSON.stringify(packageJson, null, 2), 'utf8');
fs.writeFileSync(path.join(rootDir, 'vite.config.js'), viteConfig, 'utf8');
fs.writeFileSync(path.join(rootDir, 'tailwind.config.js'), tailwindConfig, 'utf8');
fs.writeFileSync(path.join(rootDir, 'postcss.config.js'), postcssConfig, 'utf8');
fs.writeFileSync(path.join(rootDir, 'index.html'), indexHtml, 'utf8');
fs.writeFileSync(path.join(srcDir, 'main.jsx'), mainJsx, 'utf8');
fs.writeFileSync(path.join(srcDir, 'index.css'), indexCss, 'utf8');
fs.writeFileSync(path.join(srcDir, 'App.jsx'), appJsx, 'utf8');

console.log('Paleta Pastel suave inspirada en la guia configurada como tema predeterminado en A.U.R.O.R.A.');