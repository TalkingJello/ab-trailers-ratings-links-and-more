import { settings } from "../delicious";
import { SEASON_PART_REGEX, tmdbQueryFromPage } from "../dom/tmdbQueryFromPage";
import { TrailerWithInfo, WithProvider } from "../providers/MetadataProvider";
import { log } from "./log";
import { dubbedInTitle, subbedInTitle } from "./trailerTitleFilters";

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

const res = tmdbQueryFromPage(false);
// if it's a season or part, we should prefer trailers from MAL
// since they will be specific to the season/part
// unlike tmdb which will have trailers for the whole series
const preferMal = res ? SEASON_PART_REGEX.test(res.name) : false;
log("preferMal", preferMal);
log("res", res);

type Tier = (trailer: WithProvider<TrailerWithInfo>) => boolean;
// Tiers of preference
const tiers: Tier[] = [
  // Prefer MAL
  (trailer) => preferMal && trailer.provider.name === "MAL",
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

export function sortTrailers(tr: WithProvider<TrailerWithInfo>[]) {
  const trailers = [...tr];
  trailers.sort((a, b) => {
    let s = 0;

    for (const fn of tiers) {
      if (s !== 0) {
        break;
      }

      if (fn(a)) {
        s -= 1;
      }
      if (fn(b)) {
        s += 1;
      }
    }

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
