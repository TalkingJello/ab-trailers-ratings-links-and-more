import { insertDeliciousSettingsUi } from "./delicious";
import { injectLinksToPage } from "./dom/injectLinksToPage";
import { injectRatingsToPage } from "./dom/injectRatingsToPage";
import { injectTrailersToPage } from "./dom/injectTrailersToPage";
import { placeSynopsis } from "./dom/placeSynopsis";
import { ImdbProvider } from "./providers/ImdbProvider";
import { ProviderFlags, Trailer } from "./providers/MetadataProvider";
import { TmdbProvider } from "./providers/TmdbProvider";
import { TvdbProvider } from "./providers/tvdbProvider";
import consensusCss from "./style/consensus";
import "./style/main.less";

async function main() {
  // General
  GM_addStyle(consensusCss);
  placeSynopsis();

  // Providers
  const providers = [
    new TmdbProvider(),
    new ImdbProvider(),
    new TvdbProvider(),
  ];
  insertDeliciousSettingsUi(providers);

  // Inject to dom
  injectLinksToPage(providers.filter((p) => p.flagEnabled(ProviderFlags.Link)));
  injectRatingsToPage(
    providers.filter((p) => p.flagEnabled(ProviderFlags.Score))
  );

  const trailers: Trailer[] = [];
  const res = await Promise.allSettled(
    providers
      .filter((p) => p.flagEnabled(ProviderFlags.Trailers))
      .map((p) => p.getTrailers())
  );
  res.forEach((r) => {
    if (r.status === "rejected") {
      // TODO: Handle error
      return;
    }

    trailers.push(...r.value);
  });

  injectTrailersToPage(trailers);
}

main().catch((e) => {
  console.log(e);
});
