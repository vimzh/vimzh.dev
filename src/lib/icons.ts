import type { ComponentType } from "react";

import {
  Briefcase,
  Box,
  Folder,
  Github,
  Home,
  LayoutGrid,
  Linkedin,
  Mail,
  Newspaper,
  User,
} from "lucide-react";

import {
  DiscordIcon,
  HashnodeIcon,
  MediumIcon,
  XIcon,
} from "@/components/icons/SocialIcons";

type IconProps = { size?: number };

const registry: Record<string, ComponentType<IconProps>> = {
  x: XIcon,
  github: Github,
  hashnode: HashnodeIcon,
  medium: MediumIcon,
  discord: DiscordIcon,
  linkedin: Linkedin,
  home: Home,
  "layout-grid": LayoutGrid,
  box: Box,
  newspaper: Newspaper,
  user: User,
  briefcase: Briefcase,
  folder: Folder,
  mail: Mail,
};

export const getIcon = (key: string): ComponentType<IconProps> => {
  const icon = registry[key];
  if (!icon) {
    throw new Error(`Icon "${key}" not found in registry`);
  }
  return icon;
};
