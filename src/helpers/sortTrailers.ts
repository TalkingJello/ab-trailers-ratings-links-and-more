import { settings } from "../delicious";
import { SEASON_PART_REGEX, tmdbQueryFromPage } from "../dom/tmdbQueryFromPage";
import { TrailerWithInfo, WithProvider } from "../providers/MetadataProvider";
import { SortTier, tierSort } from "./tierSort";
import {
  announcement,
  commercial,
  dubbedInTitle,
  promotionalVideo,
  subbedInTitle,
  teaser,
} from "./trailerTitleFilters";

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

// if it's a season or part, we should prefer trailers from MAL
// since they will be specific to the season/part
// unlike tmdb which will have trailers for the whole series
const res = tmdbQueryFromPage(false);
const preferMal = res
  ? SEASON_PART_REGEX.test(res.name) || res.name.includes(":")
  : false;

const PREFERRED_CHANNELS = [
  "UC6pGDc4bFGD1_36IKv3FnYg", // Crunchyroll
  "UCRuJMENPfFiMYoqCXleDLLQ", // Madman Anime
  "UCWOA1ZGywLbqmigxE4Qlvuw", // Netflix
];

// Tiers of preference
const tiers: SortTier<WithProvider<TrailerWithInfo>>[] = [
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
  // Preferred channels that are (I think) always subbed
  (t) => t.info && PREFERRED_CHANNELS.includes(t.info.channelId),
  // Try to prefer subs over raw
  (t) =>
    subbedInTitle(t.name) ||
    (t.info &&
      !!t.info.captions.find(
        (c) => c.languageCode === "en" && c.kind !== "asr"
      )),
  // "Regular" trailers
  (t) =>
    !teaser(t.name) &&
    !commercial(t.name) &&
    !promotionalVideo(t.name) &&
    !announcement(t.name),
  // Promotional Videos
  (t) => promotionalVideo(t.name),
  // Teasers
  (t) => teaser(t.name),
  // Commercials and announcements
  (t) => commercial(t.name) || announcement(t.name),
];

export function sortTrailers(tr: WithProvider<TrailerWithInfo>[]) {
  return tierSort(tr, tiers, (a, b) => {
    // Default compare as last resort to order numbered trailers
    if (a.name < b.name) {
      return -0.1;
    }
    if (a.name > b.name) {
      return 0.1;
    }

    return 0;
  });
}
