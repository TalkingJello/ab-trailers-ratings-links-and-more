import { UNIQUE } from "../constants";
import { settings } from "../delicious";
import { fetchYoutubeVideoInfo } from "../helpers/fetchYoutubeVideoInfo";
import { log } from "../helpers/log";
import { sortTrailers } from "../helpers/sortTrailers";
import {
  Trailer,
  TrailerWithInfo,
  VideoSite,
} from "../providers/MetadataProvider";
import { pageSection } from "./pageSection";

export async function injectTrailersToPage(tr: Trailer[]) {
  if (tr.length === 0) {
    return;
  }
  let unplayableCount = 0;
  let trailers: TrailerWithInfo[] = [];
  (
    await Promise.allSettled(
      tr.map(async (t): Promise<TrailerWithInfo> => {
        if (t.site !== VideoSite.YouTube) {
          return t;
        }

        try {
          const info = await fetchYoutubeVideoInfo(t.key);

          return {
            ...t,
            name: info.playable ? t.name : `*UNPLAYABLE* ${t.name}`,
            info,
          };
        } catch (err) {
          // @TODO more handling needed?
          log("Failed to fetch youtube video info -", t.key, err);
          return t;
        }
      })
    )
  ).forEach((p) => {
    if (p.status === "rejected") {
      return;
    }

    if (p.value.info && !p.value.info.playable) {
      unplayableCount++;
      return;
    }

    trailers.push(p.value);
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
