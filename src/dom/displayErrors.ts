import { AUTHOR } from "../constants";
import { pageSection } from "./pageSection";

export const errorsSection = pageSection("Errors");
const { container, body } = errorsSection;
container.hide();
body.css("display", "block");
const notice = $(`<h4 style="
    color: #cdb25c;
    border-top: 1px solid gray;
    padding-top: 4px;
    margin-top: 4px;
">
Try refreshing the page.
If the errors persist,
and you believe it's an issue with the script,
please report to ${AUTHOR}
</h4>`).appendTo(body);

let num = 1;
export function uiShowError(title: string, subtitle: string, err: Error) {
  const errorDiv = $(`<div></div>`).insertBefore(notice);
  const titleElem = $(
    `<h4 style="color: indianred;">${num}. ${title} </h4>`
  ).appendTo(errorDiv);
  const toggle = $(`<span style="cursor: pointer;">[Expand]</span>`).appendTo(
    titleElem
  );
  $(`<h4 style="color: #cd7c5c; margin-left: 17px;">${subtitle}</h4>`).appendTo(
    errorDiv
  );
  const stack = $(`<pre style="margin-left: 17px;"></pre>`)
    .hide()
    .text(err.stack)
    .appendTo(errorDiv);

  toggle.click(() => {
    if (toggle.text() === "[Expand]") {
      toggle.text("[Collapse]");
      stack.slideDown(200);
    } else {
      toggle.text("[Expand]");
      stack.slideUp(200);
    }
  });

  num++;
  container.show();
}

// @ts-expect-error
unsafeWindow.uiShowError = uiShowError;
