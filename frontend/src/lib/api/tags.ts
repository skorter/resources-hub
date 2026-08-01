import type { Tag } from "../types";

// GET all tags
const getTags = async (): Promise<Tag[] | { error: string }> => {
  try {
    const response = await fetch("http://localhost:3000/tags", {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || "Failed to fetch tags" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching tags:", error);
    return { error: "Failed to fetch tags" };
  }
};

export { getTags };

// GET a single tag by ID
const getTagById = async (id: number): Promise<Tag | { error: string }> => {
  try {
    const response = await fetch(`http://localhost:3000/tags/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || "Failed to fetch tag" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching tag:", error);
    return { error: "Failed to fetch tag" };
  }
};

export { getTagById };

// POST a new tag
const createTag = async (tag: {
  name: string;
}): Promise<Tag | { error: string }> => {
  try {
    const response = await fetch("http://localhost:3000/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(tag),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || "Failed to create tag" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating tag:", error);
    return { error: "Failed to create tag" };
  }
};

export { createTag };

// PATCH (update) a tag by ID
const updateTag = async (
  id: number,
  tag: { name?: string },
): Promise<Tag | { error: string }> => {
  try {
    const response = await fetch(`http://localhost:3000/tags/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(tag),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || "Failed to update tag" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating tag:", error);
    return { error: "Failed to update tag" };
  }
};

export { updateTag };

// DELETE a tag by ID
const deleteTag = async (id: number): Promise<Tag | { error: string }> => {
  try {
    const response = await fetch(`http://localhost:3000/tags/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || "Failed to delete tag" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting tag:", error);
    return { error: "Failed to delete tag" };
  }
};

export { deleteTag };
