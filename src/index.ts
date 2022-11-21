import { insertDeliciousSettingsUi } from "./delicious";
import { injectLinksToPage } from "./dom/injectLinksToPage";
import { injectRatingsToPage } from "./dom/injectRatingsToPage";
import { injectTrailersToPage } from "./dom/injectTrailersToPage";
import { placeSynopsis } from "./dom/placeSynopsis";
import { tmdbQueryFromPage } from "./dom/tmdbQueryFromPage";
import { log } from "./helpers/log";
import { TmdbProvider } from "./providers/TmdbProvider";
import consensusCss from "./style/consensus";
import "./style/main.less";

async function main() {
  // General
  GM_addStyle(consensusCss);
  insertDeliciousSettingsUi();
  placeSynopsis();

  // Identify media on page
  const mip = tmdbQueryFromPage();
  if (!mip) {
    return;
  }
  log("Media detected on page:", mip);

  // Identify from tmdb
  const id = await TmdbProvider.identify(mip.type, mip.name);
  if (!id) {
    log("No match found on TMDB.");
    return;
  }
  log("TMDB Identification result:", id);

  // Providers
  const tmdbProvider = new TmdbProvider(id);
  const providers = [tmdbProvider];

  // Inject to dom
  injectLinksToPage(providers);
  injectRatingsToPage(providers);
  const trailers = (
    await Promise.all(providers.map((p) => p.getTrailers()))
  ).flat();
  injectTrailersToPage(trailers);
}

main().catch((e) => {
  console.log(e);
});
