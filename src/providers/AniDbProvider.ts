import { ANIDB_CLIENT_NAME, ANIDB_CLIENT_VERSION } from "../constants";
import { abAniDbIdFromPage, malIdFromPage } from "../dom/idsFromPage";
import { ratingBoxFromScore } from "../dom/ratingBox";
import { checkCache, saveCache } from "../helpers/cache";
import { fetchMalExternals } from "../helpers/fetchMalExternals";
import { gmFetch } from "../helpers/gmFetchHelpers";
import { log, logError } from "../helpers/log";
import { site } from "../helpers/site";
import { setThrottleUse, throttle } from "../helpers/throttle";
import {
  MetadataProvider,
  OutLink,
  ProviderFlags,
  Score,
} from "./MetadataProvider";

// ab already has AniDB links, so no need to provide them again
const flags = site.ab
  ? new Set<ProviderFlags>([ProviderFlags.Score])
  : new Set<ProviderFlags>([ProviderFlags.Score, ProviderFlags.Link]);

export class AniDbProvider extends MetadataProvider {
  name = "AniDB";
  flags = flags;
  private aniDbId: string;

  async init() {
    if (site.ab) {
      const res = abAniDbIdFromPage();
      if (!res) {
        logError("Failed to find AniDB ID on page");
        return false;
      }

      this.aniDbId = res;
    }

    if (site.moe) {
      const malId = malIdFromPage();
      if (!malId) {
        logError("Failed to find MAL ID on page for externals fetch");
        return false;
      }

      const externals = await fetchMalExternals(malId);

      const aniDbUrl = externals.find((e) => e.name === "AniDB")?.url;
      if (!aniDbUrl) {
        logError("No AniDB external found in MAL externals", externals);
        return false;
      }

      const match = aniDbUrl.match(/aid=(\d+)/);
      if (!match) {
        logError("Failed to find extract AniDB ID from url", aniDbUrl);
        return false;
      }

      this.aniDbId = match[1];
    }

    return true;
  }

  async getScore(): Promise<Score | false> {
    const ok = await this.ensureInitialized();
    if (!ok) {
      return false;
    }

    const key = `anidb_score_${this.aniDbId}`;
    const cached = checkCache(key, 1000 * 60 * 60 * 24 * 3); // 3 days
    if (cached !== undefined) {
      return cached as Score;
    }

    await throttle("anidb", 1000 * 3);

    const url = new URL("http://api.anidb.net:9001/httpapi");
    url.searchParams.set("request", "anime");
    url.searchParams.set("client", ANIDB_CLIENT_NAME);
    url.searchParams.set("clientver", ANIDB_CLIENT_VERSION);
    url.searchParams.set("protover", "1");
    url.searchParams.set("aid", this.aniDbId);
    log(`fetching ${url.toString()}`);

    const res = await gmFetch({
      method: "GET",
      url: url.toString(),
    });

    setThrottleUse("anidb");

    try {
      const parser = new DOMParser();
      const d = parser.parseFromString(res.responseText, "text/xml");
      const rating = d
        .getElementsByTagName("ratings")[0]
        .getElementsByTagName("permanent")[0];

      const out: Score = {
        rating: parseFloat(rating.innerHTML),
        votes: parseInt(rating.getAttribute("count")),
        breakdownLink: `https://anidb.net/anime/${this.aniDbId}/vote/statistic`,
      };

      saveCache(key, out);
      return out;
    } catch (e) {
      throw new Error("Invalid AniDB response - " + e.message);
    }
  }

  async getLink(): Promise<OutLink | false> {
    const ok = await this.ensureInitialized();
    if (!ok) {
      return false;
    }

    return {
      name: "AniDB",
      url: `https://anidb.net/anime/${this.aniDbId}/`,
    };
  }

  insertScore(parent: JQuery<HTMLElement>, score: Score): void {
    const { container } = ratingBoxFromScore(
      score,
      "https://mei.kuudere.pw/qN7pRFMzaEs.png",
      68
    );

    parent.append(container);
  }
}
