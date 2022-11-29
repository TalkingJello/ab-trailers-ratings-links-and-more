import { malIdFromPage } from "../dom/idsFromPage";
import { ratingBoxFromScore } from "../dom/ratingBox";
import { checkCache, saveCache } from "../helpers/cache";
import { gmFetchJson } from "../helpers/gmFetchHelpers";
import { log } from "../helpers/log";
import {
  MetadataProvider,
  ProviderFlags,
  Score,
  Trailer,
  VideoSite,
} from "./MetadataProvider";

export class MalJikanProvider extends MetadataProvider {
  name = "MAL";
  flags = new Set([ProviderFlags.Score, ProviderFlags.Trailers]);
  private malId: string;

  async init() {
    const id = malIdFromPage();
    if (!id) {
      return false;
    }
    this.malId = id;
    return true;
  }

  private async fetchJikans(url: string) {
    log(`Fetching ${url}`);

    const res = await gmFetchJson({
      method: "GET",
      url: url,
    });

    if (res.error) {
      log("mal res", res);
      throw new Error(
        `Failed to fetch Jikan (MAL) - ${res.message} - ${res.error}`
      );
    }

    if (!res.data) {
      log("mal res", res);
      throw new Error("Invalid response from Jikan (MAL)");
    }

    return res.data;
  }

  async getScore(): Promise<false | Score> {
    const ok = await this.ensureInitialized();
    if (!ok) {
      return false;
    }

    const key = `mal_jikan_score_${this.malId}`;
    const cached = checkCache(key);
    if (cached !== undefined && typeof cached.votes === "number") {
      return cached as Score;
    }

    const data = await this.fetchJikans(
      `https://api.jikan.moe/v4/anime/${this.malId}`
    );

    const score: Score = {
      votes: data.scored_by,
      rating: data.score,
      rank: data.rank,
      breakdownLink: `${data.url}/stats`,
    };
    saveCache(key, score);
    return score;
  }

  async getTrailers(): Promise<Trailer[]> {
    const ok = await this.ensureInitialized();
    if (!ok) {
      return [];
    }

    const key = `mal_jikan_trailers_${this.malId}`;
    const cached = checkCache(key);
    if (Array.isArray(cached)) {
      return cached as Trailer[];
    }

    const data = await this.fetchJikans(
      `https://api.jikan.moe/v4/anime/${this.malId}/videos`
    );

    if (!Array.isArray(data.promo)) {
      log("jikans data", data);
      throw new Error("Invalid response from Jikan (MAL)");
    }

    const trailers: Trailer[] = [];
    data.promo.forEach((item: any) => {
      if (!item.trailer || !item.trailer.youtube_id) {
        return;
      }

      trailers.push({
        name: item.title
          .replace(/PV/gi, "Promotional Video")
          .replace(/CM/gi, "Commercial"),
        site: VideoSite.YouTube,
        key: item.trailer.youtube_id,
      });
    });

    saveCache(key, trailers);
    return trailers;
  }

  insertScore(parent: JQuery<HTMLElement>, score: Score): void {
    const { container, image } = ratingBoxFromScore(
      score,
      "https://mei.animebytes.tv/ssTMPRvxBSo.png",
      54
    );
    image.css("border-radius", "12px");

    parent.append(container);
  }
}
