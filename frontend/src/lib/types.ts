import type { Type } from "./generatedType";

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

export type { Type } from "./generatedType";

export type Suggestion = {
  name?: string;
  title: string;
  url: string;
  description: string;
};
