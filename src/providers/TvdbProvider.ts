import { ensureTmdbItem } from "../helpers/ensureTmdbItem";
import { MetadataProvider, OutLink, ProviderFlags } from "./MetadataProvider";

// @TODO: rating? trailers?
export class TvdbProvider extends MetadataProvider {
  name = "tvdb";
  flags = new Set([ProviderFlags.Link]);
  private tvdbId: number | false = false;

  async init() {
    const res = await ensureTmdbItem();
    if (!res || typeof res.externalIds.tvdb_id !== "number") {
      return false;
    }

    this.tvdbId = res.externalIds.tvdb_id;
    return true;
  }

  async getLink(): Promise<OutLink | false> {
    const ok = await this.ensureInitialized();
    if (!ok) {
      return false;
    }

    return {
      name: "tvdb",
      url: `https://www.thetvdb.com/?tab=series&id=${this.tvdbId}`,
    };
  }
}
