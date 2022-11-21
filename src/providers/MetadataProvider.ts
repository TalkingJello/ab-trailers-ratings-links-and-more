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
  abstract insertScore(parent: JQuery<HTMLElement>): void;

  getLink(): OutLink | false {
    return false;
  }
  async getTrailers(): Promise<Trailer[]> {
    return [];
  }
  async getScore(): Promise<Score | false> {
    return;
  }
}
