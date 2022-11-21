import { TmdbMediaType } from "../providers/TmdbProvider";

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
    name,
  };
}
