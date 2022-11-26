import { log } from "./log";

export function throttle(key: string, ms: number) {
  return new Promise<void>((resolve) => {
    const lastUsage = GM_getValue(`throttle_${key}`, 0);
    const now = Date.now();

    if (typeof lastUsage !== "number" || now > lastUsage + ms) {
      GM_setValue(`throttle_${key}`, now);
      resolve();
      return;
    }

    log(`Throttling ${key}, time to wait: ${lastUsage + ms - now}ms`);
    setTimeout(() => {
      resolve(throttle(key, ms));
    }, lastUsage + ms - now);
  });
}

export function setThrottleUse(key: string) {
  GM_setValue(`throttle_${key}`, Date.now());
}
