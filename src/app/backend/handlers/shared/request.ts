type QueryType = {[key: string]: string | number | boolean | undefined};

export interface RequestParams {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: any;
  headers?: { [key: string]: string };
  query?: QueryType;
}

export interface RequestConfig {
  headers?: { [key: string]: string };
}


export class Request {
  private coreHeaders: { [key: string]: string } = {};

  configure(config: RequestConfig): void {
    this.coreHeaders = config.headers ? config.headers : this.coreHeaders;
  }

  async make(url: string, params?: RequestParams): Promise<Response> {
    const urlWithQuery = this.createUrl(url, params?.query);

    return await fetch(
      urlWithQuery,
      {
        method: params?.method ? params?.method : 'GET',
        headers: {...params?.headers, ...this.coreHeaders},
        body: JSON.stringify(params?.data)
      }
    );
  }

  private createUrl(url: string, query?: QueryType): string {
    const newUrl = new URL(url);
    if (query) {
      Object.keys(query).forEach(key => {
        if (query[key]) {
          newUrl.searchParams.append(key,  String(query[key]));
        }
      });
    }
    return newUrl.toString();
  }

}
