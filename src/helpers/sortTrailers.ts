import { settings } from "../delicious";
import { TrailerWithInfo } from "../providers/MetadataProvider";
import { dubbedInTitle, subbedInTitle } from "./trailerTitleFilters";

type Tier = (trailer: TrailerWithInfo) => boolean;

function isDubbed(trailer: TrailerWithInfo) {
  return (
    dubbedInTitle(trailer.name) ||
    (trailer.info &&
      // if it has auto generated English subtitles,
      // it means it probably has english audio
      !!trailer.info.captions.find(
        (c) => c.languageCode === "en" && c.kind === "asr"
      ))
  );
}

// Tiers of preference
const tiers: Tier[] = [
  // Dubs
  (t) => {
    if (settings.preferredTrailerAudioLanguage === "any") {
      return false;
    }
    const preferDubbed = settings.preferredTrailerAudioLanguage === "dubbed";

    return preferDubbed ? isDubbed(t) : !isDubbed(t);
  },
  // Crunchyroll is (I think) always (at least) subbed
  (t) => t.info && t.info.channelId === "UC6pGDc4bFGD1_36IKv3FnYg",
  // Try to prefer subs over raw
  (t) =>
    subbedInTitle(t.name) ||
    (t.info &&
      // if it has auto generated English subtitles,
      // it means it probably has english audio
      !!t.info.captions.find(
        (c) => c.languageCode === "en" && c.kind !== "asr"
      )),
];

export function sortTrailers(tr: TrailerWithInfo[]) {
  const trailers = [...tr];
  trailers.sort((a, b) => {
    let s = 0;

    tiers.forEach((fn, i) => {
      if (fn(a)) {
        s -= 2 ** i;
      }
      if (fn(b)) {
        s += 2 ** i;
      }
    });

    // Default compare as last resort to order numbered trailers
    if (a.name < b.name) {
      s -= 0.1;
    }
    if (a.name > b.name) {
      s += 0.1;
    }

    return s;
  });

  return trailers;
}
