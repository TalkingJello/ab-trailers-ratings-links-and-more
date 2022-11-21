import { NAME } from "./constants";
import { log } from "./helpers/log";

export function insertDeliciousSettingsUi() {
  if (!delicious.settings.ensureSettingsInserted()) {
    return;
  }

  var section = delicious.settings.createCollapsibleSection(NAME);
  var s = section.querySelector(".settings_section_body");

  delicious.settings.init("TrailerAudioLanguage", "any");
  s.appendChild(
    delicious.settings.createDropDown(
      "preferredTrailerAudioLanguage",
      "Preferred Trailer Audio Language",
      "All found trailers will be available regardless for selection. Language is not guarneteed to be detected properly, depends on the TMDB title of the trailer.",
      [
        ["Any", "any"],
        ["Prefer Dubbed", "dubbed"],
        ["Disprefer Dubbed", "not-dubbed"],
      ],
      { default: "any" }
    )
  );

  delicious.settings.init("itemsOnTop", false);
  s.appendChild(
    delicious.settings.createCheckbox(
      "itemsOnTop",
      "Items On Top",
      "Place the script items (trailer and ratings), alongside the `Plot Synopsis`, on the top of the page, before the torrent list"
    )
  );

  delicious.settings.init("trailerAfterSynopsis", false);
  s.appendChild(
    delicious.settings.createCheckbox(
      "trailerAfterSynopsis",
      "Trailer After Synopsis",
      "Insert trailer after `Plot Synopsis` instead of before"
    )
  );

  delicious.settings.insertSection(section);
}

export const settings = {
  preferredTrailerAudioLanguage: JSON.parse(
    GM_getValue("preferredTrailerAudioLanguage", '"any"')
  ),
  itemsOnTop: JSON.parse(GM_getValue("itemsOnTop", "false")),
  trailerAfterSynopsis: JSON.parse(
    GM_getValue("trailerAfterSynopsis", "false")
  ),
};
log("settings", settings);
