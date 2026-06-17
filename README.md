# 🤖 AI Self-Introduction

An immersive, 3D portfolio / self-introduction site with **an AI version of you** that answers
interviewer questions when they hover (or tap) your photo. Built with **React + Vite**,
**Three.js (React Three Fiber)**, **Framer Motion**, and **Tailwind CSS** — in a polished,
21st.dev-style aesthetic.

No API keys, no backend, no data leaves the browser: the "AI" answers from a knowledge base
you write in one file.

---

## ✨ Features

- **AI chat avatar** — hover/tap your photo to open a chat where "AI-you" answers questions
  (strengths, experience, projects, "why hire me?", etc.) with a realistic typing animation.
- **3D immersive background** — floating, distorted neon blobs, stars and sparkles that
  parallax toward your cursor.
- **Premium motion** — custom cursor, smooth scrolling, scroll-reveal animations, animated
  counters, 3D-tilt skill cards.
- **Fully responsive** and respects `prefers-reduced-motion`.
- **One config file** — change everything (your bio *and* what the AI says) in
  `src/config/profile.js`.

---

## 🚀 Run it

```bash
npm install      # already done if you see a node_modules folder
npm run dev      # start the dev server → http://localhost:5173
npm run build    # production build into /dist
npm run preview  # preview the production build
npm run github   # refresh src/data/github.json from the live GitHub API
```

---

## ✏️ Make it yours (only one file)

Open **`src/config/profile.js`** and replace the placeholder text. It controls **both** the
website content and the AI's answers:

| Section        | What it controls                                              |
| -------------- | ------------------------------------------------------------ |
| `identity`     | Your name, role, tagline, location, photo path               |
| `contact`      | Email + social links (GitHub, LinkedIn, …)                   |
| `about`        | Bio paragraphs + the animated stat counters                  |
| `skills`       | Skill groups and levels (drive the animated bars)            |
| `experience`   | The "Journey" timeline                                        |
| `projects`     | The project cards                                            |
| `ai.greeting`  | The first thing the AI says                                  |
| `ai.suggestions` | The starter-question chips                                  |
| `ai.knowledge` | **The AI's brain** — each entry = one answerable topic       |
| `ai.fallbacks` | What the AI says when it has no good answer                  |

### Add a new AI answer

Each item in `ai.knowledge` looks like this:

```js
{
  tags: ['salary', 'expectations', 'pay'],          // keywords that trigger it
  patterns: ['what are your salary expectations'],  // example phrasings (optional)
  answer: "I'm flexible and open to discussing a fair range for the role.",
}
```

The matcher scores each question against your `tags` + `patterns` and replies with the best
match — so the more natural keywords you add, the smarter it feels. You can use
`{name}`, `{role}`, `{location}`, and `{email}` inside any answer and they'll be filled in.

### Add your photo

Drop a square image at `public/me.jpg`, then set `identity.photo: '/me.jpg'`.
(It ships with a placeholder at `public/me.svg`.)

---

## 🐙 Live GitHub section

The **GitHub** section pulls your repos straight from `github.com/houssemeddine99`:

- At runtime it fetches the **public** API (no token needed) and shows your top repos,
  stars, languages and follower count.
- It falls back to a bundled snapshot (`src/data/github.json`) so it always renders.
- Curate it: edit the `descriptions` (nice blurbs for repos that have none) and
  `featured` (which repos show first) arrays in `src/data/github.json`.

### Refreshing the data (`.env`)

Run `npm run github` to regenerate the snapshot from the live API.

- Copy `.env.example` → `.env` and set `GITHUB_USERNAME`.
- `GITHUB_TOKEN` is **optional** — public repos work without it. Add one only to raise
  the rate limit or include private repos.
- 🔒 The token lives in `.env` (git-ignored) and is read **only** by the local Node
  script. It is **never** prefixed with `VITE_` and **never** bundled into the website.
  If you ever pasted it somewhere public, rotate it at
  <https://github.com/settings/tokens>.

## 🎬 Cinematic background video (Higgsfield-ready)

Want a generated video behind the hero instead of the 3D scene?

1. Put a clip at `public/hero.mp4` (or use any direct `.mp4` URL).
2. In `src/config/profile.js`, set `media.heroVideo: '/hero.mp4'`.

That's it — the site swaps the 3D canvas for a full-screen, muted, looping video with a
readable overlay. Leave `heroVideo: ''` to keep the 3D scene.

### Option A — generate it with the Higgsfield API (`npm run video`)

A ready-to-run generator lives at `scripts/generate-video.mjs`. It does
**text → image (Soul) → image → video (Kling)** and saves the result to `public/hero.mp4`.

1. Put your credentials in `.env`:
   ```
   HIGGSFIELD_API_KEY=your-key
   HIGGSFIELD_SECRET=your-secret
   ```
   (Create them at <https://cloud.higgsfield.ai/api-keys>.)
2. Make sure your Higgsfield account **has credits** (the API returns
   `403 not_enough_credits` otherwise).
3. Run:
   ```bash
   npm run video
   ```
4. Set `media.heroVideo: '/hero.mp4'` in `src/config/profile.js`.

Customize the look via `HERO_VIDEO_PROMPT` in `.env`, or set `HERO_IMAGE_URL`
to animate an existing image instead of generating one.

### Option B — the official Higgsfield MCP (OAuth)

The official server is registered in **`.mcp.json`** (`https://mcp.higgsfield.ai/mcp`).
It uses **OAuth**, not the API keys above. **Restart Claude Code**, approve the
`higgsfield` server, log in once, then ask Claude to generate a clip.

> Note: pasting a URL into chat does **not** connect an MCP — it must be in `.mcp.json`
> and approved on restart. Until you have a video, any `.mp4` you drop in works immediately.

## 🧩 21st.dev / Aceternity / Magic UI components

Premium, hand-built motion components live in `src/components/ui/`:

| Component | File | Used in |
| --------- | ---- | ------- |
| Spotlight | `ui/spotlight.jsx` | Hero light sweep |
| Flip Words | `ui/flip-words.jsx` | Rotating job titles |
| Text Generate | `ui/text-generate-effect.jsx` | Tagline word-by-word reveal |
| Marquee | `ui/marquee.jsx` | Infinite tech strip |
| 3D Card | `ui/card-3d.jsx` | Project cards (depth on hover) |
| Border Beam | `ui/border-beam.jsx` | Glowing project borders |
| Animated Tooltip | `ui/animated-tooltip.jsx` | Contact social icons |

All use Tailwind + Framer Motion only — no extra runtime deps beyond `clsx` + `tailwind-merge`.

## 🎨 Tweak the look

- **Colors / fonts / glow:** `tailwind.config.js` (the `neon` palette) and `src/index.css`.
- **3D scene:** `src/components/Scene3D.jsx` (blob count, colors, star density).
- **AI chat UI:** `src/components/ChatWindow.jsx`.

---

## ☁️ Deploy

It's a static site — `npm run build` then drop the `dist/` folder on **Netlify**,
**Vercel**, **GitHub Pages**, or any static host.

---

## 🧠 Want a *real* LLM later?

This ships with a self-contained brain (zero cost, works offline). If you later want truly
open-ended answers, swap the call inside `answerQuestion()` in `src/lib/brain.js` for a fetch
to an API endpoint — keep your API key on a small backend, never in the browser.

Built with ❤️ using React, Three.js & Framer Motion.
