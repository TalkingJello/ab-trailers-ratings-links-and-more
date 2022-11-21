import { CACHE_TIME } from "../constants";
import { log } from "./log";

export function checkCache(id: string, time = CACHE_TIME) {
  const lastUpdate = GM_getValue(`cache_last_update_${id}`);
  if (typeof lastUpdate !== "number" || Date.now() > lastUpdate + time) {
    return;
  }

  const cached = GM_getValue(`cache_map_${id}`);
  if (typeof cached === undefined) {
    return;
  }

  log(`cache hit for ${id}`);
  return cached;
}

export function saveCache(id: string, val: any) {
  GM_setValue(`cache_map_${id}`, val);
  GM_setValue(`cache_last_update_${id}`, Date.now());
}

export function clearCache() {
  GM_listValues()
    .filter((v) => v.startsWith("cache_"))
    .forEach((name) => GM_deleteValue(name));
}
// @ts-expect-error
unsafeWindow.CLEAR_CACHE = clearCache;
