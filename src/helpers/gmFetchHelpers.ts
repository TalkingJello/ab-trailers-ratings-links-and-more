export function gmFetch(
  opts: GM.Request,
  data: any = null,
  timeout = 10000
): Promise<GM.Response<any>> {
  return new Promise((resolve, reject) => {
    const headers = { ...opts.headers };
    if (data) {
      headers["Content-Type"] = "application/json";
    }

    GM_xmlhttpRequest({
      ...opts,
      timeout,
      data: data ? JSON.stringify(data) : null,
      headers,
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
  data: any = null,
  timeout?: number
): Promise<any> {
  const res = await gmFetch(opts, data, timeout);
  return JSON.parse(res.responseText);
}
