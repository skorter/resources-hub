import type { Suggestion } from "../lib/types";

const createSuggestion = async (
  suggestion: Suggestion,
): Promise<{ success: string } | { error: string }> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/suggest`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(suggestion),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    return { error: errorData.error || "Failed to create suggestion" };
  }
  const data = await response.json();
  return { success: data.message };
};

export { createSuggestion };
