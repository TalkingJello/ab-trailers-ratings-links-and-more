import { ensureTmdbItem } from "../helpers/ensureTmdbIdentified";
import { MetadataProvider, OutLink, ProviderFlags } from "./MetadataProvider";

// @TODO: rating? trailers?
export class ImdbProvider extends MetadataProvider {
  name = "IMDb";
  flags = new Set([ProviderFlags.Link]);
  private imdbId: string | false = false;

  async init() {
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

  async getLink(): Promise<OutLink | false> {
    const ok = await this.ensureInitialized();
    if (!ok) {
      return false;
    }

    return {
      name: "IMDb",
      url: `https://www.imdb.com/title/${this.imdbId}`,
    };
  }
}
