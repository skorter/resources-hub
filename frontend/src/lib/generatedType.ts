export const Type = {
  Tools: "Tools",
  References: "References",
  Libraries: "Libraries",
  Inspiration: "Inspiration",
  Services: "Services",
  Extensions: "Extensions",
  Social: "Social",
} as const;

export type Type = (typeof Type)[keyof typeof Type];
