import { TmdbMediaType } from "../providers/TmdbProvider";

type Preprocessor = (title: string) => string;

export const SEASON_PART_REGEX = /(Season|Part) \d+/i;

const preprocessors: Preprocessor[] = [
  // Remove season/part number
  (title) => title.replace(SEASON_PART_REGEX, ""),
  // Trim
  (title) => title.trim(),
  // Lowercase (so cache hits in case of different casing)
  (title) => title.toLowerCase(),
];

export function tmdbQueryFromPage(process = true) {
  const s = $("#content > div.thin > h2:first-child").text().split(" - ");
  const post = s.pop();
  const type =
    post.startsWith("TV Series") || post.startsWith("ONA")
      ? TmdbMediaType.Tv
      : post.startsWith("Movie")
      ? TmdbMediaType.Movie
      : false;

  if (!type) {
    return false;
  }

  const name = s.join(" - ");
  return {
    type,
    name: process ? preprocessors.reduce((acc, fn) => fn(acc), name) : name,
  };
}
