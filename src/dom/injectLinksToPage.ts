import { MetadataProvider } from "../providers/MetadataProvider";

export function injectLinksToPage(providers: MetadataProvider[]) {
  const links = $("#content > div.thin > h3");

  providers.forEach((p) => {
    const link = p.getLink();
    if (!link) {
      return;
    }
    links.append(
      " | ",
      `<a href="${link.url}" target="_blank">${link.name}</a>`
    );
  });
}
