import { Github, Linkedin } from "lucide-react";

import {
  DiscordIcon,
  HashnodeIcon,
  MediumIcon,
  XIcon,
} from "@/components/icons/SocialIcons";

export const EMAIL = "vimzh.dev@gmail.com";

export const socials = [
  { icon: XIcon, href: "https://x.com/vimzh", label: "X" },
  { icon: Github, href: "https://github.com/vimzh", label: "GitHub" },
  { icon: HashnodeIcon, href: "https://hashnode.com/@vimzh", label: "Hashnode" },
  { icon: MediumIcon, href: "https://medium.com/@vimzh", label: "Medium" },
  { icon: DiscordIcon, href: "https://discord.com", label: "Discord" },
  { icon: Linkedin, href: "https://linkedin.com/in/vimzh", label: "LinkedIn" },
];

export type Experience = {
  company: string;
  blurred?: boolean;
  role: string;
  period: string;
  location: string;
  tags?: string[];
};

export type OpenSourceContribution = {
  repo: string;
  owner: string;
  description: string;
  type: "pr" | "issue" | "maintainer";
  url: string;
  status: "merged" | "open" | "closed";
  stars?: string;
  npm?: string;
};

export const openSourceContributions: OpenSourceContribution[] = [
  {
    repo: "htmlparser2",
    owner: "fb55",
    description:
      "Add WebWritableStream for Web Streams API support — enables piping fetch() responses directly into the parser",
    type: "pr",
    url: "https://github.com/fb55/htmlparser2/pull/2376",
    status: "merged",
    stars: "4.8k",
    npm: "https://www.npmjs.com/package/htmlparser2",
  },
  {
    repo: "virtua",
    owner: "inokawa",
    description:
      "Add Base UI ScrollArea story for virtualized scrolling with custom scrollbars",
    type: "pr",
    url: "https://github.com/inokawa/virtua/pull/870",
    status: "merged",
    stars: "3.5k",
    npm: "https://www.npmjs.com/package/virtua",
  },
  {
    repo: "intlayer",
    owner: "aymericzip",
    description:
      "Replace native textarea with contentEditable div for inline autocomplete ghost text rendering",
    type: "pr",
    url: "https://github.com/aymericzip/intlayer/pull/394",
    status: "merged",
    stars: "636",
    npm: "https://www.npmjs.com/package/intlayer",
  },
];

export type Project = {
  name: string;
  description: string;
  tags: string[];
  url?: string;
  github?: string;
  wip?: boolean;
};

export const projects: Project[] = [
  {
    name: "CloudSync",
    description:
      "Real-time file synchronization engine with conflict resolution, built for distributed teams",
    tags: ["Go", "gRPC", "Redis", "S3"],
    github: "https://github.com/vimzh/cloudsync",
  },
  {
    name: "Kairoi",
    description:
      "AI-powered calendar that learns your energy patterns and auto-blocks deep work sessions",
    tags: ["Next.js", "TypeScript", "OpenAI", "Drizzle"],
    url: "https://kairoi.app",
    github: "https://github.com/vimzh/kairoi",
  },
  {
    name: "Terma",
    description:
      "Minimal terminal emulator with GPU-accelerated rendering and custom shader backgrounds",
    tags: ["Rust", "WebGPU", "WASM"],
    wip: true,
  },
];

export const experiences: Experience[] = [
  {
    company: "Autonymo",
    role: "AI Intern",
    period: "Feb 2026 — Present",
    location: "Spain · Remote",
    tags: ["Next.js", "Vercel AI SDK", "Redis", "PostgreSQL", "Docker"],
  },
  {
    company: "Astroraag",
    role: "Software Intern",
    period: "Feb 2026 — Present",
    location: "India · Remote",
    tags: ["Flutter", "Firebase", "FastAPI", "Node.js"],
  },
  {
    company: "Stealth Startup",
    blurred: true,
    role: "Founding Backend Engineer",
    period: "Oct 2025 — Present",
    location: "India · Remote",
    tags: ["Go", "gRPC", "Kafka", "PostgreSQL", "AWS"],
  },
];
