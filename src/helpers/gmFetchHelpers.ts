export function gmFetch(
  opts: GM.Request,
  timeout = 10000
): Promise<GM.Response<any>> {
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
        resolve(response);
      },
    });
  });
}

export async function gmFetchJson(
  opts: GM.Request,
  timeout = 10000
): Promise<any> {
  const res = await gmFetch(opts, timeout);
  return JSON.parse(res.responseText);
}
