import {AbstractToken} from '../../state';


interface RequestParams {
  queryParams?: { [key: string]: string };
  body?: { [key: string]: any };
  headers?: { [key: string]: any };
  method?: string;
}

export class Request {
  constructor(private credentials?: AbstractToken) {
  }

  setCredentials(credentials: AbstractToken): void {
    this.credentials = credentials;
  }

  async httpRequest(url: string, params?: RequestParams | undefined): Promise<any | undefined> {
    if (!this.credentials) {
      return;
    }
    const response = await fetch(url);
    return await response.json();
  }

}
