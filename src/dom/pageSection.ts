import { site } from "../helpers/site";

function abPageSection(name: string) {
  const container = $(
    `<div class="box"><div class="head"><strong>${name}</strong></div><div class="body" style="display: flex; justify-content: center;"></div>`
  );
  const errSpan = $('<span style="color:red; display: none;"></span>');
  container.append(errSpan);

  const setError = (m: string) => {
    errSpan.show();
    errSpan.text(m);
  };

  const resetError = () => {
    errSpan.hide();
    errSpan.text("");
  };

  return {
    setError,
    resetError,
    container,
    head: container.find(".head"),
    body: container.find(".body"),
  };
}

function moePageSection(name: string) {
  const container = $("<div></div>");
  const head = $(
    `<div style="display: flex; align-items: baseline;"><h6 class="text-muted text-uppercase mt-2 mb-3">${name}</h6></div>`
  );
  const card = $(
    `<div class="card"><div class="card-body bg-soft-dark" style="display: flex; justify-content: center;"></div></div>`
  );
  const body = card.find(".card-body:first-child");
  container.append(head);
  container.append(card);

  const errSpan = $('<span style="color:red; display: none;"></span>');
  container.append(errSpan);

  const setError = (m: string) => {
    errSpan.show();
    errSpan.text(m);
  };

  const resetError = () => {
    errSpan.hide();
    errSpan.text("");
  };

  return {
    setError,
    resetError,
    container,
    head,
    body,
  };
}

export function pageSection(name: string) {
  if (site.ab) {
    return abPageSection(name);
  } else {
    return moePageSection(name);
  }
}
