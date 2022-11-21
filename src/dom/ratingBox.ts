import { UNIQUE } from "../constants";

export function ratingBox(title: string, votes: number, link: string) {
  const container = $(`<div
      style="
          background: 0 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          height: 68px;
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
          <span style="color: gray;font-size: 12.5px;"><i>${votes}</i> votes</span>
          </div>
      </div>
  `);

  const scale = container.find(`.${UNIQUE}-scale-on-hover`);

  return { container, scale };
}
