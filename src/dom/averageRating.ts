import { UNIQUE } from "../constants";
import { subscribeToAbScoreChange } from "../helpers/subscribeToAbScoreChange";
import { MetadataProvider, Score } from "../providers/MetadataProvider";

export function injectAverageRating(
  scores: [MetadataProvider, Score][],
  parent: JQuery<HTMLElement>
) {
  const container = $(`<div style="
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
  "><div
      style="
          background: 0 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
      "
      >
<div
              class="${UNIQUE}-scale-on-hover"
              style="
                  width: 68px;
                  height: 68px;
                  display: inline-block;
                  transition: transform 0.2s;
                  transform: scale(1);
              "
          ></div>
          <div
              class="${UNIQUE}-rating-text-div"
              style="
                  font-weight: 700;
                  margin-left: 5px;
                  color: #fff;
                  line-height: 20px;
                  font-size: 13px;
              "
          ></div>
      </div>
  `);

  // Image
  const scale = container.find(`.${UNIQUE}-scale-on-hover`);
  scale.append(
    `<img src="https://mei.animebytes.tv/OopXDQfQ1vO.png" style="width: 62px; height: 62px; filter: grayscale(0.6);" />`
  );

  // Rating
  const ratingContainer = container.find(`.${UNIQUE}-rating-text-div`);
  const rating = $(`<span></span>`).appendTo(ratingContainer);
  ratingContainer.append("<br>");
  // Votes
  const votes = $(
    `<span style="color: gray;font-size: 12.5px;"></span>`
  ).appendTo(ratingContainer);

  // Append to page
  parent.append(container);

  setTimeout(
    () =>
      subscribeToAbScoreChange((abScore) => {
        const averageRating =
          scores.reduce(
            (acc, [_, score]) => acc + score.rating,
            abScore.rating
          ) /
          (scores.length + 1);
        const totalVotes = scores.reduce(
          (acc, [_, score]) => acc + score.votes,
          abScore.votes
        );

        rating.text(`Average: ${averageRating.toFixed(2)} / 10`);
        votes.html(
          `<i>${totalVotes.toLocaleString()}</i> total votes<br>from <i>${
            scores.length + 1
          }</i> sources`
        );
      }),
    1
  );
}
