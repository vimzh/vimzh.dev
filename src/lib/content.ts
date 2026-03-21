import siteJson from "@/content/site.json";
import projectsJson from "@/content/projects.json";
import experiencesJson from "@/content/experiences.json";
import opensourceJson from "@/content/opensource.json";
import componentsJson from "@/content/components.json";

export type Social = {
  icon: string;
  href: string;
  label: string;
};

export type NavLink = {
  label: string;
  href: string;
  key: string;
};

export type CommandMenuItem = {
  id: string;
  label: string;
  href: string;
  icon: string;
  keywords?: string[];
};

export type SiteConfig = {
  name: string;
  siteName: string;
  url: string;
  email: string;
  displayEmail: string;
  description: string;
  twitterHandle: string;
  githubUrl: string;
  profileImage: string;
  resumePath: string;
  status: string;
  roles: string[];
  about: string;
  footer: string;
  themeColors: { light: string; dark: string };
  socials: Social[];
  navLinks: NavLink[];
  commandMenu: {
    navigation: CommandMenuItem[];
    sections: CommandMenuItem[];
  };
};

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

export type ProjectCategory = "fullstack" | "ai" | "frontend" | "apps";

export type Project = {
  name: string;
  description: string;
  tags: string[];
  category: ProjectCategory;
  url?: string;
  github?: string;
  wip?: boolean;
  preview?: string;
  gradient: [string, string];
};

export type ComponentItem = {
  name: string;
  description: string;
  tags: string[];
  href: string;
  previewBg: string;
};

export const site = siteJson as SiteConfig;
export const projects = projectsJson as Project[];
export const experiences = experiencesJson as Experience[];
export const openSourceContributions =
  opensourceJson as OpenSourceContribution[];
export const components = componentsJson as ComponentItem[];
