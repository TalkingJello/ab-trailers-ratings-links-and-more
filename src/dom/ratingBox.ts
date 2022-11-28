import { UNIQUE } from "../constants";
import { displayVotes } from "../helpers/formatVotes";
import { Score } from "../providers/MetadataProvider";

export function ratingBox(title: string, subtitle: string, link: string) {
  const container = $(`<div
      style="
          background: 0 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
      "
      >
<a target="_blank" href="${link}" style="height: 68px; width: 68px;"><div
              class="${UNIQUE}-scale-on-hover"
              style="
                  width: 68px;
                  height: 68px;
                  display: inline-block;
                  transition: transform 0.2s;
                  transform: scale(1);
                  display: flex;
                  align-items: center;
                  justify-content: center;
              "
          ></div></a>
          <div
              style="
                  font-weight: 700;
                  margin-left: 5px;
                  color: #fff;
                  line-height: 20px;
                  font-size: 13px;
              "
          >
          ${title}
          <br>
          <span style="color: gray;font-size: 12.5px;">${subtitle}</span>
          </div>
      </div>
  `);

  const scale = container.find(`.${UNIQUE}-scale-on-hover`);

  return { container, scale };
}

export function ratingBoxFromScore(
  { rating, votes, breakdownLink, rank }: Score,
  img: string,
  imgSize: number
) {
  const box = ratingBox(
    `${rating} / 10`,
    `${displayVotes(votes)} votes`,
    breakdownLink
  );

  if (rank) {
    box.scale.attr("title", `Ranked #${rank}`);
  }

  const image = $(
    `<img src="${img}" style="width: ${imgSize}px; height: ${imgSize}px;" />`
  ).appendTo(box.scale);

  return {
    ...box,
    image,
  };
}
