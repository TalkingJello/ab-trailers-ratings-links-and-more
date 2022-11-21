export function pageSection(name: string) {
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
