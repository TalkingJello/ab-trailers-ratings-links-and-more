declare module "*.less";

// declare var unsafeWindow: Window;
declare function GM_addStyle(style: string): void;
declare function GM_addElement(
  parent: HTMLElement,
  tag: string,
  attrs?: Record<string, string | number | boolean>
): HTMLElement;
declare function GM_addElement(
  tag: string,
  attrs?: Record<string, string | number | boolean>
): HTMLElement;
declare function GM_getValue(key: string, defaultValue?: any): any;
declare function GM_setValue(key: string, value: any): void;
declare function GM_deleteValue(key: string): void;
declare function GM_listValues(): string[];

/**
 * Performs a similar function to the standard XMLHttpRequest object, but
 * allows these requests to cross the [same origin policy]{@link https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy} boundaries.
 * @see {@link https://wiki.greasespot.net/GM.xmlHttpRequest}
 */
declare function GM_xmlhttpRequest(details: GM.Request): void;

declare var delicious: any;
