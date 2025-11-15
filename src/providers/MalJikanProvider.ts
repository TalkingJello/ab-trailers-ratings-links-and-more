import { malIdFromPage } from "../dom/idsFromPage";
import { ratingBoxFromScore } from "../dom/ratingBox";
import { checkCache, saveCache } from "../helpers/cache";
import { fetchJikans } from "../helpers/fetchJikans";
import { log, logError } from "../helpers/log";
import { setThrottleUse, throttle } from "../helpers/throttle";
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

  async getScore(): Promise<false | Score> {
    const ok = await this.ensureInitialized();
    if (!ok) {
      return false;
    }

    const key = `mal_jikan_score_${this.malId}`;
    const cached = checkCache(key, 1000 * 60 * 60 * 24 * 2); // 2 days
    if (cached === false) {
      return false;
    }
    if (cached && typeof cached.votes === "number") {
      return cached as Score;
    }

    await throttle("jikan", 800);
    const data = await fetchJikans(
      `https://api.jikan.moe/v4/anime/${this.malId}`
    );
    setThrottleUse("jikan");

    if (typeof data.score !== "number" || typeof data.scored_by !== "number") {
      saveCache(key, false);
      return false;
    }

    log("mal data", data);
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

    const data = await fetchJikans(
      `https://api.jikan.moe/v4/anime/${this.malId}/videos`
    );

    if (!Array.isArray(data.promo)) {
      logError("jikans data", data);
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
      "https://mei.kuudere.pw/ssTMPRvxBSo.png",
      54
    );
    image.css("border-radius", "12px");

    parent.append(container);
  }
}
