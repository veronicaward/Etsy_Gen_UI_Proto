# Etsy AI Shopping Assistant

A generative UI prototype built with [Tambo AI](https://tambo.co) and Next.js that lets users search and browse Etsy listings through a conversational AI interface. The AI dynamically renders product grids in response to natural language shopping queries.

> **Note:** The Etsy API key is currently pending approval. The app uses mock product data in the meantime and will automatically switch to live Etsy listings once the key is approved.

## What It Does

Users can chat with an AI shopping assistant to find Etsy products. The AI understands queries like:

- "Show me handmade ceramic mugs under $40"
- "I need a personalized housewarming gift"
- "Find silver jewelry with high ratings"

The assistant calls a `searchListings` tool and renders results in a `ProductGrid` component — all driven by the AI in real time.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Add your API keys to `.env.local`:

```
NEXT_PUBLIC_TAMBO_API_KEY=your_tambo_key
ETSY_API_KEY=your_etsy_key  # optional until approved
```

3. Start the dev server:

```bash
npm run dev
```

Open [localhost:3000](http://localhost:3000) and navigate to `/chat` to use the assistant.

## Etsy API Status

The app proxies Etsy listing searches through `/api/etsy-search` using the [Etsy Open API v3](https://developers.etsy.com/documentation/). The API key is **pending approval** from Etsy's developer program.

Until approved, the app falls back to a curated set of mock listings that demonstrate the full UI experience. No code changes are needed — the fallback is automatic.

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Home / landing page
│   ├── chat/
│   │   ├── page.tsx                # Chat interface with TamboProvider
│   │   └── loading.tsx             # Loading skeleton
│   └── api/
│       └── etsy-search/
│           └── route.ts            # Server-side Etsy API proxy
├── components/
│   └── tambo/
│       ├── product-grid.tsx        # AI-rendered product listing grid
│       └── message-thread-full.tsx # Chat UI layout
├── lib/
│   └── tambo.ts                    # Component + tool registration
└── services/
    └── etsy-listings.ts            # searchListings tool + mock data fallback
```

## How It Works

### Registered Component

`ProductGrid` displays a grid of Etsy listings with images, shop names, prices, and favorite counts. It's registered in `src/lib/tambo.ts` so the AI can render it dynamically.

### Registered Tool

`searchListings` is called by the AI to fetch product data before rendering. It hits the `/api/etsy-search` proxy, which calls Etsy's API. While the Etsy key is pending, it returns mock listings filtered by keyword and price.

### Flow

```
User message → Tambo AI → calls searchListings → renders ProductGrid
```

## Tech Stack

- [Next.js](https://nextjs.org) 15 with App Router
- [React](https://react.dev) 19
- [Tambo AI](https://tambo.co) (`@tambo-ai/react`) for generative UI
- [Tailwind CSS](https://tailwindcss.com) v4
- [Zod](https://zod.dev) for schema validation

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
