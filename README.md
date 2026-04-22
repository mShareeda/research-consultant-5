<div align="center">
<img width="1200" height="475" alt="Smart Theory Alignment System Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# Smart Theory Alignment System

**Intelligent research theory alignment and hypothesis generation for academic excellence**

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1-blue.svg)](https://vitejs.dev/)
[![Gemini API](https://img.shields.io/badge/Gemini%20API-1.30-orange.svg)](https://ai.google.dev/)

[**Documentation**](#getting-started) • [**Contribute**](#contributing) • [**Report Issue**](https://github.com/mShareeda/research-consultant-5/issues)

</div>

---

## ✨ Introduction

A sophisticated research assistant platform designed for graduate researchers and academics. Leverage advanced AI to discover aligned theoretical frameworks, generate grounded hypotheses, and produce publication-ready research reports. Full bilingual support (Arabic/English) with an elegant, scholarly design system.

## Quick Start

```bash
# Clone and setup
git clone https://github.com/mShareeda/research-consultant-5.git
cd research-consultant-5
npm install

# Configure API key
echo "VITE_GEMINI_API_KEY=your_key_here" > .env.local

# Start development server
npm run dev
```

Navigate to `http://localhost:5173` • [Get Gemini API Key](https://ai.google.dev/)

---

## Core Features

| Feature | Description |
|---------|-------------|
| **AI-Powered Theory Discovery** | Intelligent recommendations based on research focus, academic level, and methodology |
| **Theory Comparison** | Side-by-side analysis with strengths, weaknesses, and alignment assessment |
| **Hypothesis Generation** | Automatic derivation of study-specific hypotheses from selected frameworks |
| **Research Reports** | Publication-ready reports with methodology justification and visual diagrams |
| **Bilingual Interface** | Full Arabic (RTL) and English (LTR) support for global research collaboration |
| **Impeccable Design** | Scholarly aesthetic with Instrument Serif + Cairo typography, intentional hierarchy |
| **Accessible & Responsive** | WCAG 2.1 AA compliant, mobile-optimized, keyboard navigation support |

---

## Installation & Configuration

### Requirements

- **Node.js** 18+ (or **Bun**)
- **Gemini API Key** – [Free at Google AI Studio](https://ai.google.dev/)

### Setup

1. **Clone repository**
   ```bash
   git clone https://github.com/mShareeda/research-consultant-5.git && cd research-consultant-5
   ```

2. **Install dependencies**
   ```bash
   npm install    # or: bun install
   ```

3. **Configure environment**
   ```bash
   echo "VITE_GEMINI_API_KEY=your_key_here" > .env.local
   ```

4. **Run locally**
   ```bash
   npm run dev    # or: bun run dev
   ```
   Open [`http://localhost:5173`](http://localhost:5173)

---

## Workflow

| Step | Action | Outcome |
|------|--------|---------|
| **1. Language** | Select Arabic or English | Interface configures to your preference |
| **2. Research Input** | Provide topic, level, type, field | System understands your research context |
| **3. Theory Discovery** | Review AI-suggested theories | Compare frameworks, inspect details |
| **4. Selection** | Choose theories & hypotheses | Build your theoretical foundation |
| **5. Report Generation** | Generate publication-ready output | Framework diagram + methodology + justification |

---

## Build & Deployment

```bash
# Production build
npm run build

# Preview build
npm run preview
```

**Deployment Platforms:** Vercel (recommended) • Netlify • Cloudflare Pages • Any static SPA host

**Environment Setup (Vercel):**
1. Connect GitHub repository
2. Settings → Environment Variables
3. Add `VITE_GEMINI_API_KEY` with your API key
4. Deploy automatically on push

---

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Runtime** | Node.js / Bun | 18+ |
| **UI Framework** | React | 18.3 |
| **Language** | TypeScript | 5.4 |
| **Build Tool** | Vite | 5.1 |
| **Styling** | Tailwind CSS | 3.4 |
| **Icons** | Lucide React | 0.344 |
| **AI Backend** | Google Gemini API | 1.30 |
| **Diagrams** | Mermaid | 11.4 |

---

## Design Principles

This application follows **Impeccable design principles** — a framework for distinctive, production-grade frontend interfaces:

- **Typography** — Instrument Serif (English headings) + Cairo (Arabic/body)
- **Color System** — Deep navy authority + warm gold accent + warm surface
- **Spacing** — Consistent 4-point rhythm with clear visual hierarchy
- **Motion** — Purposeful animations with `prefers-reduced-motion` support
- **Anti-patterns** — No glassmorphism, bounce effects, or competing visual noise

Result: A precise, scholarly aesthetic distinctly different from generic SaaS applications.

---

## Architecture

```
src/
├── components/              # React UI components
│   ├── Header.tsx          # Navigation & branding
│   ├── StepInput.tsx       # Research input form
│   ├── StepTheories.tsx    # Theory discovery & comparison
│   ├── StepHypothesesPicking.tsx # Hypothesis selection
│   ├── StepReport.tsx      # Final report generation
│   ├── Loading.tsx         # Loading state
│   ├── Mermaid.tsx         # Diagram rendering
│   └── Tooltip.tsx         # Helper tooltips
├── services/
│   └── gemini.ts          # Google Gemini API client
├── utils/
│   └── translations.ts    # Bilingual support (AR/EN)
├── App.tsx                # Main app component
├── index.tsx              # React DOM entry
├── types.ts               # TypeScript definitions
├── index.css              # Global styles
├── index.html             # HTML template
├── tailwind.config.js     # Tailwind design tokens
├── tsconfig.json          # TypeScript compiler
└── vite.config.ts         # Vite bundler config
```

---

## Configuration

### Environment Variables

```env
VITE_GEMINI_API_KEY=your_api_key_from_ai.google.dev
```

### Design System

Built on Impeccable design principles with custom Tailwind tokens:

| Category | Details |
|----------|---------|
| **Colors** | Deep navy (`#1E3A8A`) + warm gold (`#B5851B`) + off-white surface |
| **Typography** | Instrument Serif (headings) + Cairo (Arabic/body) |
| **Spacing** | 4-point grid system, consistent hierarchy |
| **Radius** | Card: 20px, Sheet: 28px |
| **Motion** | Purposeful animations, respects `prefers-reduced-motion` |

---

## Accessibility

✅ **WCAG 2.1 Level AA** • ✅ Reduced-motion support • ✅ Semantic HTML • ✅ Keyboard navigation • ✅ High contrast • ✅ Screen reader optimized

---

## Internationalization

**Supported:** Arabic (RTL, Cairo font) • English (LTR, Instrument Serif)

To add a language, extend `utils/translations.ts`:

```typescript
export const translations: Record<Language, Translations> = {
  ar: { /* Arabic */ },
  en: { /* English */ },
  fr: { /* Your language */ },
};
```

---

## Performance

| Metric | Target |
|--------|--------|
| Build Size | ~150KB (gzipped) |
| Time to Interactive | < 2s (4G networks) |
| Lighthouse Score | 90+ (all categories) |
| API Response | 3-8s (theory generation) |

---

## Contributing

We welcome contributions! To get started:

```bash
# Fork → Clone → Branch
git checkout -b feature/your-feature

# Make changes following these guidelines:
# - Use TypeScript for type safety
# - Follow existing component patterns
# - Test on Arabic & English interfaces
# - Ensure WCAG 2.1 AA compliance
# - Use 2-space indentation

# Commit & push
git commit -m "Add feature description"
git push origin feature/your-feature
```

Then [open a Pull Request](https://github.com/mShareeda/research-consultant-5/pulls).

---

## Support

- 🐛 [Report Issues](https://github.com/mShareeda/research-consultant-5/issues)
- 📧 Email: m.shareeda@gmail.com
- 📖 [Dev Setup](CLAUDE.md)

---

## License

[Apache License 2.0](LICENSE) — Free for personal and commercial use.

---

## Acknowledgments

**Design & Principles** • [Anthropic](https://anthropic.com) — Impeccable design system  
**AI Backbone** • [Google Gemini API](https://ai.google.dev/)  
**Web Stack** • [React](https://react.dev) • [Vite](https://vitejs.dev) • [Tailwind CSS](https://tailwindcss.com)  
**Icons** • [Lucide React](https://lucide.dev)

---

<div align="center">

**Crafted with precision** • [mShareeda](https://github.com/mShareeda) • 2025

[⬆ back to top](#smart-theory-alignment-system)

</div>
