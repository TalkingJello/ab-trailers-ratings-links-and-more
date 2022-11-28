import { TmdbMediaType } from "../providers/TmdbProvider";

type Preprocessor = (title: string) => string;

const preprocessors: Preprocessor[] = [
  // Remove part number
  (title) => title.replace(/Part \d+/i, ""),
  // Remove season number
  (title) => title.replace(/Season \d+/i, ""),
  // Trim
  (title) => title.trim(),
  // Lowercase (so cache hits in case of different casing)
  (title) => title.toLowerCase(),
];

export function tmdbQueryFromPage() {
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
    name: preprocessors.reduce((acc, fn) => fn(acc), name),
  };
}
