import { MetadataProvider } from "../providers/MetadataProvider";
import { pageSection } from "./pageSection";

export function injectRatingsToPage(providers: MetadataProvider[]) {
  // General layout
  const synopsis = $('.box > .head > strong:contains("Plot Synopsis")')
    .parent()
    .parent();
  const { container, body } = pageSection("Ratings");
  synopsis.after(container);

  providers.forEach((p) => {
    p.insertScore(body);
  });
}
