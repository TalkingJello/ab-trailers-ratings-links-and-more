import { NAME } from "./constants";
import { clearCache } from "./helpers/cache";
import { log } from "./helpers/log";
import { MetadataProvider, ProviderFlags } from "./providers/MetadataProvider";

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

  delicious.settings.init("jumpToTorrentsLink", true);
  s.appendChild(
    delicious.settings.createCheckbox(
      "jumpToTorrentsLink",
      "Jump to Torrents Link",
      "Add a link after the external anime links, that will jump to the torrent list."
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

  delicious.settings.init("showAverageRating", true);
  s.appendChild(
    delicious.settings.createCheckbox(
      "showAverageRating",
      "Show Average Rating",
      "When pulling ratings from multiple providers, show the average rating widget."
    )
  );

  delicious.settings.init(`ab-${ProviderFlags.Score}-average-weight`, 1);
  s.appendChild(
    delicious.settings.createNumberInput(
      `ab-${ProviderFlags.Score}-average-weight`,
      "AB Rating Weight in Average",
      `The weight of the AnimeBytes rating in the average score widget. Can be set to 0 to not include AnimeBytes score in the average. 1 is the default.`,
      {
        default: "1",
        required: true,
      }
    )
  );

  // Provider specific
  providers.forEach((p) => {
    deliciousSubHeading(s, p.name);
    p.insertDeliciousSettings(s);
  });

  // Advanced
  deliciousSubHeading(s, "Advanced");
  // MediaInfo Improvements interactions
  $(s).append(
    `<p>If you are using <a href="https://animebytes.tv/forums.php?action=viewthread&threadid=27557" target="_blank"><i>MediaInfo Improvements</i> userscript</a> ,
and experience issues with the average rating widget wrapping to a new line on it's own...
(this happens because MediaInfo Improvements script makes the main torrent page section take more space)
Consider enabling <b>one</b> of the following options.
The right solution for you depends on your screen size, browser window size, and zoom level. Try them both out!
</p>`
  );

  delicious.settings.init("tryToNotWrapRatings", false);
  s.appendChild(
    delicious.settings.createCheckbox(
      "tryToNotWrapRatings",
      "Try to Avoid Ratings Wrap",
      `Reduces space between each rating source,
which should help avoid wrapping and keep all ratings in one big row.
Downside is that the ratings will be a bit more squished together
and that depending on your screen size and zoom level, the original issue can still occur.`
    )
  );
  delicious.settings.init("abAndAverageOnSeperateRow", false);
  s.appendChild(
    delicious.settings.createCheckbox(
      "abAndAverageOnSeperateRow",
      "AB and Average Scores on Seperate Row",
      `Puts the AnimeBytes and average score widgets on a seperate row from the other providers.
This in essence "forces" a wrap,
but in ensures they are wrapped together which looks better.
Downside is that you will have 2 rows of ratings instead of 1,
but the ratings will be more spaced out and there is no risk of still wrapping
like with the other option.`
    )
  );

  // Buttons
  deliciousSubHeading(s, "Funny Looking Buttons");
  const clearCacheButton = $(
    `<input type="button" style="margin-left: 20px;" value="Clear Cache"/>`
  );
  clearCacheButton.click(() => {
    clearCache();
    alert("Cache cleared!");
  });
  $(s).append(clearCacheButton);

  const resetSettingsButton = $(
    `<input type="button" style="margin-left: 20px;" value="Reset Settings"/>`
  );
  resetSettingsButton.click(() => {
    // confirm
    if (!confirm("Are you sure you want to reset all settings?")) {
      return;
    }

    GM_listValues()
      .filter((v) => !v.startsWith("cache_") && !v.endsWith("-api-key"))
      .forEach((name) => GM_deleteValue(name));

    window.location.reload();
  });
  $(s).append(resetSettingsButton);

  const resetApiKeysButton = $(
    `<input type="button" style="margin-left: 20px;" value="Reset API Keys"/>`
  );
  resetApiKeysButton.click(() => {
    // confirm
    if (!confirm("Are you sure you want to reset to the default API keys?")) {
      return;
    }

    GM_listValues()
      .filter((v) => v.endsWith("-api-key"))
      .forEach((name) => GM_deleteValue(name));

    window.location.reload();
  });
  $(s).append(resetApiKeysButton);

  delicious.settings.insertSection(section);
}

export const settings = {
  preferredTrailerAudioLanguage: JSON.parse(
    GM_getValue("preferredTrailerAudioLanguage", '"any"')
  ),
  itemsOnTop: JSON.parse(GM_getValue("itemsOnTop", "true")),
  jumpToTorrentsLink: JSON.parse(GM_getValue("jumpToTorrentsLink", "true")),
  trailerAfterSynopsis: JSON.parse(
    GM_getValue("trailerAfterSynopsis", "false")
  ),
  linksInNewTab: JSON.parse(GM_getValue("linksInNewTab", "true")),
  showAverageRating: JSON.parse(GM_getValue("showAverageRating", "true")),
  abScoreAverageWeight: JSON.parse(
    GM_getValue(`ab-${ProviderFlags.Score}-average-weight`, "1")
  ),
  tryToNotWrapRatings: JSON.parse(GM_getValue("tryToNotWrapRatings", "false")),
  abAndAverageOnSeperateRow: JSON.parse(
    GM_getValue("abAndAverageOnSeperateRow", "false")
  ),
};
log("settings", settings);
