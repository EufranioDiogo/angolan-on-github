export function getRequestOptions(options: Record<string, string>): Record<string, string | number> {
  return {
    per_page: 30,
    sort: `${options.sort || ""}${options.order || ""}`,
    q: `${options.name || ""} location:Angola`,
  };
}
