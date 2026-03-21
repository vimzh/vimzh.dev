# vimzh.dev

A minimal, fast developer portfolio built with Next.js 16, Tailwind CSS 4, and MDX. Everything is config-driven — just edit a few JSON files and you're live.

## Quick Start

```bash
# clone it
git clone https://github.com/vimzh/vimzh.dev.git
cd vimzh.dev

# install deps
bun install

# set up env vars
cp .env.example .env.local

# run it
bun dev
```

That's it. Open [localhost:3000](http://localhost:3000).

## Make It Yours

All your content lives in `src/content/`. No databases, no CMS, no config rabbit holes — just JSON files.

### 1. Edit your info

Open `src/content/site.json` and replace everything with your own details:

```json
{
  "name": "yourname",
  "siteName": "yourname.dev",
  "url": "https://yourname.dev",
  "email": "you@example.com",
  "description": "Your one-liner",
  "roles": ["Software Engineer", "Designer", "Whatever You Do"],
  "about": "A paragraph about you...",
  "socials": [
    { "icon": "github", "href": "https://github.com/you", "label": "GitHub" }
  ]
}
```

Drop your profile picture in `public/` and update `profileImage`. Same for your resume PDF.

### 2. Add your projects

Edit `src/content/projects.json`:

```json
[
  {
    "name": "Cool Project",
    "description": "What it does",
    "tags": ["Next.js", "TypeScript"],
    "url": "https://coolproject.com",
    "github": "https://github.com/you/cool-project"
  }
]
```

### 3. Add your experience

Edit `src/content/experiences.json`:

```json
[
  {
    "company": "Acme Inc",
    "role": "Senior Engineer",
    "period": "Jan 2024 — Present",
    "location": "Remote",
    "tags": ["React", "Node.js"]
  }
]
```

### 4. Write blog posts

Drop an `.mdx` file in `src/content/blog/`:

```mdx
export const meta = {
  title: "My First Post",
  excerpt: "What this post is about",
  date: "2026-01-15",
  tags: ["React", "TypeScript"],
};

# My First Post

Write your content here. Supports GitHub-flavored markdown.
```

It shows up automatically. No routing config, no frontmatter parsing setup — just write and save.

## Environment Variables

Create a `.env.local` with:

```
GITHUB_TOKEN=         # GitHub personal access token (for contributions graph)
RESEND_API_KEY=       # Resend API key (for contact form)
CONTACT_EMAIL=        # Where contact form emails go
```

The GitHub token needs `read:user` scope. Get one at [github.com/settings/tokens](https://github.com/settings/tokens).

Sign up for [Resend](https://resend.com) for the contact form (free tier is plenty).

## Theming

Light and dark mode work out of the box. Colors are CSS variables in `src/app/globals.css` — tweak them to match your vibe. The warm cream/dark palette is the default, but you can swap it to whatever you want.

Theme colors for the browser chrome are in `site.json` under `themeColors`.

## Deploy

Push to GitHub and connect to [Vercel](https://vercel.com). Add your env vars in the Vercel dashboard. Done.

```bash
bun run build  # make sure it builds clean
```

## Stack

- **Framework**: Next.js 16 (App Router, React 19)
- **Styling**: Tailwind CSS 4
- **UI**: Base UI + shadcn/ui
- **Blog**: MDX with remark-gfm
- **Animations**: Motion
- **Analytics**: Vercel Analytics
- **Email**: Resend
- **Package Manager**: Bun

## Structure

```
src/
├── app/           # pages and layouts
├── components/    # UI components
├── content/       # your content (JSON + MDX)
│   ├── site.json
│   ├── projects.json
│   ├── experiences.json
│   ├── opensource.json
│   ├── components.json
│   └── blog/      # MDX blog posts
├── lib/           # utilities
└── stores/        # state (Zustand)
```

## License

MIT — use it, fork it, make it yours.
