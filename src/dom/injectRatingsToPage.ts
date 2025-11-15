import { settings } from "../delicious";
import { Score, WithProvider } from "../providers/MetadataProvider";
import { injectAnimeBytesRating } from "./animeBytesRating";
import { injectAverageRating } from "./averageRating";
import { pageSection } from "./pageSection";

export function abInjectRatingsToPage(scores: WithProvider<Score>[]) {
  if (scores.length === 0) {
    return;
  }

  // General layout
  $("#rating").hide();
  const synopsis = $('.box > .head > strong:contains("Plot Synopsis")')
    .parent()
    .parent();
  const { container, body } = pageSection("Ratings");
  synopsis.after(container);
  body.css("gap", "18px");
  body.css("flex-wrap", "wrap");
  body.css("align-items", "start");

  if (settings.tryToNotWrapRatings) {
    body.css("justify-content", "space-evenly");
    body.css("padding", "10px 0");
    body.css("gap", "18px 0");
  }

  // load providers ratings
  scores.forEach((score) => {
    score.provider.insertScore(body, score);
  });

  // Optional forced second row
  const secondRatingRow = $(
    `<div class="body" style="display: flex; justify-content: center;"></div>`
  ).appendTo(container);
  secondRatingRow.css("gap", "18px");
  secondRatingRow.css("flex-wrap", "wrap");
  secondRatingRow.css("align-items", "start");
  const injectTarget = settings.abAndAverageOnSeperateRow
    ? secondRatingRow
    : body;
  if (settings.abAndAverageOnSeperateRow) {
    body.after(secondRatingRow);
  }

  // AnimeBytes rating
  injectAnimeBytesRating(injectTarget);
  // Average rating
  if (settings.showAverageRating) {
    injectAverageRating(scores, injectTarget);
  }
}

export function moeInjectRatingsToPage(scores: WithProvider<Score>[]) {
  if (scores.length === 0) {
    return;
  }

  // General layout
  const synopsisTitle = $(
    `#layout-wrapper div.row > div:last-child > h6:contains("Synopsis")`
  );
  const synopsisCard = synopsisTitle.next();

  const { container, body } = pageSection("Ratings");
  synopsisCard.after(container);
  body.css("gap", "18px");
  body.css("flex-wrap", "wrap");
  body.css("align-items", "start");

  if (settings.tryToNotWrapRatings) {
    body.css("justify-content", "space-evenly");
    body.css("padding", "10px 0");
    body.css("gap", "18px 0");
  }

  // load providers ratings
  scores.forEach((score) => {
    score.provider.insertScore(body, score);
  });

  // Average rating
  if (settings.showAverageRating) {
    injectAverageRating(scores, body);
  }
}
