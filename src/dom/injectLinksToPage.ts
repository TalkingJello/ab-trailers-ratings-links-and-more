import { settings } from "../delicious";
import { MetadataProvider } from "../providers/MetadataProvider";

export async function injectLinksToPage(providers: MetadataProvider[]) {
  const links = $("#content > div.thin > h3");
  if (settings.linksInNewTab) {
    links.find("a").attr("target", "_blank");
  }

  if (settings.jumpToTorrentsLink) {
    const jumpToTorrents = $(
      `<h3 style="text-decoration: underline; margin-top: -3px;">
<a href="javascript:void(0);">Jump to Torrents ➥</a>
</h3>`
    );
    jumpToTorrents.click(() => {
      $(".torrent_table")[0].scrollIntoView();
    });
    links.after(jumpToTorrents);
  }

  const res = await Promise.allSettled(providers.map((p) => p.getLink()));
  res.forEach((r) => {
    if (r.status === "rejected") {
      // TODO: Handle error
      console.error("Failed to get link from provider", r.reason);
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
