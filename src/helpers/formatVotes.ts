const formatter = Intl.NumberFormat("en", { notation: "compact" });

export function displayVotes(votes: number) {
  const formatted =
    votes < 10000 ? votes.toLocaleString() : formatter.format(votes);
  const title = votes < 10000 ? "" : votes.toLocaleString();

  return `<i title="${title}">${formatted}</i>`;
}
