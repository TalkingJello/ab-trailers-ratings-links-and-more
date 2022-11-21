import { UNIQUE } from "../constants";
import { settings } from "../delicious";
import { isDubbed, isSubbed } from "../helpers/titleFilters";
import { Trailer, VideoSite } from "../providers/MetadataProvider";
import { pageSection } from "./pageSection";

function sortTrailers(tr: Trailer[]) {
  const trailers = [...tr];
  trailers.sort((a, b) => {
    let s = 0;

    // Try to prefer subs over raw
    if (isSubbed(a.name)) {
      s -= 1;
    }
    if (isSubbed(b.name)) {
      s += 1;
    }

    // Dub preference
    if (settings.preferredTrailerAudioLanguage !== "any") {
      const mod = settings.preferredTrailerAudioLanguage === "dubbed" ? -2 : 2;

      if (isDubbed(a.name)) {
        s += mod;
      }

      if (isDubbed(b.name)) {
        s -= mod;
      }
    }

    return s;
  });

  return trailers;
}

export function injectTrailersToPage(tr: Trailer[]) {
  const trailers = sortTrailers(tr);

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
          `Unsupported tmdb trailer site: ${trailer.site}. Please report to TalkingJello with the link to the torrent group`
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

  // select first on load
  selectTrailer(0);
}
