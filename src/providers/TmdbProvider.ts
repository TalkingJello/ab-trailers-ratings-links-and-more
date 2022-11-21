import { TMDB_LANGUAGE, UNIQUE } from "../constants";
import { checkCache, saveCache } from "../helpers/cache";
import { ensureTmdbItem } from "../helpers/ensureTmdbIdentified";
import { gmFetchJson } from "../helpers/gmFetchJson";
import { log } from "../helpers/log";
import { TMDB_V3_API_KEY } from "../keys";
import {
  MetadataProvider,
  OutLink,
  ProviderFlags,
  Score,
  Trailer,
  VideoSite,
} from "./MetadataProvider";

export enum TmdbMediaType {
  Movie = "movie",
  Tv = "tv",
}

export interface TmdbIdentified {
  id: number;
  mediaType: TmdbMediaType;
}

export interface TmdbExternalIds {
  imdb_id?: string;
  tvdb_id?: number;
  wikidata_id?: string;
  facebook_id?: string;
  instagram_id?: string;
  twitter_id?: string;
}

export interface TmdbVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface TmdbItem extends TmdbIdentified {
  rating: number;
  votes: number;
  externalIds: TmdbExternalIds;
  videos: TmdbVideo[];
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
    };
    saveCache(key, out);
    return out;
  }

  // both identify and fetch are needed since tmdb search
  // doesn't return videos or external ids
  // will probably come in handy anyways if we want to
  // add some sort of match fixing for tmdb
  static async fetchItem(identified: TmdbIdentified): Promise<TmdbItem> {
    const { mediaType, id } = identified;
    const key = `tmdb_fetch_${mediaType}_${id}`;
    const cached = checkCache(key);
    if (cached !== undefined) {
      return cached as TmdbItem;
    }

    const url = new URL(`https://api.themoviedb.org/3/${mediaType}/${id}`);
    url.searchParams.set("api_key", "REDACTED");
    url.searchParams.set("language", TMDB_LANGUAGE);
    url.searchParams.set("append_to_response", "external_ids,videos");
    log(`fetching ${url.toString()}`);
    url.searchParams.set("api_key", TMDB_V3_API_KEY);

    const res = await gmFetchJson({
      method: "GET",
      url: url.toString(),
    });
    console.log("res", res);

    if (
      res.id !== id ||
      !Array.isArray(res.videos?.results) ||
      !res.external_ids
    ) {
      console.log("invalid response from tmdb", res);
      throw new Error("invalid response from tmdb");
    }

    const out: TmdbItem = {
      mediaType,
      id,
      rating: res.vote_average,
      votes: res.vote_count,
      externalIds: res.external_ids,
      videos: res.videos.results,
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
  private item: TmdbItem;

  async init() {
    const res = await ensureTmdbItem();
    if (!res) {
      return false;
    }

    this.item = res;
    return true;
  }

  async getLink(): Promise<OutLink | false> {
    const ok = await this.ensureInitialized();
    if (!ok) {
      return false;
    }

    return {
      name: "TMDB",
      url: `https://www.themoviedb.org/${this.item.mediaType}/${this.item.id}`,
    };
  }

  async getTrailers(): Promise<Trailer[]> {
    const ok = await this.ensureInitialized();
    if (!ok) {
      return [];
    }

    const trailers: Trailer[] = [];
    const teasers: Trailer[] = [];
    this.item.videos.forEach((v) => {
      if (v.type === "Teaser") {
        teasers.push({
          site: v.site as VideoSite,
          key: v.key,
          name: `[Teaser] ${v.name}`,
        });
      } else if (v.type === "Trailer") {
        trailers.push({
          site: v.site as VideoSite,
          key: v.key,
          name: v.name,
        });
      }
    });
    const final = [...trailers, ...teasers];

    return final;
  }

  async getScore(): Promise<Score | false> {
    const ok = await this.ensureInitialized();
    if (!ok) {
      return false;
    }

    const { rating, votes } = this.item;
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
      rating > 0 ? Math.round(rating * 10) : "NR"
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
