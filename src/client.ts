/**
 * FlexOffers API client — thin wrapper around fetch.
 * Auth: apiKey header from FLEXOFFERS_API_KEY env var.
 */

const BASE_URL = "https://api.flexoffers.com/v3";

function getApiKey(): string {
  const key = process.env.FLEXOFFERS_API_KEY;
  if (!key) throw new Error("FLEXOFFERS_API_KEY environment variable is not set");
  return key;
}

export async function foGet(
  path: string,
  params: Record<string, string | number | boolean | undefined> = {}
): Promise<unknown> {
  const url = new URL(`${BASE_URL}${path}`);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined) url.searchParams.set(k, String(v));
  }

  const res = await fetch(url.toString(), {
    headers: { apiKey: getApiKey(), Accept: "application/json" },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`FlexOffers API ${res.status} on ${path}: ${body}`);
  }

  return res.json();
}

export async function foPost(path: string, body: unknown): Promise<unknown> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      apiKey: getApiKey(),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`FlexOffers API ${res.status} on ${path}: ${text}`);
  }

  return res.json();
}
