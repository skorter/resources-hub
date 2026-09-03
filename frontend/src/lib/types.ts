// import type { Type } from "../../../backend/src/generated/prisma/enums";

export type Resource = {
  id: number;
  title: string;
  description: string;
  logo?: string;
  type: Type;
  url: string;
  createdAt: string;
  categories: {
    id: number;
    name: string;
  }[];
  status?: {
    id: number;
    name: string;
  };
};

export type Category = {
  id: number;
  name: string;
};

export type Status = {
  id: number;
  name: string;
};

export type Admin = {
  username: string;
  password: string;
};

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
