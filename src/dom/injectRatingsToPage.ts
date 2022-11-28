import { settings } from "../delicious";
import {
  MetadataProvider,
  Score,
  WithProvider,
} from "../providers/MetadataProvider";
import { injectAnimeBytesRating } from "./animeBytesRating";
import { injectAverageRating } from "./averageRating";
import { pageSection } from "./pageSection";

export async function injectRatingsToPage(providers: MetadataProvider[]) {
  const res = await Promise.allSettled(
    providers.map(async (provider): Promise<WithProvider<Score> | false> => {
      const score = await provider.getScore();
      if (score) {
        return {
          provider,
          ...score,
        };
      }
      return false;
    })
  );

  const valid: WithProvider<Score>[] = [];
  res.forEach((r) => {
    if (r.status === "rejected") {
      // @TODO: Handle error
      console.error("Failed to get score from provider", r.reason);
      return;
    }

    if (r.value !== false) {
      valid.push(r.value);
    }
  });
  if (valid.length === 0) {
    return;
  }

  // General layout
  $("#rating").hide();
  const synopsis = $('.box > .head > strong:contains("Plot Synopsis")')
    .parent()
    .parent();
  const { container, body } = pageSection("Ratings");
  body.css("gap", "18px");
  body.css("flex-wrap", "wrap");
  body.css("align-items", "start");
  synopsis.after(container);

  // load providers ratings
  valid.forEach((score) => {
    score.provider.insertScore(body, score);
  });

  // AnimeBytes rating
  injectAnimeBytesRating(body);
  // Average rating
  if (settings.showAverageRating) {
    injectAverageRating(valid, body);
  }
}
