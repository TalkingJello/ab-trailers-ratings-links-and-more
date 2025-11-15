import { malIdFromPage } from "../dom/idsFromPage";
import { fetchMalExternals } from "../helpers/fetchMalExternals";
import { logError } from "../helpers/log";
import { MetadataProvider, OutLink, ProviderFlags } from "./MetadataProvider";

export class AnnProvider extends MetadataProvider {
  name = "ANN";
  flags = new Set([ProviderFlags.Link]);
  private url: string | false = false;

  async init() {
    const malId = malIdFromPage();
    if (!malId) {
      logError("Failed to find MAL ID on page for externals fetch");
      return false;
    }

    const externals = await fetchMalExternals(malId);

    const url = externals.find((e) => e.name === "ANN")?.url;
    if (!url) {
      logError("No ANN external found in MAL externals", externals);
      return false;
    }

    this.url = url;
    return true;
  }

  async getLink(): Promise<OutLink | false> {
    const ok = await this.ensureInitialized();
    if (!ok || !this.url) {
      return false;
    }

    return {
      name: "ANN",
      url: this.url,
    };
  }
}
