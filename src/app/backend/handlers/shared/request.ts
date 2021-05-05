export interface RequestParams {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: any;
  headers?: { [key: string]: string };
  query?: { [key: string]: string | number | boolean | undefined};
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

  private createUrl(url: string, data: any): string {
    const newUrl = new URL(url);
    Object.keys(data).forEach(key => {
      if (data[key]) {
        newUrl.searchParams.append(key, data[key]);
      }
    });
    return newUrl.toString();
  }

}
