/**
 * Lightweight in-memory rate limiter for API routes.
 *
 * This is intentionally simple: a sliding window of request timestamps per
 * key, held in a `Map` in the server process's memory. No external service
 * or database required, which fits a single small contact form.
 *
 * Known limitation: serverless platforms (including Vercel) can run
 * multiple isolated instances of a function, and instances can be recycled
 * between invocations, so this limiter is "best effort" — it slows down
 * casual abuse from a single source but is not a hard guarantee across all
 * traffic. If the contact form starts attracting serious spam volume,
 * replace this with a shared store (e.g. Vercel KV / Upstash Redis) behind
 * the same `checkRateLimit` function signature so nothing else needs to
 * change.
 */

const hits = new Map<string, number[]>();

/** Periodically drop old keys so the map doesn't grow unbounded. */
function prune(now: number, windowMs: number) {
  for (const [key, timestamps] of hits) {
    const recent = timestamps.filter((t) => now - t < windowMs);
    if (recent.length === 0) {
      hits.delete(key);
    } else {
      hits.set(key, recent);
    }
  }
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
}

/**
 * Returns whether `key` (e.g. an IP address) is still within `limit`
 * requests per `windowMs` milliseconds.
 */
export function checkRateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (timestamps.length >= limit) {
    hits.set(key, timestamps);
    return { allowed: false, remaining: 0 };
  }

  timestamps.push(now);
  hits.set(key, timestamps);

  // Occasionally sweep the whole map so it doesn't grow forever under
  // sustained traffic from many different keys.
  if (Math.random() < 0.02) {
    prune(now, windowMs);
  }

  return { allowed: true, remaining: limit - timestamps.length };
}
