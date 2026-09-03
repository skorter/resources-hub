import type { Resource } from "../lib/types";
import type { Type } from "../../../backend/src/generated/prisma/enums";

// GET all resources
const getResources = async (): Promise<Resource[] | { error: string }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/resources`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || "Failed to fetch resources" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching resources:", error);
    return { error: "Failed to fetch resources" };
  }
};

export { getResources };

// GET a single resource by ID
const getResourceById = async (
  id: number,
): Promise<Resource | { error: string }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/resources/${id}`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || "Failed to fetch resource" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching resource:", error);
    return { error: "Failed to fetch resource" };
  }
};

export { getResourceById };

// POST a new resource
const createResource = async (resource: {
  title: string;
  description: string;
  logo?: string;
  type: Type;
  url: string;
  categories: number[];
  statusId?: number;
}): Promise<Resource | { error: string }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/resources`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(resource),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || "Failed to create resource" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating resource:", error);
    return { error: "Failed to create resource" };
  }
};

export { createResource };

// PATCH (update) a resource by ID
const updateResource = async (
  id: number,
  resource: {
    title?: string;
    description?: string;
    logo?: string;
    type?: Type;
    url?: string;
    categories?: number[];
    statusId?: number | null;
  },
): Promise<Resource | { error: string }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/resources/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(resource),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || "Failed to update resource" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating resource:", error);
    return { error: "Failed to update resource" };
  }
};

export { updateResource };

// DELETE a resource by ID
const deleteResource = async (
  id: number,
): Promise<Resource | { error: string }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/resources/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || "Failed to delete resource" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting resource:", error);
    return { error: "Failed to delete resource" };
  }
};

export { deleteResource };
