import { TMDB_LANGUAGE, UNIQUE } from "../constants";
import { checkCache, saveCache } from "../helpers/cache";
import { ensureTmdbIdentified } from "../helpers/ensureTmdbIdentified";
import { gmFetchJson } from "../helpers/gmFetchJson";
import { log } from "../helpers/log";
import { TMDB_V3_API_KEY } from "../keys";
import {
  MetadataProvider,
  OutLink,
  ProviderFlags,
  Score,
  Trailer,
} from "./MetadataProvider";

export enum TmdbMediaType {
  Movie = "movie",
  Tv = "tv",
}

export interface TmdbIdentified {
  id: number;
  mediaType: TmdbMediaType;
  rating: number;
  votes: number;
}

export class TmdbProvider extends MetadataProvider {
  static async identify(type: TmdbMediaType, name: string) {
    const key = `tmdb_${type}_by_name_${name}`;
    const cached = checkCache(key);
    if (cached !== undefined) {
      return cached as TmdbIdentified;
    }

    const url = new URL(`https://api.themoviedb.org/3/search/${type}`);
    url.searchParams.set("api_key", "REDACTED");
    url.searchParams.set("include_adult", "true");
    url.searchParams.set("language", TMDB_LANGUAGE);
    url.searchParams.set("query", name);
    log(`fetching ${url.toString()}`);
    url.searchParams.set("api_key", TMDB_V3_API_KEY);

    const res = await gmFetchJson({
      method: "GET",
      url: url.toString(),
    });

    if (typeof res.total_results !== "number") {
      throw new Error("invalid response from tmdb");
    }
    if (res.total_results < 1) {
      saveCache(key, false);
      return false;
    }

    // try to find the first match with animation genre (16) first
    const entry =
      res.results.find((e: any) => e.genre_ids.includes(16)) || res.results[0];
    if (!entry || typeof entry.id !== "number") {
      throw new Error("invalid response from tmdb");
    }

    const out: TmdbIdentified = {
      mediaType: type,
      id: entry.id,
      rating: entry.vote_average,
      votes: entry.vote_count,
    };
    saveCache(key, out);
    return out;
  }

  name = "TMDB";
  flags: Set<ProviderFlags> = new Set([
    ProviderFlags.Score,
    ProviderFlags.Trailers,
    ProviderFlags.Link,
  ]);
  private identified: TmdbIdentified;

  async init() {
    const res = await ensureTmdbIdentified();
    if (!res) {
      return false;
    }

    this.identified = res;
    return true;
  }

  async getLink(): Promise<OutLink | false> {
    const ok = await this.ensureInitialized();
    if (!ok) {
      return false;
    }

    return {
      name: "TMDB",
      url: `https://www.themoviedb.org/${this.identified.mediaType}/${this.identified.id}`,
    };
  }

  async getTrailers(): Promise<Trailer[]> {
    const ok = await this.ensureInitialized();
    if (!ok) {
      return [];
    }

    const { mediaType, id } = this.identified;
    const key = `tmdb_${mediaType}_trailers_${id}`;
    const cached = checkCache(key);
    if (Array.isArray(cached)) {
      return cached as Trailer[];
    }

    const url = new URL(
      `https://api.themoviedb.org/3/${mediaType}/${id}/videos`
    );
    url.searchParams.set("api_key", "REDACTED");
    url.searchParams.set("language", TMDB_LANGUAGE);
    log(`fetching ${url.toString()}`);
    url.searchParams.set("api_key", TMDB_V3_API_KEY);

    const res = await gmFetchJson({
      method: "GET",
      url: url.toString(),
    });
    if (!Array.isArray(res.results) || res.id !== id) {
      throw new Error("invalid response from tmdb");
    }

    const trailers: Trailer[] = [];
    const teasers: Trailer[] = [];
    res.results.forEach((e: any) => {
      if (e.type === "Teaser") {
        teasers.push({
          site: e.site,
          key: e.key,
          name: `[Teaser] ${e.name}`,
        });
      } else if (e.type === "Trailer") {
        trailers.push({
          site: e.site,
          key: e.key,
          name: e.name,
        });
      }
    });
    const final = [...trailers, ...teasers];

    saveCache(key, final);
    return final;
  }

  async getScore(): Promise<Score | false> {
    const ok = await this.ensureInitialized();
    if (!ok) {
      return false;
    }

    const { rating, votes } = this.identified;
    return { rating, votes };
  }

  private scoreColors(rating: number): {
    trackColor: string;
    barColor: string;
  } {
    if (rating === 0) {
      return {
        trackColor: "#666666",
        barColor: "#d4d4d4",
      };
    }
    if (rating < 4) {
      return {
        trackColor: "#571435",
        barColor: "#db2360",
      };
    }
    if (rating < 7) {
      return {
        trackColor: "#423d0f",
        barColor: "#d2d531",
      };
    }
    return {
      trackColor: "#204529",
      barColor: "#21d07a",
    };
  }

  insertScore(parent: JQuery<HTMLElement>, score: Score) {
    const { rating, votes } = score;
    const { trackColor, barColor } = this.scoreColors(rating);

    const li = $(`<li
      style="
          background: 0 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          height: 68px;
      "
      title="${votes} votes"
      >
          <div
              class="${UNIQUE}-consensus"
              style="
                  width: 68px;
                  height: 68px;
                  display: inline-block;
                  transition: transform 0.2s;
                  transform: scale(1);
              "
          >
              <div
                  style="
                      display: inline-block;
                      width: 68px;
                      height: 68px;
                      border-radius: 50%;
                      background-color: #081c22;
                      padding: 4px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                  "
              >
                  <div
                      class="${UNIQUE}-user_score_chart"
                      data-percent="${rating * 10}"
                      data-track-color="${trackColor}"
                      data-bar-color="${barColor}"
                      style="
                          position: relative;
                          display: inline-block;
                          width: 60px;
                          height: 60px;
                          text-align: center;
                      "
                  >
                      <div
                          style="
                              width: 100%;
                              height: 100%;
                              z-index: 2;
                              display: flex;
                              align-items: center;
                              justify-content: center;
                          "
                      >
                          <span
                              class="${UNIQUE}-icon-r${
      rating > 0 ? rating * 10 : "NR"
    }"
                              style="
                                  color: #fff;
                                  font-size: 16px;
                                  font-family: Consensus !important;
                                  speak: none;
                                  font-style: normal;
                                  font-weight: 400;
                                  font-variant: normal;
                                  text-transform: none;
                                  line-height: 1;
                                  -webkit-font-smoothing: antialiased;
                                  -moz-osx-font-smoothing: grayscale;
                              "
                          ></span>
                      </div>
                  </div>
              </div>
          </div>
          <div
              style="
                  font-weight: 700;
                  margin-left: 12px;
                  color: #fff;
                  line-height: 20px;
                  font-size: 13px;
              "
          >TMDB<br/>Score
          </div>
      </li>
  `);

    parent.append(li);

    // @ts-expect-error
    $(".abtexr-user_score_chart").easyPieChart({
      lineCap: "round",
      lineWidth: 4,
      scaleColor: false,
      size: 60,
      animate: {
        enabled: false,
      },
    });
  }
}
