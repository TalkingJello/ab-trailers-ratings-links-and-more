import { insertDeliciousSettingsUi } from "./delicious";
import { injectLinksToPage } from "./dom/injectLinksToPage";
import { injectRatingsToPage } from "./dom/injectRatingsToPage";
import { injectTrailersToPage } from "./dom/injectTrailersToPage";
import { placeSynopsis } from "./dom/placeSynopsis";
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
    // new MalProvider(),
    new MalJikanProvider(),
    new ImdbProvider(),
    new TvdbProvider(),
    new AniDbProvider(),
  ];
  insertDeliciousSettingsUi(providers);

  // Inject to dom
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
      .map(
        async (p): Promise<[MetadataProvider, Trailer[]]> => [
          p,
          await p.getTrailers(),
        ]
      )
  );
  res.forEach((r) => {
    if (r.status === "rejected") {
      // TODO: Handle error
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
  console.log(e);
});
