export function gmFetchJson(opts: GM.Request, timeout = 10000): Promise<any> {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      ...opts,
      timeout,
      ontimeout: function () {
        reject(new Error(`Request timed out after ${timeout}ms`));
      },
      onerror: function (err) {
        reject(err ? err : new Error("Failed to fetch"));
      },
      onload: function (response) {
        console.log("onload", response);
        resolve(JSON.parse(response.responseText));
      },
    });
  });
}
