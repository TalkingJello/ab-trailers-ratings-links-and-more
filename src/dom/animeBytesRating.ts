import { UNIQUE } from "../constants";
import { displayVotes } from "../helpers/formatVotes";
import { log } from "../helpers/log";
import { subscribeToAbScoreChange } from "../helpers/subscribeToAbScoreChange";

export function injectAnimeBytesRating(parent: JQuery<HTMLElement>) {
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
    `<img src="https://mei.animebytes.tv/Ok3xQjqTaoN.png" style="width: 66px; height: 66px;" />`
  );

  // Rating
  const ratingContainer = container.find(`.${UNIQUE}-rating-text-div`);
  const rating = $(`<span></span>`).appendTo(ratingContainer);
  ratingContainer.append("<br>");
  // My rating
  const myRatingDiv = $(`<div></div>`).hide().appendTo(ratingContainer);
  const del = $(
    `<a href="#" style="position: relative; top: 3px;"><svg style="width: 16px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fe2a73">
    <title>Remove Rating</title>
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg></a>`
  ).appendTo(myRatingDiv);
  const myRating = $(`<span style="color: #fe2a73;"></span>`).appendTo(
    myRatingDiv
  );
  myRatingDiv.append(`<br>`);
  // Votes
  const votes = $(
    `<span style="color: gray;font-size: 12.5px;"></span>`
  ).appendTo(ratingContainer);
  // Stars
  $("#rating > #container_star")
    .css("padding", "0")
    .detach()
    .appendTo(container);

  // Append to page
  parent.append(container);

  setTimeout(
    () =>
      subscribeToAbScoreChange((score, myScore, deleteHref) => {
        log("Updating AnimeBytes rating", score, myScore, deleteHref);
        rating.text(`${score.rating === 0 ? "-" : score.rating} / 10`);
        votes.html(
          score.votes === 0
            ? "No votes yet.<br/>Rate this!"
            : `${displayVotes(score.votes)} votes`
        );

        if (myScore !== 0) {
          myRatingDiv.slideDown(500);
          myRating.text(`My Rating: ${myScore} / 10`);
          del.attr("href", deleteHref);

          // @ts-expect-error Tint stars
          const instance = $("#stars-wrapper").stars("instance");
          if (!instance) {
            return;
          }

          const defaultValue = parseInt(instance.options.defaultValue);
          // @ts-expect-error
          $("#stars-wrapper").stars("select", defaultValue);

          instance.$stars.each(function (i: number) {
            const current = i + 1;
            if (myScore < defaultValue && current <= myScore) {
              $(this).addClass(`${UNIQUE}-ui-stars-star-my`);
            } else if (
              myScore > defaultValue &&
              defaultValue < current &&
              current <= myScore
            ) {
              $(this).addClass(`${UNIQUE}-ui-stars-star-my`);
              $(this).addClass(`ui-stars-star-on`);
            } else {
              $(this).removeClass(`${UNIQUE}-ui-stars-star-my`);
            }
            $(this);
          });

          return;
        }

        myRatingDiv.slideUp(500);
        // @ts-expect-error
        const instance = $("#stars-wrapper").stars("instance");
        if (!instance) {
          return;
        }

        // @ts-expect-error
        $("#stars-wrapper").stars("select", instance.options.defaultValue);
        // @ts-expect-error
        $("#stars-wrapper").stars("enable");
        instance.$stars.removeClass(`${UNIQUE}-ui-stars-star-my`);
      }),
    1
  );
}
