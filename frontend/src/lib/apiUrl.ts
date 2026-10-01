export const apiUrl = (path: string) => {
  return typeof window === "undefined"
    ? `${process.env.BACKEND_URL}${path}`
    : `/api${path}`;
};
