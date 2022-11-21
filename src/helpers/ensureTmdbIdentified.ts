import { tmdbQueryFromPage } from "../dom/tmdbQueryFromPage";
import { TmdbIdentified, TmdbProvider } from "../providers/TmdbProvider";
import { log } from "./log";

let tmdbPromise: Promise<TmdbIdentified | false>;

export async function ensureTmdbIdentified() {
  if (tmdbPromise) {
    return await tmdbPromise;
  }

  const mip = tmdbQueryFromPage();
  if (!mip) {
    tmdbPromise = Promise.resolve(false);
    return;
  }
  log("Media detected on page:", mip);

  tmdbPromise = TmdbProvider.identify(mip.type, mip.name);
  const id = await tmdbPromise;

  if (!id) {
    log("Could not identify media against TMDB");
  } else {
    log("TMDB Identification result:", id);
  }

  return id;
}
