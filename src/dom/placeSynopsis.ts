import { settings } from "../delicious";

export function placeSynopsis() {
  if (!settings.itemsOnTop) {
    return;
  }

  const synopsis = $('.box > .head > strong:contains("Plot Synopsis")')
    .parent()
    .parent();
  synopsis.detach();
  $("#content > div.thin > div.main_column").prepend(synopsis);
}
