import { settings } from "../delicious";
import { OutLink } from "../providers/MetadataProvider";

export function abInjectLinksToPage(outLinks: OutLink[]) {
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

  outLinks.forEach((link) => {
    links.append(
      " | ",
      `<a href="${link.url}" target="${
        settings.linksInNewTab ? "_blank" : ""
      }">${link.name}</a>`
    );
  });
}

export function moeInjectLinksToPage(outLinks: OutLink[]) {
  const card = $(
    `#layout-wrapper div.row > div:first-child > div.card:nth-child(3) > div.card-body`
  );

  outLinks.forEach((link) => {
    const span = $(`<span class="fw-semibold">${link.name}</span>`);
    const p = $(`
      <p class="font-size-13 mb-2">
        <a href="${link.url}" target="${
      settings.linksInNewTab ? "_blank" : ""
    }">${link.url}</a>
      </p>
    `);
    card.append(span);
    card.append(p);
  });
}
