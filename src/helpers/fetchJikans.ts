import { gmFetchJson } from "./gmFetchHelpers";
import { log, logError } from "./log";

export async function fetchJikans(url: string) {
  log(`Fetching ${url}`);

  const res = await gmFetchJson({
    method: "GET",
    url: url,
  });

  if (res.error) {
    logError("mal res", res);
    throw new Error(
      `Failed to fetch Jikan (MAL) - ${res.message} - ${res.error}`
    );
  }

  if (!res.data) {
    logError("mal res", res);
    throw new Error("Invalid response from Jikan (MAL)");
  }

  return res.data;
}
