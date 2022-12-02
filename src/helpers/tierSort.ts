export type SortTier<T> = (sortee: T) => boolean;

export function tierSort<T>(
  sortees: T[],
  tiers: SortTier<T>[],
  manualScore?: (a: T, b: T) => number
): T[] {
  const out = [...sortees];
  out.sort((a, b) => {
    let s = 0;

    for (const fn of tiers) {
      if (s !== 0) {
        break;
      }

      if (fn(a)) {
        s -= 1;
      }
      if (fn(b)) {
        s += 1;
      }
    }

    if (manualScore) {
      s += manualScore(a, b);
    }

    return s;
  });

  return out;
}
