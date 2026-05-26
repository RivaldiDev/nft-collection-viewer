<div align="center">

# NFT Galaxy

**Explore and discover top NFT collections with floor prices, volume, and rankings.**

[![Tech Stack](https://skillicons.dev/icons?i=nextjs,typescript,tailwind,github&theme=dark&perline=4)](https://skillicons.dev)

![Next.js](https://img.shields.io/badge/Next.js_16-App_Router-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Components-000000?style=for-the-badge)
![CoinGecko_NFT-API-violet](https://img.shields.io/badge/CoinGecko_NFT--API--violet)

[![GitHub](https://img.shields.io/badge/Source_Code-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/RivaldiDev/nft-collection-viewer)
[![Vercel](https://img.shields.io/badge/Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://nft-collection-viewer-omega.vercel.app)

[Overview](#overview) · [Features](#features) · [Tech Stack](#tech-stack) · [API](#api) · [Getting Started](#getting-started) · [Architecture](#architecture)

</div>

---

## Overview

Explore and discover top NFT collections with floor prices, volume, and rankings.

Built with **Next.js 16** (App Router, TypeScript), **shadcn/ui** component library, **Tailwind CSS**, and **Framer Motion** for animations. All data is fetched client-side from free public APIs — no API keys required, no backend server.

## Features

| Area | What it does |
| --- | --- |
| **Collection Grid** | Top 20 NFT collections in responsive card grid with emoji icons. |
| **Floor Prices** | Real-time floor price and 24h volume for each collection. |
| **Rankings** | Numbered rankings with chain platform badges. |
| **Hover Effects** | Card elevation animation on hover with Framer Motion. |
| **UI/UX** | Violet/cyan gradient dark theme with glassmorphism cards. |

## Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | Next.js 16 (App Router, TypeScript) |
| **UI Components** | shadcn/ui (Radix + Tailwind) |
| **Styling** | Tailwind CSS 4 |
| **Animations** | Framer Motion |
| **API** | CoinGecko NFT API (Free, No API Key) |
| **Deployment** | Vercel |

## API

This project uses **CoinGecko NFT API** — completely free, no authentication required.

| Endpoint | Purpose |
| --- | --- |
| Free tier | No rate limiting for reasonable usage |
| No API key | Direct fetch from browser |
| CORS | Enabled for client-side requests |

## Getting Started

```bash
# Clone the repository
git clone https://github.com/RivaldiDev/nft-collection-viewer.git
cd nft-collection-viewer

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture

```
src/
├── app/
│   ├── layout.tsx        # Root layout with metadata
│   ├── page.tsx          # Main dashboard page (client component)
│   └── globals.css       # Tailwind CSS globals with dark theme
├── components/
│   └── ui/               # shadcn/ui components (Card, Badge, Button)
└── lib/
    └── utils.ts          # Utility functions (cn helper)
```

## Deployment

This project is deployed on **Vercel** with automatic deployments from the `main` branch.

```bash
# Deploy to Vercel
npx vercel --prod
```

---

<div align="center">

![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>
