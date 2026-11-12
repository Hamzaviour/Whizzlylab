# Whizzly Lab

Premium landing page for **Whizzly Lab** — an advanced technology agency specializing in AI, Machine Learning, Big Data Automation, and Full-Stack Web Development.

Built with Next.js, Tailwind CSS, and Framer Motion. Includes Antigravity-style interactive particle background, glassmorphic UI, infinite tech marquees, and portfolio-backed case studies.

**[🌐 Live site: whizzlylab.com](https://www.whizzlylab.com/)**

<a href="https://www.whizzlylab.com/"><img src="https://github.com/user-attachments/assets/6a880dee-e576-474e-9e91-41838d2dfc6f" alt="Whizzly Lab homepage: Building Digital Solutions That Matter" width="760"></a>

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server (webpack) |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run seo:agent` | Run the SEO agent (`scripts/seo/seo_agent_runner.py`, needs Python) |
| `npm run seo:audit` | Run the SEO agent without submitting URLs for indexing |
| `npm run seo:index` | Submit URLs for instant indexing (`scripts/seo/instant_index.py`) |

## Stack

- Next.js 16 (App Router)
- Tailwind CSS 4
- Framer Motion
- Lucide React icons
- Custom canvas particle network

## Structure

- `src/components/` — Navbar, Hero, Services, TechArsenal, CaseStudies, OurEdge, ContactCTA, Footer, ParticleBackground
- `public/logo.png` — Brand logo
- `public/neural-mesh.png` — Hero atmosphere visual
