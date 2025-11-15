import { logError } from "../helpers/log";
import {
  MetadataProvider,
  ProviderFlags,
  Trailer,
  VideoSite,
} from "./MetadataProvider";

export class MoeTrailerProvider extends MetadataProvider {
  name = "Moe Trailer";
  flags = new Set([ProviderFlags.Trailers]);
  private youtubeId: string | false = false;

  async init() {
    // 'https://www.youtube.com/embed/TZzMOC-4k6M?autoplay=0'
    const url = $("#layout-wrapper iframe.w-100.img-thumbnail").attr("src");
    if (!url) {
      logError("No Moe trailer iframe found on page");
      return false;
    }

    const parts = url.split("/embed/");
    if (!parts[1]) {
    }

    const id = parts[1].split(/[?&]/)[0];
    if (!id) {
      logError("Failed to parse Moe trailer YouTube ID from iframe src", url);
      return false;
    }

    this.youtubeId = id;
    return true;
  }

  async getTrailers(): Promise<Trailer[]> {
    const ok = await this.ensureInitialized();
    if (!ok || !this.youtubeId) {
      return [];
    }

    return [
      {
        key: this.youtubeId,
        site: VideoSite.YouTube,
        name: "Embedded Trailer",
      },
    ];
  }
}
