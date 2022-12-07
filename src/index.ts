import { internetOrWebsiteOrLinkDownErrorTitle } from "./constants";
import { insertDeliciousSettingsUi } from "./delicious";
import { errorsSection, uiShowError } from "./dom/displayErrors";
import { injectLinksToPage } from "./dom/injectLinksToPage";
import { injectRatingsToPage } from "./dom/injectRatingsToPage";
import { injectTrailersToPage } from "./dom/injectTrailersToPage";
import { placeSynopsis } from "./dom/placeSynopsis";
import { log, logError } from "./helpers/log";
import { AniDbProvider } from "./providers/AniDbProvider";
import { ImdbProvider } from "./providers/ImdbProvider";
import { MalJikanProvider } from "./providers/MalJikanProvider";
import {
  MetadataProvider,
  ProviderFlags,
  Trailer,
  WithProvider,
} from "./providers/MetadataProvider";
import { TmdbProvider } from "./providers/TmdbProvider";
import { TvdbProvider } from "./providers/TvdbProvider";
import consensusCss from "./style/consensus";
import "./style/main.less";

async function main() {
  // General
  GM_addStyle(consensusCss);
  placeSynopsis();

  // Providers
  const providers = [
    new TmdbProvider(),
    // new MalProvider(),
    new MalJikanProvider(),
    new ImdbProvider(),
    new TvdbProvider(),
    new AniDbProvider(),
  ];
  insertDeliciousSettingsUi(providers);

  if (
    window.location.pathname !== "/torrents.php" ||
    !new URLSearchParams(window.location.search).get("id")
  ) {
    log("Not on a torrent page, not doing anything", window.location);
    return;
  }

  // Inject to dom
  const synopsis = $('.box > .head > strong:contains("Plot Synopsis")')
    .parent()
    .parent();
  synopsis.before(errorsSection.container);

  injectLinksToPage(
    providers.filter((p) => p.isEnabled() && p.flagEnabled(ProviderFlags.Link))
  );
  injectRatingsToPage(
    providers.filter((p) => p.isEnabled() && p.flagEnabled(ProviderFlags.Score))
  );

  const trailers: WithProvider<Trailer>[] = [];
  const res = await Promise.allSettled(
    providers
      .filter((p) => p.isEnabled() && p.flagEnabled(ProviderFlags.Trailers))
      .map(async (p): Promise<[MetadataProvider, Trailer[]]> => {
        try {
          return [p, await p.getTrailers()];
        } catch (err) {
          uiShowError(
            `Failed to fetch trailers from ${p.name}`,
            internetOrWebsiteOrLinkDownErrorTitle(p.name),
            err
          );
          throw err;
        }
      })
  );
  res.forEach((r) => {
    if (r.status === "rejected") {
      logError(r.reason);
      return;
    }

    const [provider, providerTrailers] = r.value;
    providerTrailers.forEach((t) => {
      trailers.push({
        provider,
        ...t,
      });
    });
  });

  injectTrailersToPage(trailers);
}

main().catch((e) => {
  logError(e);
});
