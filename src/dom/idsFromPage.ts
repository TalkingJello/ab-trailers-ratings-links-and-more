const links = $("#content > div.thin > h3");

export function aniDbIdFromPage(): string | false {
  const found = links.find('a[href^="https://anidb.net/anime/"]');

  if (found.length !== 1) {
    return false;
  }

  return found.attr("href").split("/").pop();
}

export function malIdFromPage(): string | false {
  const found = links.find('a[href^="https://myanimelist.net/anime/"]');

  if (found.length !== 1) {
    return false;
  }

  return found.attr("href").match(/\/anime\/(\d+)/)?.[1] ?? false;
}
