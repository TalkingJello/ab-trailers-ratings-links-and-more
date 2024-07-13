import { ratingBoxFromScore } from "../dom/ratingBox";
import { checkCache, deleteCache, saveCache } from "../helpers/cache";
import { ensureTmdbItem } from "../helpers/ensureTmdbItem";
import { gmFetch } from "../helpers/gmFetchHelpers";
import { log, logError } from "../helpers/log";
import {
  MetadataProvider,
  OutLink,
  ProviderFlags,
  Score,
} from "./MetadataProvider";

// @TODO: trailers?
export class ImdbProvider extends MetadataProvider {
  name = "IMDb";
  flags = new Set([ProviderFlags.Link, ProviderFlags.Score]);
  private imdbId: string | false = false;
  private json: any;

  private async ensureImdbId() {
    const res = await ensureTmdbItem();
    if (
      !res ||
      typeof res.externalIds.imdb_id !== "string" ||
      !res.externalIds.imdb_id.startsWith("tt")
    ) {
      return false;
    }

    this.imdbId = res.externalIds.imdb_id;

    return true;
  }

  async init() {
    const ok = await this.ensureImdbId();
    if (!ok) {
      return false;
    }

    const url = `https://www.imdb.com/title/${this.imdbId}/`;
    const key = `imdb_scrape_json_${this.imdbId}`;
    const cached = checkCache(key, 60 * 60 * 24 * 7); // 1 week
    if (
      cached !== undefined &&
      typeof cached.url === "string" &&
      url.endsWith(cached.url)
    ) {
      this.json = cached;
      return true;
    }

    log(`Scraping ${url}`);
    const res = await gmFetch({
      method: "GET",
      url,
    });

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(res.responseText, "text/html");

      const data = doc.querySelector('script[type="application/ld+json"]');
      if (!data) {
        throw new Error("Data json not found on page");
      }

      const json = JSON.parse(data.textContent);
      if (typeof json.url !== "string" || !url.endsWith(json.url)) {
        logError("IMDB JSON", json);
        throw new Error(
          `Invalid json from imdb. Expected ${url} got ${json.url}`
        );
      }

      this.json = json;
      saveCache(key, json);
      return true;
    } catch (err) {
      logError("Failed to parse IMDB page: ", err);
      throw new Error(`failed to parse imdb page: ${err.message}`);
    }
  }

  async getLink(): Promise<OutLink | false> {
    const ok = await this.ensureImdbId();
    if (!ok) {
      return false;
    }

    return {
      name: "IMDb",
      url: `https://www.imdb.com/title/${this.imdbId}`,
    };
  }

  async getScore(): Promise<false | Score> {
    const ok = await this.ensureInitialized();
    if (!ok) {
      return false;
    }

    const rating = this.json.aggregateRating;
    if (
      !rating ||
      typeof rating.ratingValue !== "number" ||
      typeof rating.ratingCount !== "number"
    ) {
      logError("Invalid rating from IMDB", rating);
      deleteCache(`imdb_scrape_json_${this.imdbId}`);
      throw new Error("Invalid rating response from IMDB");
    }

    return {
      rating: rating.ratingValue,
      votes: rating.ratingCount,
      breakdownLink: `https://www.imdb.com/title/${this.imdbId}/ratings/`,
    };
  }

  insertScore(parent: JQuery<HTMLElement>, score: Score): void {
    const { container } = ratingBoxFromScore(
      score,
      "https://mei.kuudere.pw/gtY9cKsJV77.png",
      52
    );

    parent.append(container);
  }
}
