import { aniDbIdFromPage } from "../dom/idsFromPage";
import { ratingBox } from "../dom/ratingBox";
import { checkCache, saveCache } from "../helpers/cache";
import { gmFetch } from "../helpers/gmFetchHelpers";
import { log } from "../helpers/log";
import { ANIDB_CLIENT_NAME, ANIDB_CLIENT_VERSION } from "../keys";
import { MetadataProvider, ProviderFlags, Score } from "./MetadataProvider";

export class AniDbProvider extends MetadataProvider {
  name = "AniDB";
  flags = new Set([ProviderFlags.Score]);
  private aniDbId: string;

  async init() {
    const res = aniDbIdFromPage();
    if (!res) {
      return false;
    }

    this.aniDbId = res;
    return true;
  }

  async getScore(): Promise<Score | false> {
    const ok = await this.ensureInitialized();
    if (!ok) {
      return false;
    }

    const key = `anidb_score_${this.aniDbId}`;
    const cached = checkCache(key);
    if (cached !== undefined) {
      return cached as Score;
    }

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

    if (!res.responseXML) {
      throw new Error("Couldn't parse AniDB response");
    }

    try {
      const d = res.responseXML;
      const rating = d
        .getElementsByTagName("ratings")[0]
        .getElementsByTagName("permanent")[0];

      const out: Score = {
        rating: parseFloat(rating.innerHTML),
        votes: parseInt(rating.getAttribute("count")),
      };

      saveCache(key, out);
      return out;
    } catch (e) {
      throw new Error("Invalid AniDB response - " + e.message);
    }
  }

  insertScore(parent: JQuery<HTMLElement>, score: Score): void {
    const { rating, votes } = score;

    const { container, scale } = ratingBox(
      `${rating} / 10`,
      votes,
      `https://anidb.net/anime/${this.aniDbId}/vote/statistic`
    );

    scale.append(
      `<img src="https://mei.animebytes.tv/qN7pRFMzaEs.png" style="width: 68px; height: 68px;" />`
    );

    parent.append(container);
  }
}
