/** Site-wide constants. Edit here, not in components. */
export const SITE = {
  name: "Eric Luo",
  heroText: "ERIC LUO",
  tagline:
    "Computer engineering student. I build small machines, print useful objects, and write down what breaks.",
  description:
    "Eric Luo — computer engineering student and maker. Build logs and notes on embedded systems, digital fabrication, and the web.",
  postsPerPage: 6,
} as const;

export const LINKS = [
  { label: "GitHub", href: "https://github.com/AWSOMEDUDE00000090" },
  { label: "YouTube", href: "https://youtube.com/@ercluo" }, // placeholder
  { label: "Instagram", href: "https://instagram.com/ercluo" }, // placeholder
  { label: "Email", href: "mailto:eluo2007@gmail.com" },
] as const;
