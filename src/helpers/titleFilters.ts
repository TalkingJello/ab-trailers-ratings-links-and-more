export function isDubbed(title: string) {
  return /\bdub(bed)?\b/i.test(title);
}

// It's really no harm if this false postives
// Since it's only used for sorting purposes
export function isSubbed(title: string) {
  return (
    title.toLowerCase().includes("sub") || title.toLowerCase().includes("eng")
  );
}
