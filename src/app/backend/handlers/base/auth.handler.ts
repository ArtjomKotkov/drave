import {Credentials} from '../../state';


export abstract class AuthHandler {

  abstract config: { [key: string]: any };

  static extractCode(): string {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const code = params.get('code');
    return code ? code : '' as string;
  }

  abstract getAuthUrl(state: string): string;

  abstract changeCode(): void;

  abstract updateToken(credentials: Credentials): object;
}
