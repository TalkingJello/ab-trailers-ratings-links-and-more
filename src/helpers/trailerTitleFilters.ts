export function dubbedInTitle(title: string) {
  return /\bdub(bed)?\b/i.test(title);
}

// It's really no harm if this false postives
// Since it's only used for sorting purposes
export function subbedInTitle(title: string) {
  return (
    title.toLowerCase().includes("sub") || title.toLowerCase().includes("eng")
  );
}

export function promotionalVideo(title: string) {
  return title.toLowerCase().includes("promotional video");
}

export function commercial(title: string) {
  return title.toLowerCase().includes("commercial");
}

export function teaser(title: string) {
  return title.toLowerCase().includes("teaser");
}

export function announcement(title: string) {
  return title.toLowerCase().includes("announcement");
}
