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

export abstract class MetadataProvider {
  protected insertLink(link: OutLink) {
    throw new Error("Method not implemented.");
  }

  abstract insertScore(parent: JQuery<HTMLElement>): void;

  async getLink(): Promise<OutLink | undefined> {
    return;
  }
  async getTrailers(): Promise<Trailer[]> {
    return [];
  }
  async getScore(): Promise<Score | undefined> {
    return;
  }
}
