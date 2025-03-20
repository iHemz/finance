export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

type FetchType = {
  url: string;
  method?: string;
  body?: object;
  headers?: object;
  isStream?: boolean;
  skipAuth?: boolean;
  cache?: RequestCache;
};

async function doFetch<Type>({
  url,
  method,
  body,
  headers = {},
  isStream,
  cache = "default",
}: FetchType): Promise<Type | ReadableStream<Uint8Array> | null> {
  return new Promise(async (resolve, reject) => {
    let response = null;
    try {
      const isFormData = body instanceof FormData;
      let contentType;
      if (isStream) {
        contentType = "application/octet-stream";
      } else if (!isFormData) {
        contentType = "application/json";
      }
      response = await fetch(`${baseURL}${url}`, {
        method,
        cache,
        headers: {
          ...(contentType ? { "Content-Type": contentType } : {}),
          ...headers,
        },
        ...(body ? { body: isFormData ? body : JSON.stringify(body) } : {}),
      });

      if (isStream) {
        if (!response.status.toString().startsWith("20")) {
          reject(response.statusText);
        } else {
          resolve(response.body);
        }
        return;
      }

      let json;

      if (method !== "DELETE") {
        try {
          json = await response.json();
        } catch (error) {
          if (error instanceof SyntaxError) {
            console.error("There was a SyntaxError", error);
          } else {
            console.error("There was an error", error);
          }
        }
      }

      if (!response.status.toString().startsWith("20")) {
        reject(json?.message ?? "Something went wrong");
      } else {
        resolve(json);
      }
    } catch (error) {
      console.error("There was an error", error);
      reject(error);
    }
  });
}

export async function get<Type>(
  url: FetchType["url"],
  headers?: object,
  cache?: RequestCache,
  isStream?: boolean
): Promise<Type | ReadableStream<Uint8Array> | null> {
  return doFetch<Type | ReadableStream<Uint8Array> | null>({
    url,
    method: "GET",
    headers,
    isStream,
    cache,
  });
}
