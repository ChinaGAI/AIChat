import { API_PREFIX, PUBLIC_API_PREFIX } from "@/config";
import { isNull, isUndefined, omit, pick } from "lodash";
import { getUserToken } from "../storage";
import { useGlobalStore } from "@/stores";
const TIME_OUT = 100000;

const ContentType = {
  json: "application/json",
  stream: "text/event-stream",
  form: "application/x-www-form-urlencoded; charset=UTF-8",
  download: "application/octet-stream", // for download
  upload: "multipart/form-data", // for upload
};

const baseOptions = {
  method: "GET",
  mode: "cors",
  credentials: "omit",
  headers: new Headers({
    "Content-Type": ContentType.json,
  }),
  redirect: "follow",
};

export type IOnDataMoreInfo = {
  conversationId?: string;
  taskId?: string;
  messageId: string;
  errorMessage?: string;
  errorCode?: string;
};

export type IOnData = (
  message: string,
  isFirstMessage: boolean,
  moreInfo: IOnDataMoreInfo
) => void;
export type IOnCompleted = (hasError?: boolean) => void;
export type IOnError = (msg: string, code?: string) => void;

type IOtherOptions = {
  isPublicAPI?: boolean;
  bodyStringify?: boolean;
  needAllResponseContent?: boolean;
  deleteContentType?: boolean;
  onData?: IOnData; // for stream
  onError?: IOnError;
  onCompleted?: IOnCompleted; // for stream
  getAbortController?: (abortController: AbortController) => void;
};

type ResponseData = {
  code: number;
  message?: string;
  data?: any;
};

type FetchOptionType = Omit<RequestInit, "body"> & {
  cache?: boolean;
  params?: Record<string, any>;
  body?: BodyInit | Record<string, any> | null;
};

function unicodeToChar(text: string) {
  if (!text) return "";

  return text.replace(/\\u[0-9a-f]{4}/g, (_match, p1) => {
    return String.fromCharCode(parseInt(p1, 16));
  });
}

export function format(text: string) {
  let res = text.trim();
  if (res.startsWith("\n")) res = res.replace("\n", "");

  return res.replaceAll("\n", "<br/>").replaceAll("```", "");
}

const baseFetch = <T extends ResponseData>(
  url: string,
  fetchOptions: FetchOptionType,
  {
    isPublicAPI = false,
    bodyStringify = true,
    needAllResponseContent,
    deleteContentType,
    getAbortController,
  }: IOtherOptions
): Promise<T["data"]> => {
  const options: typeof baseOptions & FetchOptionType = Object.assign(
    {},
    baseOptions,
    omit(fetchOptions, ["headers", "cache"])
  );
  const cache = fetchOptions.cache;
  const cacheKey =
    url + JSON.stringify(pick(options, ["body", "params", "method"]));
  if (getAbortController) {
    const abortController = new AbortController();
    getAbortController(abortController);
    options.signal = abortController.signal;
  }

  const accessToken = getUserToken();
  options.headers.set("Authorization", `Bearer ${accessToken}`);

  if (deleteContentType) {
    options.headers.delete("Content-Type");
  } else {
    const contentType = options.headers.get("Content-Type");
    if (!contentType) options.headers.set("Content-Type", ContentType.json);
  }

  const urlPrefix = isPublicAPI ? PUBLIC_API_PREFIX : API_PREFIX;
  let urlWithPrefix = `${urlPrefix}${url.startsWith("/") ? url : `/${url}`}`;

  const { method, params, body } = options;
  // handle query
  if (method === "GET" && params) {
    const paramsArray: string[] = [];
    Object.keys(params).forEach(
      (key) =>
        !isUndefined(params[key]) &&
        !isNull(params[key]) &&
        paramsArray.push(`${key}=${encodeURIComponent(params[key])}`)
    );
    if (urlWithPrefix.search(/\?/) === -1)
      urlWithPrefix += `?${paramsArray.join("&")}`;
    else urlWithPrefix += `&${paramsArray.join("&")}`;

    delete options.params;
  }

  if (body && bodyStringify && !deleteContentType)
    options.body = JSON.stringify(body);

  // Handle timeout
  return Promise.race([
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("request timeout"));
      }, TIME_OUT);
    }),
    new Promise((resolve, reject) => {
      if (cache) {
        const result = useGlobalStore.getState().getRequestCache(cacheKey);
        if (result) resolve(result);
      }
      globalThis
        .fetch(urlWithPrefix, options as RequestInit)
        .then((response) => {
          const resClone = response.clone();
          // Error handler
          if (!/^(2|3)\d{2}$/.test(String(response.status))) {
            return Promise.reject(resClone);
          }

          const bodyJson = response.json();
          bodyJson
            .then((data: T) => {
              if (data.code !== 200 && data.code !== 0) {
                reject(data);
              } else {
                const result = needAllResponseContent ? resClone : data.data;
                if (cache) {
                  useGlobalStore.getState().setRequestCache(cacheKey, result);
                }
                resolve(result);
              }
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          if (err?.status === 401) useGlobalStore.getState().logout();
          reject(err);
        });
    }),
  ]) as Promise<T>;
};

// base request
const request = <T extends ResponseData>(
  url: string,
  options = {},
  otherOptions?: IOtherOptions
) => {
  return baseFetch<T>(url, options, otherOptions || {});
};

// request methods
export const get = <T extends ResponseData>(
  url: string,
  options = {},
  otherOptions?: IOtherOptions
) => {
  return request<T>(
    url,
    Object.assign({}, options, { method: "GET" }),
    otherOptions
  );
};

// For public API
export const getPublic = <T extends ResponseData>(
  url: string,
  options = {},
  otherOptions?: IOtherOptions
) => {
  return get<T>(url, options, { ...otherOptions, isPublicAPI: true });
};

export const post = <T extends ResponseData>(
  url: string,
  options = {},
  otherOptions?: IOtherOptions
) => {
  return request<T>(
    url,
    Object.assign({}, options, { method: "POST" }),
    otherOptions
  );
};

export const postPublic = <T extends ResponseData>(
  url: string,
  options = {},
  otherOptions?: IOtherOptions
) => {
  return post<T>(url, options, { ...otherOptions, isPublicAPI: true });
};

export const put = <T extends ResponseData>(
  url: string,
  options = {},
  otherOptions?: IOtherOptions
) => {
  return request<T>(
    url,
    Object.assign({}, options, { method: "PUT" }),
    otherOptions
  );
};

export const putPublic = <T extends ResponseData>(
  url: string,
  options = {},
  otherOptions?: IOtherOptions
) => {
  return put<T>(url, options, { ...otherOptions, isPublicAPI: true });
};

export const del = <T extends ResponseData>(
  url: string,
  options = {},
  otherOptions?: IOtherOptions
) => {
  return request<T>(
    url,
    Object.assign({}, options, { method: "DELETE" }),
    otherOptions
  );
};

export const delPublic = <T extends ResponseData>(
  url: string,
  options = {},
  otherOptions?: IOtherOptions
) => {
  return del<T>(url, options, { ...otherOptions, isPublicAPI: true });
};

export const patch = <T extends ResponseData>(
  url: string,
  options = {},
  otherOptions?: IOtherOptions
) => {
  return request<T>(
    url,
    Object.assign({}, options, { method: "PATCH" }),
    otherOptions
  );
};

export const patchPublic = <T extends ResponseData>(
  url: string,
  options = {},
  otherOptions?: IOtherOptions
) => {
  return patch<T>(url, options, { ...otherOptions, isPublicAPI: true });
};

export default request;
