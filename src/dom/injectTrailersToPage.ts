import { UNIQUE } from "../constants";
import { settings } from "../delicious";
import { fetchYoutubeVideoInfo } from "../helpers/fetchYoutubeVideoInfo";
import { log, logError } from "../helpers/log";
import { siteColors } from "../helpers/ratingTextColors";
import { site } from "../helpers/site";
import { sortTrailers } from "../helpers/sortTrailers";
import {
  Trailer,
  TrailerWithInfo,
  VideoSite,
  WithProvider,
} from "../providers/MetadataProvider";
import { uiShowError } from "./displayErrors";
import { pageSection } from "./pageSection";

export async function injectTrailersToPage(tr: WithProvider<Trailer>[]) {
  if (tr.length === 0) {
    return;
  }

  // dedupe trailers
  const map: Record<string, WithProvider<Trailer>> = {};
  tr.forEach((trailer) => {
    const { site, key } = trailer;
    const id = `${site}:${key}`;
    if (!map[id]) {
      map[id] = trailer;
    }
  });

  // Fetch youtube video info
  let trailers: WithProvider<TrailerWithInfo>[] = [];
  let unplayableCount = 0;
  (
    await Promise.allSettled(
      Object.values(map).map(
        async (trailer): Promise<WithProvider<TrailerWithInfo>> => {
          if (trailer.site !== VideoSite.YouTube) {
            return trailer;
          }

          try {
            const info = await fetchYoutubeVideoInfo(trailer.key);

            return {
              ...trailer,
              name: info.playable
                ? trailer.name
                : `*UNPLAYABLE* ${trailer.name}`,
              info,
            };
          } catch (err) {
            uiShowError(
              `*Not* Fatal - Failed to fetch youtube data for trailer: <i>${trailer.name}</i>`,
              `The trailer will still be displayed,
but smart trailer sorting might not work as expected.
Auto detecting youtube region limits will also not work for this trailer,
so it might not be playable.`,
              err
            );
            logError("Failed to fetch youtube video info -", trailer.key, err);
            return trailer;
          }
        }
      )
    )
  ).forEach((promise) => {
    if (promise.status === "rejected") {
      return;
    }

    const trailer = promise.value;
    if (trailer.info && !trailer.info.playable) {
      log("Unplayable trailer", trailer);
      unplayableCount++;
      return;
    }

    trailers.push(trailer);
  });

  trailers = await sortTrailers(trailers);

  // General layout
  const { container, body, head, setError, resetError } =
    pageSection("Trailer");
  if (site.ab) {
    const synopsis = $('.box > .head > strong:contains("Plot Synopsis")')
      .parent()
      .parent();

    if (settings.trailerAfterSynopsis) {
      container.insertAfter(synopsis);
    } else {
      container.insertBefore(synopsis);
    }
  } else if (site.moe) {
    // remove default trailer
    const h6 = $(
      `#layout-wrapper div.row > div:first-child > h6:contains("Trailer")`
    );
    const parent = h6.parent();
    h6.next().remove();
    h6.remove();

    // insert our trailer
    if (settings.trailerInSidebar) {
      parent.append(container);
    } else {
      const synopsisTitle = $(
        `#layout-wrapper div.row > div:last-child > h6:contains("Synopsis")`
      );
      const synopsisCard = synopsisTitle.next();

      if (settings.trailerAfterSynopsis) {
        container.insertAfter(synopsisCard);
      } else {
        container.insertBefore(synopsisTitle);
      }
    }
  }

  // Load trailer to page
  let iframe: HTMLIFrameElement;
  const selectTrailer = (i: number) => {
    resetError();
    if (iframe) {
      $(iframe).remove();
    }

    const trailer = trailers[i];
    let src;
    switch (trailer.site) {
      case VideoSite.YouTube:
        src = `https://www.youtube-nocookie.com/embed/${trailer.key}?VQ=HD1080&rel=0&loop=1`;
        break;
      case VideoSite.Vimeo:
        src = `https://player.vimeo.com/video/${trailer.key}`;
        break;
      default:
        setError(
          `Unsupported trailer site: ${trailer.site}. Please report to TalkingJello with the link to the torrent group`
        );
    }

    iframe = GM_addElement(body.get(0), "iframe", {
      src: src,
      width: settings.trailerInSidebar ? "100%" : 693 * (site.moe ? 1.2 : 1),
      height: settings.trailerInSidebar ? "auto" : 390 * (site.moe ? 1.2 : 1),
      title: "YouTube video player",
      allow:
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
      allowFullscreen: true,
      referrerpolicy: "strict-origin-when-cross-origin",
      style: `border: none;${site.moe ? "border-radius: 7.7px;" : ""}`,
    }) as HTMLIFrameElement;
  };

  if (trailers.length > 1) {
    // trailers selection
    const select = $(
      `<select name="trailers" id="${UNIQUE}-trailer-selection" style="margin-left: 10px; padding: 2px; max-width: 90%;${
        site.moe
          ? `height: 25px;
             border-radius: 5px;
             border: 3px solid ${siteColors.border};
             color: ${siteColors.textSecondary};
             background: ${siteColors.backgroundPopout};
             flex-basis: 0;
             width: 100%;
             flex-grow: 1;
             padding: 0 !important;`
          : ""
      }"></select>`
    );
    trailers.forEach((t, i) => {
      const opt = $(`<option value="${i}"></option>`);
      opt.text(t.name);
      select.append(opt);
    });
    select.change(() => {
      selectTrailer(parseInt(select.val() as string));
    });
    head.append(select);
  }

  if (unplayableCount > 0) {
    log(unplayableCount, "unplayable trailers found");
  }

  // select first on load
  if (trailers.length > 0) {
    selectTrailer(0);
  }
}
