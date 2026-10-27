// Design tokens — kept identical to css/style.css on the website
// so the app and the site are visibly the same brand.
export const colors = {
  charcoal: "#111018",
  surface: "#1A1823",
  border: "#2A2735",
  cyan: "#00B8D9",
  purple: "#6B2FBF",
  magenta: "#D6249F",
  offWhite: "#F5F6FA",
  grey: "#959099",
  bodyText: "#CBC8D4",
};

export const gradient = [colors.cyan, colors.purple, colors.magenta];

export const radius = { md: 14, sm: 8, pill: 100 };

export const spacing = (n: number) => n * 4;
