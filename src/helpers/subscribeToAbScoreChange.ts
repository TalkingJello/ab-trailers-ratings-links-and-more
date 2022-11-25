import { Score } from "../providers/MetadataProvider";
import { log } from "./log";

function abScoreFromPage(): [Score, number, string] {
  let myRating = 0;
  const match = $("#message")
    .text()
    .match(/^My vote: (\d+)$/);
  const deleteHref = $("#rating_stats > a").attr("href");
  log("deleteHref", deleteHref);
  if (
    match &&
    match[1] &&
    $("#message").css("display") !== "none" &&
    deleteHref &&
    deleteHref.startsWith("javascript:deleteVote")
  ) {
    myRating = parseInt(match[1]);
  }

  return [
    {
      rating: parseFloat($("#avg_rating").text()),
      votes: parseInt($("#num_rating").text()),
    },
    myRating,
    deleteHref,
  ];
}

let observer: MutationObserver;
let callbacks: ((score: Score, myScore: number, deleteHref: string) => void)[] =
  [];
let previousScore: false | [Score, number, string] = false;
export function subscribeToAbScoreChange(
  onUpdate: (score: Score, myScore: number, deleteHref: string) => void
) {
  callbacks.push(onUpdate);

  if (observer) {
    onUpdate(...abScoreFromPage());
    return;
  }

  observer = new MutationObserver(() => {
    const res = abScoreFromPage();

    if (
      previousScore &&
      res[0].rating === previousScore[0].rating &&
      res[0].votes === previousScore[0].votes &&
      res[1] === previousScore[1] &&
      res[2] === previousScore[2]
    ) {
      return;
    }

    previousScore = res;
    callbacks.forEach((cb) => cb(...res));
  });
  observer.observe($("#rating").get(0), {
    childList: true,
    attributes: false,
    characterData: false,
    subtree: false,
  });
  observer.observe($("#rating_stats").get(0), {
    childList: true,
    attributes: false,
    characterData: false,
    subtree: false,
  });
  observer.observe($("#container_star").get(0), {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false,
  });

  onUpdate(...abScoreFromPage());
}
