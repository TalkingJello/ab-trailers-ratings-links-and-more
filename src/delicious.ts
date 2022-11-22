import { NAME } from "./constants";
import { clearCache } from "./helpers/cache";
import { log } from "./helpers/log";
import { MetadataProvider } from "./providers/MetadataProvider";

function deliciousSubHeading(s: HTMLElement, title: string) {
  const h3 = $(`<h3 style="
    margin-bottom: 2px;
    margin-top: 18px;
    font-size: 12px;
    margin-left: 20px;
    text-decoration: underline;">${title}</h3>`);

  $(s).append(h3);
}

export function insertDeliciousSettingsUi(providers: MetadataProvider[]) {
  if (!delicious.settings.ensureSettingsInserted()) {
    return;
  }

  var section = delicious.settings.createCollapsibleSection(NAME);
  var s = section.querySelector(".settings_section_body");

  // General
  deliciousSubHeading(s, "General");

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

  delicious.settings.init("linksInNewTab", true);
  s.appendChild(
    delicious.settings.createCheckbox(
      "linksInNewTab",
      "Open links in new tab",
      "Open external anime links in a new tab. Applies to all links, both the ones already present (AniDB and MAL for example), and the ones added by the script (such as TMDB and IMDb)."
    )
  );

  delicious.settings.init("itemsOnTop", true);
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

  // Provider specific
  providers.forEach((p) => {
    deliciousSubHeading(s, p.name);
    p.insertDeliciousSettings(s);
  });

  // Advanced
  deliciousSubHeading(s, "Advanced");
  const clearCacheButton = $(
    `<input type="button" style="margin-left: 20px;" value="Clear Cache"/>`
  );
  clearCacheButton.click(() => {
    clearCache();
  });
  $(s).append(clearCacheButton);

  delicious.settings.insertSection(section);
}

export const settings = {
  preferredTrailerAudioLanguage: JSON.parse(
    GM_getValue("preferredTrailerAudioLanguage", '"any"')
  ),
  itemsOnTop: JSON.parse(GM_getValue("itemsOnTop", "true")),
  trailerAfterSynopsis: JSON.parse(
    GM_getValue("trailerAfterSynopsis", "false")
  ),
  linksInNewTab: JSON.parse(GM_getValue("linksInNewTab", "true")),
};
log("settings", settings);
