import { settings } from "../delicious";

export function abPlaceSynopsis() {
  if (!settings.itemsOnTop) {
    return;
  }

  const synopsis = $('.box > .head > strong:contains("Plot Synopsis")')
    .parent()
    .parent();
  synopsis.detach();
  $("#content > div.thin > div.main_column").prepend(synopsis);
}

export function moePlaceSynopsis() {
  if (!settings.itemsOnTop) {
    return;
  }

  const synopsisTitle = $(
    `#layout-wrapper div.row > div:last-child > h6:contains("Synopsis")`
  );
  const synopsisCard = synopsisTitle.next();
  synopsisTitle.detach();
  synopsisCard.detach();

  const mainColumn = $("#layout-wrapper div.row > div:last-child");
  mainColumn.prepend(synopsisCard);
  mainColumn.prepend(synopsisTitle);
}
