import type { Category } from "../types";

// GET all categories
const getCategories = async (): Promise<Category[] | { error: string }> => {
  try {
    const response = await fetch("http://localhost:3000/categories", {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || "Failed to fetch categories" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { error: "Failed to fetch categories" };
  }
};

export { getCategories };

// GET a single category by ID
const getCategoryById = async (
  id: number,
): Promise<Category | { error: string }> => {
  try {
    const response = await fetch(`http://localhost:3000/categories/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || "Failed to fetch category" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching category:", error);
    return { error: "Failed to fetch category" };
  }
};

export { getCategoryById };

// POST a new category
const createCategory = async (category: {
  name: string;
}): Promise<Category | { error: string }> => {
  try {
    const response = await fetch("http://localhost:3000/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(category),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || "Failed to create category" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating category:", error);
    return { error: "Failed to create category" };
  }
};

export { createCategory };

// PATCH (update) a category by ID
const updateCategory = async (
  id: number,
  category: { name?: string },
): Promise<Category | { error: string }> => {
  try {
    const response = await fetch(`http://localhost:3000/categories/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(category),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || "Failed to update category" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating category:", error);
    return { error: "Failed to update category" };
  }
};

export { updateCategory };

// DELETE a category by ID
const deleteCategory = async (
  id: number,
): Promise<Category | { error: string }> => {
  try {
    const response = await fetch(`http://localhost:3000/categories/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || "Failed to delete category" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting category:", error);
    return { error: "Failed to delete category" };
  }
};

export { deleteCategory };
