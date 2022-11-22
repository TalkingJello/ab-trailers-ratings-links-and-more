import { MetadataProvider, Score } from "../providers/MetadataProvider";
import { injectAnimeBytesRating } from "./animeBytesRating";
import { pageSection } from "./pageSection";

export async function injectRatingsToPage(providers: MetadataProvider[]) {
  const res = await Promise.allSettled(
    providers.map(
      async (p): Promise<[MetadataProvider, Score | false]> => [
        p,
        await p.getScore(),
      ]
    )
  );

  const valid: [MetadataProvider, Score][] = [];
  res.forEach((r) => {
    if (r.status === "rejected") {
      // @TODO: Handle error
      return;
    }

    if (r.value[1] !== false) {
      valid.push(r.value as [MetadataProvider, Score]);
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
  synopsis.after(container);

  // load provider ratings
  valid.forEach(([provider, score]) => {
    provider.insertScore(body, score);
  });

  // AnimeBytes rating
  injectAnimeBytesRating(body);
}
