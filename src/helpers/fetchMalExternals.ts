import { checkCache, saveCache } from "./cache";
import { fetchJikans } from "./fetchJikans";
import { logError } from "./log";

export type MalExternal = { name: string; url: string };
export type MalExternals = MalExternal[];

// Map to dedupe duplicate requests by cache key
const pendingRequests = new Map<string, Promise<MalExternals>>();

export async function fetchMalExternals(malId: string): Promise<MalExternals> {
  const key = `mal_externals_${malId}`;

  const cached = checkCache(key);
  if (cached !== undefined) {
    return cached as MalExternals;
  }

  if (pendingRequests.has(key)) {
    return pendingRequests.get(key)!;
  }

  const promise = (async () => {
    try {
      const data = (await fetchJikans(
        `https://api.jikan.moe/v4/anime/${malId}/external`
      )) as MalExternals;
      if (!Array.isArray(data)) {
        logError("jikans data", data);
        throw new Error("Invalid response from Jikan (MAL)");
      }

      saveCache(key, data);
      return data;
    } finally {
      pendingRequests.delete(key);
    }
  })();

  pendingRequests.set(key, promise);
  return promise;
}
