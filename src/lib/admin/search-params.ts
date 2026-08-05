/**
 * Builds an `/admin/leads` URL by taking the current query params and
 * applying overrides — used by pagination and sort links so each one only
 * changes the one thing it represents (e.g. "next page") while preserving
 * every active filter. `undefined`/empty-string values are omitted rather
 * than serialized as `"undefined"` or `key=`.
 */
export function buildLeadsHref(
  current: Record<string, string | undefined>,
  overrides: Record<string, string | number | undefined>,
): string {
  const params = new URLSearchParams();
  const merged = { ...current, ...overrides };

  for (const [key, value] of Object.entries(merged)) {
    if (value === undefined || value === "") continue;
    params.set(key, String(value));
  }

  const query = params.toString();
  return query ? `/admin/leads?${query}` : "/admin/leads";
}
