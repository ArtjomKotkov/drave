type QueryType = { [key: string]: string | number | boolean | undefined };

export interface RequestParams {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: any;
  headers?: { [key: string]: string };
  query?: QueryType;
  formData?: FormData;
}

export interface Callback {
  method: CallableFunction;
  rebuildRequest: boolean;
}

export interface RequestConfig {
  headers?: { [key: string]: string };
}


export class Request {
  private coreHeaders: { [key: string]: string } = {};
  private callbacks: { [key: string]: Callback } = {};

  configure(config: RequestConfig): void {
    this.coreHeaders = config.headers ? config.headers : this.coreHeaders;
  }

  registerCallback(code: number, func: CallableFunction, rebuildRequest: boolean = false): void {
    this.callbacks[code] = {
      method: func,
      rebuildRequest
    };
  }

  async make(url: string, params?: RequestParams): Promise<Response> {
    let response = await this.makeRequest(url, params);

    const callbackData = this.callbacks[response.status];

    if (callbackData) {
      callbackData.method();

      if (callbackData.rebuildRequest) {
        response = await this.makeRequest(url, params);
      }
    }

    return response;
  }

  private async makeRequest(url: string, params?: RequestParams): Promise<Response> {
    const urlWithQuery = this.createUrl(url, params?.query);
    return await fetch(
      urlWithQuery,
      {
        method: params?.method ? params?.method : 'GET',
        headers: {...params?.headers, ...this.coreHeaders},
        body: params?.formData ? params?.formData : JSON.stringify(params?.data)
      }
    );
  }

  private createUrl(url: string, query?: QueryType): string {
    const newUrl = new URL(url);
    if (query) {
      Object.keys(query).forEach(key => {
        if (query[key]) {
          newUrl.searchParams.append(key, String(query[key]));
        }
      });
    }
    return newUrl.toString();
  }

}
