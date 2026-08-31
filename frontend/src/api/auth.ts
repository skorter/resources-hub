import type { Admin } from "../lib/types";

// POST a login request
const createLogin = async (
  admin: Admin,
): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(admin),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.error || "Login failed" };
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};

export { createLogin };

// POST a logout request
const createLogout = async (): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.error || "Logout failed" };
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};

export { createLogout };

// GET the current admin session
const getSession = async (
  cookies?: string,
): Promise<{
  success: boolean;
  error?: string;
  isAdmin: boolean;
}> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/session`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(cookies ? { Cookie: cookies } : {}),
        },
        credentials: "include",
      },
    );

    if (!response.ok) {
      return { success: false, isAdmin: false, error: "Failed to get session" };
    }

    const data = await response.json();
    return { success: true, isAdmin: data.isAdmin };
  } catch (error) {
    return { success: false, isAdmin: false, error: (error as Error).message };
  }
};

export { getSession };
