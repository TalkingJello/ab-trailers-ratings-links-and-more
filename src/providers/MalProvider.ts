import { MAL_DEFAULT_API_KEY } from "../constants";
import { malIdFromPage } from "../dom/idsFromPage";
import { ratingBox } from "../dom/ratingBox";
import { checkCache, saveCache } from "../helpers/cache";
import { gmFetchJson } from "../helpers/gmFetchHelpers";
import { log } from "../helpers/log";
import { MetadataProvider, ProviderFlags, Score } from "./MetadataProvider";

export class MalProvider extends MetadataProvider {
  name = "MAL";
  flags = new Set([ProviderFlags.Score, ProviderFlags.ApiKey]);
  apiKeyInstructionsLink = "https://myanimelist.net/forum/?topicid=1973141";
  apiKeyName = "Client ID";
  defaultApiKey = MAL_DEFAULT_API_KEY;
  private malId: string;

  async init() {
    const res = malIdFromPage();
    if (!res) {
      return false;
    }

    this.malId = res;
    return true;
  }

  async getScore(): Promise<Score | false> {
    const ok = await this.ensureInitialized();
    if (!ok) {
      return false;
    }

    const key = `mal_score_${this.malId}`;
    const cached = checkCache(key);
    if (cached !== undefined) {
      return cached as Score;
    }

    const url = new URL(
      `https://api.myanimelist.net/v2/anime/${this.malId}?fields=mean,rank,num_scoring_users`
    );
    log(`fetching ${url.toString()}`);

    const res = await gmFetchJson({
      method: "GET",
      url: url.toString(),
      headers: {
        "X-MAL-CLIENT-ID": this.getUserApiKey(),
      },
    });

    log("mal res", res);

    if (res.id.toString() !== this.malId) {
      throw new Error("Invalid response from MAL");
    }

    const out: Score = {
      rating: res.mean,
      votes: res.num_scoring_users,
      rank: res.rank,
      breakdownLink: `https://myanimelist.net/anime/${
        this.malId
      }/${res.title.replace(" ", "_")}/stats`,
    };

    saveCache(key, out);
    return out;
  }

  insertScore(parent: JQuery<HTMLElement>, score: Score): void {
    const { rating, votes, rank, breakdownLink } = score;

    const { container, scale } = ratingBox(
      `${rating} / 10`,
      votes,
      breakdownLink
    );

    scale.append(
      `<img src="https://mei.animebytes.tv/ssTMPRvxBSo.png" style="width: 54px; height: 54px; border-radius: 12px;" />`
    );
    scale.attr("title", `Ranked #${rank}`);

    parent.append(container);
  }

  async testApiKey(): Promise<boolean> {
    const key = this.getUserApiKey();
    if (!key) {
      throw new Error("No API key set, please set one in the script settings");
    }

    const url = new URL(
      `https://api.myanimelist.net/v2/anime/1535?fields=mean,rank,num_scoring_users`
    );
    log(`fetching ${url.toString()}`);

    const res = await gmFetchJson({
      method: "GET",
      url: url.toString(),
      headers: {
        "X-MAL-CLIENT-ID": key,
      },
    });
    log("mal res", res);

    if (res.error) {
      log("api key test failed", res);
      throw new Error(res.message || res.error);
    }

    if (res.id.toString() !== "1535") {
      log("api key test failed", res);
      throw new Error("Invalid response from MAL");
    }

    return true;
  }
}
