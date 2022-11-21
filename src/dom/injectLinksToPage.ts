import { settings } from "../delicious";
import { MetadataProvider } from "../providers/MetadataProvider";

export async function injectLinksToPage(providers: MetadataProvider[]) {
  const links = $("#content > div.thin > h3");
  if (settings.linksInNewTab) {
    links.find("a").attr("target", "_blank");
  }

  const res = await Promise.allSettled(providers.map((p) => p.getLink()));
  res.forEach((r) => {
    if (r.status === "rejected") {
      // TODO: Handle error
      return;
    }

    const link = r.value;
    if (!link) {
      return;
    }
    links.append(
      " | ",
      `<a href="${link.url}" target="${
        settings.linksInNewTab ? "_blank" : ""
      }">${link.name}</a>`
    );
  });
}
