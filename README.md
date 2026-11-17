# A.U.R.O.R.A
### Adaptive Unified Resource for Orbital Rhythm & Awareness

**Monitor Clínico Adaptativo de Salud Menstrual, Carga Sensorial y Perfil Neurocognitivo**

[![React](https://img.shields.io/badge/React-18.3.1-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4.8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.13-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Privacy](https://img.shields.io/badge/Privacy-Local--First_100%25-df9aa8?style=for-the-badge&logo=shield&logoColor=3b1c20)](#-arquitectura-de-privacidad-y-seguridad)
[![Accessibility](https://img.shields.io/badge/A11y-WCAG_AAA_&_ND_Friendly-49282c?style=for-the-badge)](#-diseño-sensorial-y-accesibilidad-nd)

[Características Clave](#-características-principales) •
[Arquitectura](#️-arquitectura-del-sistema) •
[Instalación Rápida](#-instalación-y-despliegue-local) •
[Métricas Clínicas](#-modelo-de-datos-y-métricas-basales) •
[Roadmap](#️-roadmap-de-ingeniería)

</div>

---

> [!NOTE]
> **Enfoque Clínico y Sensorial:** A.U.R.O.R.A está diseñado bajo principios de **Diseño Inclusivo para Neurodivergencias (ND)** y arquitectura **Local-First**. Todos los datos fisiológicos, bitácoras y parámetros basales residen exclusivamente en el almacenamiento local del dispositivo de la usuaria, eliminando la exposición de datos médicos sensibles en servidores de terceros.

---

## 📋 Descripción del Proyecto

**A.U.R.O.R.A** es una aplicación web progresiva (PWA-ready) orientada al seguimiento personalizado del ciclo menstrual y su intersección con la regulación neurocognitiva y sensorial. A diferencia de los calendarios menstruales tradicionales basados en modelos rígidos de 28 días, A.U.R.O.R.A permite calibrar **métricas basales individuales** e incluye un **Modo Observación** para ciclos irregulares o en etapa de diagnóstico, generando fichas clínicas listas para consulta ginecológica o terapéutica.

---

## ✨ Características Principales

* **🧬 Calibración Clínica Personalizada (Onboarding):** Configuración de identidad, alias preferido, edad, patrón de regularidad (*Regular*, *Irregular*, *En observación*), duración basal de ciclo/sangrado, antecedentes de coágulos o flujos variables, perfil neurocognitivo (*TDAH, CEA, AuDHD, PAS, En exploración*) y umbral sensorial habitual (escala `1–10`).
* **🪐 Mapa Orbital Dinámico:** Visualización vectorial SVG sincronizada con la duración real o modo de observación del ciclo de la paciente, calculando fases fisiológicas y desviaciones respecto a su línea base.
* **🩸 Registro Multimodal (Inteligente + Manual):**
  * **Procesamiento Léxico en Diario:** Detección automática de síntomas físicos, sobrecarga sensorial y características del flujo (ej. presencia de coágulos) a partir de lenguaje natural.
  * **Registro Estructurado:** Selección rápida de intensidad de flujo, indicadores clínicos de sangrado (*coágulos pequeños/abundantes, flujo variable, manchado*), síntomas físicos y panel neurocognitivo con delta comparativo frente al umbral basal.
* **🛡️ Control Granular de Privacidad y Rol Acompañante:** Conmutador en tiempo real entre vista **Usuaria** y vista **Acompañante** (solo lectura) con permisos independientes por categoría (*Flujo, Síntomas, Carga ND, Notas*).
* **📄 Exportación de Informe PDF Médico:** Hoja de estilos `@media print` dedicada que transforma el estado actual y las métricas basales en una ficha clínica estructurada y limpia para médicos tratantes.
* **🎨 Confort Visual Adaptativo (Glassmorphism 2.0):** Paleta **Tonos Pastel (ND)** predeterminada de baja luminancia y cero reflejo, acompañada de temas alternativos (*Aurora Boreal, Niebla Nórdica, Alto Contraste AAA*), selector libre de color con cálculo automático de contraste y control de reducción de movimiento.

---

## 🏗️ Arquitectura del Sistema

```mermaid
flowchart TD
    subgraph Client ["Capa de Presentación & Estado (React 18 + Vite)"]
        UI["Interfaz Bento Grid Responsiva"]
        Theme["Motor de Temas & Confort Visual\n(CSS Custom Properties + Glassmorphism)"]
        Parser["Analizador Léxico Local\n(Detección de Síntomas & Flujo)"]
        Print["Motor de Impresión Clínica\n(@media print PDF)"]
    end

    subgraph Storage ["Persistencia Local-First (Zero-Knowledge)"]
        LS[("window.localStorage\n• aurora-user-profile-v3\n• aurora-history-logs\n• aurora-theme-id-v2")]
    end

    subgraph Roles ["Control de Acceso Basado en Roles (RBAC Local)"]
        User["Rol: Usuaria\n(Lectura / Escritura Completa)"]
        Comp["Rol: Acompañante\n(Vista Filtrada por Permisos)"]
    end

    UI <--> LS
    Parser --> UI
    Theme --> UI
    UI --> Print
    User --> UI
    LS --> Comp
Stack TecnológicoCapaTecnologíaPropósito TécnicoCore UIReact 18.3.1Gestión de estado reactivo y arquitectura modular de componentes.BundlerVite 5.4.8Compilación ultrarrápida con HMR (Hot Module Replacement).EstilosTailwind CSS 3.4.13Sistema de diseño responsivo Mobile-First y utilidades de layout.Motor VisualCSS Custom PropertiesInyección dinámica de tokens de color, desenfoque óptico (backdrop-filter) y accesibilidad prefers-reduced-motion.IconografíaCustom SVG SystemIconos vectoriales ligeros (1.75px stroke) sin dependencias externas ni emojis.🎨 Diseño Sensorial y Accesibilidad (ND)La interfaz sigue estándares de ergonomía cognitiva para prevenir la sobreestimulación visual:TemaFondo BaseSuperficie TarjetaAcento PrincipalUso RecomendadoTonos Pastel (ND) (Default)#f4e7e6rgba(251, 244, 243, 0.84)#df9aa8Uso diario cálido sin destellos blancos.Aurora Boreal#070d12rgba(13, 24, 32, 0.76)#56b4a9Ambientes nocturnos o baja iluminación.Niebla Nórdica#1b1f25rgba(35, 40, 48, 0.78)#7d90a6Descanso ocular con mínima saturación.Alto Contraste (AAA)#000000#090909#eab308Máxima legibilidad sin transparencias.🚀 Instalación y Despliegue LocalPrerrequisitosNode.js >= 18.0.0 (probado en v24.20.0)npm >= 9.0.0Pasos de EjecuciónBash# 1. Clonar el repositorio
git clone [https://github.com/Alphareone/Aurora_RCM.git](https://github.com/Alphareone/Aurora_RCM.git)

# 2. Ingresar al directorio del proyecto
cd Aurora_RCM

# 3. Instalar dependencias
npm install

# 4. Iniciar entorno de desarrollo
npm run dev
La aplicación estará disponible en http://localhost:5173/.npm run dev: Levanta el servidor local de desarrollo con Vite.npm run build: Genera el empaquetado optimizado para producción en la carpeta /dist.npm run preview: Previsualiza localmente la compilación de producción.node generar-aurora.mjs: Script generador de arquitectura base y regeneración limpia de módulos.📊 Modelo de Datos y Métricas BasalesJSON{
  "firstName": "María Fernanda",
  "lastName": "Vergara Carmona",
  "alias": "Mafer",
  "age": 23,
  "regularity": "unknown",
  "cycleLength": 28,
  "periodLength": 5,
  "hasClotsHistory": true,
  "variableFlowHistory": true,
  "neurotype": "En exploración / Sin diagnóstico",
  "baselineSensoryThreshold": 5
}
📁 Estructura del ProyectoPlaintextAurora_RCM/
├── index.html               # Punto de entrada HTML5 y metadatos PWA
├── package.json             # Dependencias y scripts de construcción
├── postcss.config.js        # Configuración de PostCSS
├── tailwind.config.js       # Configuración de Tailwind CSS
├── vite.config.js           # Configuración del empaquetador Vite
├── generar-aurora.mjs       # Script de scaffolding automatizado
└── src/
    ├── main.jsx             # Montaje del árbol React
    ├── index.css            # Tokens cromáticos, Glassmorphism 2.0 y reglas @media print
    └── App.jsx              # Lógica clínica, Mapa Orbital, Bitácora y Vistas por Rol
🗺️ Roadmap de Ingeniería[x] v1.0 — Core Clínico & Sensorial: Onboarding personalizado, soporte para ciclos en observación, registro de coágulos, bitácora local y exportación PDF Médico.[ ] v1.1 — Analítica Longitudinal: Gráficos de correlación entre fases del ciclo, frecuencia de coágulos y picos de sobrecarga sensorial.[ ] v1.2 — Sincronización Cifrada Opcional (E2EE): Compartición en tiempo real mediante enlace cifrado de extremo a extremo para el Rol Acompañante.[ ] v2.0 — Asistente Conversacional A.U.R.O.R.A: Integración de módulo de acompañamiento contextual basado en el historial clínico de la paciente.