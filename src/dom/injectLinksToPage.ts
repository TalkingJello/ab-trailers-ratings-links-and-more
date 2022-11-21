import { MetadataProvider } from "../providers/MetadataProvider";

export async function injectLinksToPage(providers: MetadataProvider[]) {
  const res = await Promise.allSettled(providers.map((p) => p.getLink()));

  const links = $("#content > div.thin > h3");
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
      `<a href="${link.url}" target="_blank">${link.name}</a>`
    );
  });
}
