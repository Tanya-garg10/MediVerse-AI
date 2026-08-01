# MediVerse AI

An intelligent healthcare companion powered by AI — helping users understand symptoms, explore medical information, and navigate their health journey with confidence.

## Features

- 🩺 AI-powered symptom checker
- 💊 Medication information & interaction insights
- 📋 Personalized health dashboard
- 🔍 Medical knowledge search powered by Tavily
- 🌙 Dark / light theme support
- 🔐 Secure authentication

## Tech Stack

- [TanStack Start](https://tanstack.com/start) — full-stack React framework
- [TypeScript](https://www.typescriptlang.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) — accessible component primitives
- [AI SDK](https://sdk.vercel.ai/) — streaming AI responses
- [Tavily](https://tavily.com/) — real-time medical search

## Getting Started

You need [Node.js](https://nodejs.org/) and [Bun](https://bun.sh/) installed.

```sh
git clone https://github.com/codewithprernaa/MediVerse-AI.git
cd MediVerse-AI
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run preview` | Preview production build |
| `bun run lint` | Run ESLint |
| `bun run format` | Format code with Prettier |

## Environment Variables

Create a `.env` file in the root:

```env
GROQ_API_KEY=your_groq_api_key
TAVILY_API_KEY=your_tavily_api_key
```

## License

MIT
