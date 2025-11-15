import { moeGetAnimeMetadata } from "../helpers/moeGetAnimeMetadata";
import { site } from "../helpers/site";

const links = $("#content > div.thin > h3");

export function abAniDbIdFromPage(): string | false {
  const found = links.find('a[href^="https://anidb.net/anime/"]');

  if (found.length !== 1) {
    return false;
  }

  return found.attr("href").split("/").pop();
}

export function malIdFromPage(): string | false {
  let found = "";
  if (site.ab) {
    const link = links.find('a[href^="https://myanimelist.net/anime/"]');

    if (link.length !== 1) {
      return false;
    }

    found = link.attr("href");
  }

  if (site.moe) {
    found = moeGetAnimeMetadata("MyAnimeList");
  }

  if (!found) return false;
  return found.match(/\/anime\/(\d+)/)?.[1] ?? false;
}
