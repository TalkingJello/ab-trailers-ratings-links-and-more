import { UNIQUE } from "../constants";
import { settings } from "../delicious";
import { fetchYoutubeVideoInfo } from "../helpers/fetchYoutubeVideoInfo";
import { log } from "../helpers/log";
import { sortTrailers } from "../helpers/sortTrailers";
import {
  Trailer,
  TrailerWithInfo,
  VideoSite,
  WithProvider,
} from "../providers/MetadataProvider";
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
            // @TODO more handling needed?
            log("Failed to fetch youtube video info -", trailer.key, err);
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
      unplayableCount++;
      return;
    }

    trailers.push(trailer);
  });

  trailers = sortTrailers(trailers);

  // General layout
  const synopsis = $('.box > .head > strong:contains("Plot Synopsis")')
    .parent()
    .parent();
  const { container, body, head, setError, resetError } =
    pageSection("Trailer");
  if (settings.trailerAfterSynopsis) {
    container.insertAfter(synopsis);
  } else {
    container.insertBefore(synopsis);
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
      src,
      width: "693",
      height: "390",
      allowFullscreen: "",
      allow: "fullscreen;",
    }) as HTMLIFrameElement;
    iframe.style.border = "none";
  };

  if (trailers.length > 1) {
    // trailers selection
    const select = $(
      `<select name="trailers" id="${UNIQUE}-trailer-selection" style="margin-left: 10px; padding: 2px;max-width: 90%;"></select>`
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
    log("Unplayable trailers", unplayableCount);
  }

  // select first on load
  if (trailers.length > 0) {
    selectTrailer(0);
  }
}
