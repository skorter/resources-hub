export type Resource = {
  id: number;
  title: string;
  description: string;
  logo?: string;
  type: string;
  url: string;
  createdAt: string;
  categoryId: number;
  category: {
    id: number;
    name: string;
  };
  tags: {
    id: number;
    name: string;
  }[];
};

export type Category = {
  id: number;
  name: string;
};

export type Tag = {
  id: number;
  name: string;
};
