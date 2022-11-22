import { UNIQUE } from "../constants";

export function injectAnimeBytesRating(parent: JQuery<HTMLElement>) {
  const container = $(`<div
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
          >
          </div>
      </div>
  `);

  // Image
  const scale = container.find(`.${UNIQUE}-scale-on-hover`);
  scale.append(
    `<img src="https://mei.animebytes.tv/Ok3xQjqTaoN.png" style="width: 66px; height: 66px;" />`
  );

  // Star rating
  const textContainer = container.find(`.${UNIQUE}-rating-text-div`);
  [
    $("#rating > #container_star"),
    $("#rating > #message"),
    $("#rating > #rating_stats"),
  ].forEach((e) => {
    e.detach();
    e.appendTo(textContainer);
  });
  parent.append(container);
}
