export interface ThemeDefinition {
  id: string;
  label: string;
  mode: "light" | "dark";
  icon: "sun" | "cloud" | "leaf" | "moon" | "star" | "tree";
}

export const themes: ThemeDefinition[] = [
  { id: "stone", label: "Stone", mode: "light", icon: "sun" },
  { id: "frost", label: "Frost", mode: "light", icon: "cloud" },
  { id: "sage", label: "Sage", mode: "light", icon: "leaf" },
  { id: "obsidian", label: "Obsidian", mode: "dark", icon: "moon" },
  { id: "midnight", label: "Midnight", mode: "dark", icon: "star" },
  { id: "evergreen", label: "Evergreen", mode: "dark", icon: "tree" },
];

export const themeIds = themes.map((t) => t.id);

export const getTheme = (id: string): ThemeDefinition =>
  themes.find((t) => t.id === id) ?? themes[0];

export const getNextTheme = (currentId: string): ThemeDefinition => {
  const idx = themeIds.indexOf(currentId);
  return themes[(idx + 1) % themes.length];
};

export const isDarkTheme = (id: string): boolean =>
  getTheme(id).mode === "dark";
