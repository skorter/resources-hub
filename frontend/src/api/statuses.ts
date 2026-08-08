import type { Status } from "../lib/types";

// GET all statuses
const getStatuses = async (): Promise<Status[] | { error: string }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/statuses`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || "Failed to fetch statuses" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching statuses:", error);
    return { error: "Failed to fetch statuses" };
  }
};

export { getStatuses };

// GET a single status by ID
const getStatusById = async (
  id: number,
): Promise<Status | { error: string }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/statuses/${id}`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || "Failed to fetch status" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching status:", error);
    return { error: "Failed to fetch status" };
  }
};

export { getStatusById };

// POST a new status
const createStatus = async (status: {
  name: string;
}): Promise<Status | { error: string }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/statuses`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(status),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || "Failed to create status" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating status:", error);
    return { error: "Failed to create status" };
  }
};

export { createStatus };

// PATCH (update) a status by ID
const updateStatus = async (
  id: number,
  status: { name?: string },
): Promise<Status | { error: string }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/statuses/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(status),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || "Failed to update status" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating status:", error);
    return { error: "Failed to update status" };
  }
};

export { updateStatus };

// DELETE a status by ID
const deleteStatus = async (
  id: number,
): Promise<Status | { error: string }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/statuses/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || "Failed to delete status" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting status:", error);
    return { error: "Failed to delete status" };
  }
};

export { deleteStatus };
