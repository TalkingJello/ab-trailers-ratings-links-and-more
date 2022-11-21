import { tmdbQueryFromPage } from "../dom/tmdbQueryFromPage";
import { TmdbItem, TmdbProvider } from "../providers/TmdbProvider";
import { log } from "./log";

async function tmdbItem(): Promise<TmdbItem | false> {
  const mip = tmdbQueryFromPage();
  if (!mip) {
    return false;
  }
  log("Media detected on page:", mip);

  const id = await TmdbProvider.identify(mip.type, mip.name);
  if (!id) {
    log("Could not identify media against TMDB");
    return false;
  }
  log("TMDB Identification result:", id);

  const item = await TmdbProvider.fetchItem(id);
  log("TMDB Item result:", item);
  return item;
}

let tmdbPromise: Promise<TmdbItem | false>;
export async function ensureTmdbItem() {
  if (tmdbPromise) {
    return await tmdbPromise;
  }

  tmdbPromise = tmdbItem();
  return await tmdbPromise;
}
