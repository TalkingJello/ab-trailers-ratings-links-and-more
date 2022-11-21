import { MetadataProvider, Score } from "../providers/MetadataProvider";
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

  // General layout
  const synopsis = $('.box > .head > strong:contains("Plot Synopsis")')
    .parent()
    .parent();
  const { container, body } = pageSection("Ratings");
  body.css("gap", "18px");
  synopsis.after(container);

  res.forEach((r) => {
    if (r.status === "rejected") {
      // TODO: Handle error
      return;
    }

    const [provider, score] = r.value;
    if (!score) {
      return;
    }
    provider.insertScore(body, score);
  });
}
