import { internetOrWebsiteOrLinkDownErrorTitle } from "./constants";
import { insertDeliciousSettingsUi } from "./delicious";
import { errorsSection, uiShowError } from "./dom/displayErrors";
import {
  abInjectLinksToPage,
  moeInjectLinksToPage,
} from "./dom/injectLinksToPage";
import {
  abInjectRatingsToPage,
  moeInjectRatingsToPage,
} from "./dom/injectRatingsToPage";
import { injectTrailersToPage } from "./dom/injectTrailersToPage";
import { abPlaceSynopsis, moePlaceSynopsis } from "./dom/placeSynopsis";
import { log, logError } from "./helpers/log";
import { site } from "./helpers/site";
import { AniDbProvider } from "./providers/AniDbProvider";
import { AnnProvider } from "./providers/AnnProvider";
import { ImdbProvider } from "./providers/ImdbProvider";
import { MalJikanProvider } from "./providers/MalJikanProvider";
import {
  MetadataProvider,
  ProviderFlags,
  Score,
  Trailer,
  WithProvider,
} from "./providers/MetadataProvider";
import { MoeTrailerProvider } from "./providers/MoeTrailerProvider";
import { TmdbProvider } from "./providers/TmdbProvider";
import { TvdbProvider } from "./providers/TvdbProvider";
import { WikipediaProvider } from "./providers/WikipediaProvider";
import consensusCss from "./style/consensus";
import "./style/main.less";

async function fetchTrailersFromProviders(
  providers: MetadataProvider[]
): Promise<WithProvider<Trailer>[]> {
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
  return trailers;
}

async function fetchLinksFromProviders(providers: MetadataProvider[]) {
  const res = await Promise.allSettled(
    providers.map(async (p) => {
      try {
        return await p.getLink();
      } catch (err) {
        uiShowError(
          `Failed to create external link to ${p.name}`,
          internetOrWebsiteOrLinkDownErrorTitle(p.name),
          err
        );
        throw err;
      }
    })
  );
  return res
    .map((r) => {
      if (r.status === "rejected") {
        logError(r.reason);
        return;
      }

      const link = r.value;
      if (!link) {
        return;
      }
      return link;
    })
    .filter((l): l is NonNullable<typeof l> => Boolean(l));
}

async function fetchRatingsFromProviders(
  providers: MetadataProvider[]
): Promise<WithProvider<Score>[]> {
  const res = await Promise.allSettled(
    providers.map(async (provider): Promise<WithProvider<Score> | false> => {
      try {
        const score = await provider.getScore();
        if (!score) {
          return false;
        }

        return {
          provider,
          ...score,
        };
      } catch (err) {
        uiShowError(
          `Failed to fetch rating from ${provider.name}`,
          internetOrWebsiteOrLinkDownErrorTitle(provider.name),
          err
        );
        throw err;
      }
    })
  );

  const valid: WithProvider<Score>[] = [];
  res.forEach((r) => {
    if (r.status === "rejected") {
      logError(r.reason);
      return;
    }

    if (r.value !== false) {
      valid.push(r.value);
    }
  });
  return valid;
}

async function main() {
  // Tmdb font
  GM_addStyle(consensusCss);

  // Providers
  const siteSpecificProviders: MetadataProvider[] = site.ab
    ? []
    : [new AnnProvider(), new WikipediaProvider(), new MoeTrailerProvider()];
  const providers = [
    new TmdbProvider(),
    new MalJikanProvider(),
    new ImdbProvider(),
    new TvdbProvider(),
    new AniDbProvider(),
    ...siteSpecificProviders,
  ];
  log("Providers initialized", providers);

  // All urls
  insertDeliciousSettingsUi(providers);
  if (site.moe) {
    // @ts-expect-error
    unsafeWindow.$ = $; // Make jQuery globally available for dev console
  }

  // Verify on anime page
  if (
    site.ab &&
    (window.location.pathname !== "/torrents.php" ||
      !new URLSearchParams(window.location.search).get("id"))
  ) {
    log("Not on torrents page, skipping...");
    return;
  }
  if (
    site.moe &&
    (!window.location.pathname.startsWith("/series/") ||
      window.location.pathname.split("/series/")[1] === "" ||
      $("#layout-wrapper div.page-title-box > ol > li:nth-child(2)")
        .text()
        .trim() !== "Anime")
  ) {
    log("Not on series page, skipping...");
    return;
  }

  if (site.ab) {
    abPlaceSynopsis();
    const synopsis = $('.box > .head > strong:contains("Plot Synopsis")')
      .parent()
      .parent();
    synopsis.before(errorsSection.container);
  } else if (site.moe) {
    moePlaceSynopsis();
    const mainColumn = $("#layout-wrapper div.row > div:last-child");
    mainColumn.prepend(errorsSection.container);
  }

  fetchLinksFromProviders(
    providers.filter((p) => p.isEnabled() && p.flagEnabled(ProviderFlags.Link))
  ).then((links) => {
    if (site.ab) {
      abInjectLinksToPage(links);
    } else if (site.moe) {
      moeInjectLinksToPage(links);
    }
  });

  fetchRatingsFromProviders(
    providers.filter((p) => p.isEnabled() && p.flagEnabled(ProviderFlags.Score))
  ).then((ratings) => {
    if (site.ab) {
      abInjectRatingsToPage(ratings);
    } else if (site.moe) {
      moeInjectRatingsToPage(ratings);
    }
  });

  fetchTrailersFromProviders(
    providers.filter(
      (p) => p.isEnabled() && p.flagEnabled(ProviderFlags.Trailers)
    )
  ).then((trailers) => {
    injectTrailersToPage(trailers);
  });
}

main().catch((e) => {
  logError(e);
});
