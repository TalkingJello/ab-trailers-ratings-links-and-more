export function moeGetAnimeMetadata(prop: string) {
  return $(
    `#layout-wrapper div.row > div:first-child > div.card:nth-child(3) > div.card-body > span:contains("${prop}")`
  )
    .next()
    .text();
}
