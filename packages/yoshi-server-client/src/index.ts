import unfetch from 'isomorphic-unfetch';
import {
  FunctionArgs,
  FunctionResult,
  UnpackPromise,
  DSL,
  RequestPayload,
} from 'yoshi-server/types';
import { createHeaders } from '@wix/headers';
import { joinUrls, showToast } from './utils';

type Options = {
  baseUrl?: string;
};

export interface HttpClient {
  request<Result extends FunctionResult, Args extends FunctionArgs>(
    method: DSL<Result, Args>,
    options?: { headers?: { [index: string]: string } },
  ): (...args: Args) => Promise<UnpackPromise<Result>>;
}

// https://github.com/developit/unfetch/issues/46
const fetch = unfetch;
const serverlessScope = process.env.YOSHI_SERVERLESS_SCOPE;

const defaultBaseUrl = serverlessScope
  ? serverlessScope
  : `/_api/${process.env.PACKAGE_NAME}`;
export default class implements HttpClient {
  private baseUrl: string;

  constructor({ baseUrl = defaultBaseUrl }: Options = {}) {
    this.baseUrl = baseUrl;
  }

  request<Result extends FunctionResult, Args extends FunctionArgs>(
    method: DSL<Result, Args>,
    options?: { headers?: { [index: string]: string } },
  ): (...args: Args) => Promise<UnpackPromise<Result>> {
    return async (...args: Args) => {
      const url = joinUrls(this.baseUrl, '/_api_');
      const wixHeaders = createHeaders();
      const { fileName, functionName } = method;
      const body: RequestPayload = { fileName, functionName, args };

      const res = await fetch(url, {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // WixHeaders has ? for each key. Here, keys which are undefined will be filtered automatically
          ...(wixHeaders as Record<string, string>),
          ...options?.headers,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        if (res.headers.get('content-type')?.includes('application/json')) {
          const error = await res.json();
          if (process.env.NODE_ENV !== 'production') {
            if (process.env.browser) {
              showToast(error, method, args, this.baseUrl);
            }
            console.error(error);
          }
          throw new Error(JSON.stringify(error));
        } else {
          const error = await res.text();
          const errorMessage = `
              Yoshi Server: the server returned a non JSON response.
              This is probable due to an error in one of the middlewares before Yoshi Server.
              ${error}
            `;
          if (process.env.NODE_ENV !== 'production') {
            console.error(error);
          }

          throw new Error(errorMessage);
        }
      }

      const result = await res.json();

      return result.payload;
    };
  }
}
