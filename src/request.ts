declare const Java: {
  type(
    path: string
  ): {
    new (...args: unknown[]): { [method: string]: (...args: unknown[]) => any };
    [staticMethod: string]: (...args: unknown[]) => any;
  };
};

export function request(opts: {
  url: string;
  method?: string;
  timeout?: number;
  connectTimeout?: number;
  readTimeout?: number;
  headers?: Record<string, string>;
  qs?: Record<string, string>;
  body?: any;
  form?: Record<string, string>;
  followRedirect?: boolean;
}) {
  const options = {
    method: "GET",
    timeout: 0,
    connectTimeout: opts.timeout ?? 0,
    readTimeout: opts.timeout ?? 0,
    headers: {},
    qs: {},
    followRedirect: true,
    ...opts,
  };
  return new Promise<{
    statusCode: number;
    // headers: Record<string, string>;
    body: string;
  }>((resolve, reject) => {
    var JURL = Java.type("java.net.URL");
    var JDataOutputStream = Java.type("java.io.DataOutputStream");
    var JURLEncoder = Java.type("java.net.URLEncoder");
    var JBufferedReader = Java.type("java.io.BufferedReader");
    var JInputStreamReader = Java.type("java.io.InputStreamReader");
    var JString = Java.type("java.lang.String");
    var JOutputStreamWriter = Java.type("java.io.OutputStreamWriter");

    function getQueryString(obj: Record<string, string>) {
      var queryString = "";

      Object.keys(obj).forEach((qs) => {
        queryString += `${JURLEncoder.encode(qs, "UTF-8")}=${JURLEncoder.encode(
          obj[qs],
          "UTF-8"
        )}&`;
      });

      return queryString.length > 0
        ? queryString.substr(0, queryString.length - 1)
        : queryString;
    }

    new Thread(() => {
      try {
        // Query strings
        var queryString = "?" + getQueryString(options.qs);

        if (queryString.length > 1) options.url += queryString;

        var url = new JURL(options.url);
        var conn = url.openConnection();
        conn.setRequestMethod(options.method);
        conn.setDoOutput(true);
        conn.setConnectTimeout(options.connectTimeout);
        conn.setReadTimeout(options.readTimeout);
        conn.setInstanceFollowRedirects(options.followRedirect);

        // Headers
        Object.keys(options.headers).forEach((header) =>
          conn.setRequestProperty(header, options.headers[header])
        );

        if (options.method === "POST") {
          if (typeof options.body === "object") {
            conn.setRequestProperty(
              "Content-Type",
              "application/json; charset=UTF-8"
            );
            var wr;

            try {
              wr = new JOutputStreamWriter(conn.getOutputStream());
              wr.write(JSON.stringify(options.body));
              wr.close();
            } finally {
              wr?.close();
            }
          } else if (typeof options.form === "object") {
            // Interpret as query params
            var params = getQueryString(options.form);
            var bytes = new JString(params).getBytes("UTF-8");
            conn.setRequestProperty(
              "Content-Type",
              "application/x-www-form-urlencoded"
            );
            conn.setRequestProperty("Content-Length", bytes.length.toString());
            var wr;

            try {
              wr = new JDataOutputStream(conn.getOutputStream());
              wr.write(bytes);
            } finally {
              wr?.close();
            }
          }
        }

        // Get output
        var status = conn.getResponseCode();
        var content = "";
        var stream = conn[status > 299 ? "getErrorStream" : "getInputStream"]();

        var reader = new JBufferedReader(new JInputStreamReader(stream));

        while (true) {
          var inputLine = reader.readLine();
          if (!inputLine) break;
          content += inputLine;
        }

        reader.close();
        conn.disconnect();

        // if (status > 299) {
        //   reject(content);
        // } else {
        // var headers: Record<string, string> = {};
        // var headerFields = conn.getHeaderFields();
        // ChatLib.chat(headerFields.keySet().toString());
        // var it = headerFields.keySet().iterator();

        // while (it.hasNext()) {
        //   var key = it.next();
        //   headers[key] = headerFields.get(key)[0];
        // }

        resolve({
          statusCode: status,
          // headers,
          body: content,
        });
        // }
      } catch (e) {
        reject(e);
      }
    }).start();
  });
}
