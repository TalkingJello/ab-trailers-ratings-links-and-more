export enum VideoSite {
  YouTube = "YouTube",
  Vimeo = "Vimeo",
}

export interface Trailer {
  site: VideoSite;
  key: string;
  name: string;
}

export interface Score {
  rating: number;
  votes: number;
}

export interface OutLink {
  url: string;
  name: string;
}

export enum ProviderFlags {
  Score = "score",
  Trailers = "trailers",
  Link = "link",
}

export abstract class MetadataProvider {
  private initilizationPromise: Promise<boolean>;
  abstract name: string;

  protected abstract init(): Promise<boolean>;
  async ensureInitialized() {
    if (this.initilizationPromise) {
      return await this.initilizationPromise;
    }

    this.initilizationPromise = this.init();
    return await this.initilizationPromise;
  }

  flags: Set<ProviderFlags> = new Set();
  flagSupported(flag: ProviderFlags) {
    return this.flags.has(flag);
  }
  flagEnabled(flag: ProviderFlags) {
    return (
      this.flagSupported(flag) &&
      JSON.parse(GM_getValue(`provider-${this.name}-enable-${flag}`, "true"))
    );
  }

  async getLink(): Promise<OutLink | false> {
    return false;
  }
  async getTrailers(): Promise<Trailer[]> {
    return [];
  }
  async getScore(): Promise<Score | false> {
    return;
  }

  insertScore(parent: JQuery<HTMLElement>, score: Score) {
    return;
  }
}
