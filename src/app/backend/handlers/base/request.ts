import {Credentials} from '../../state';


interface RequestParams {
  queryParams?: { [key: string]: string };
  body?: { [key: string]: any };
  headers?: { [key: string]: any };
  method?: string;
}

export class Request {
  constructor(private credentials?: Credentials) {
  }

  callbacks: { [key: string]: CallableFunction } = {};

  setCredentials(credentials: Credentials): void {
    this.credentials = credentials;
  }

  registerCallback(code: number, func: CallableFunction): void {
    this.callbacks[code] = func;
  }

  async httpRequest(url: string, params?: RequestParams | undefined): Promise<any | undefined> {
    if (!this.credentials) {
      return;
    }

    const response = await fetch(url);


    const callback = this.callbacks[response.status];
    if (callback) {
      return callback;
    }

    return await response.json();
  }

}
