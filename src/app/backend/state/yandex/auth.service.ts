import {AbstractAuthService} from '../base/auth.abstract';
import {YandexAuthHandler} from '../../handlers';
import {YandexToken} from './yandex.model';


export class YandexAuthService extends AbstractAuthService {

  private authHandler = new YandexAuthHandler();
  private credentials: YandexToken | undefined = undefined;

  redirectToAuth(state: string): void {
    window.location.href = this.authHandler.getAuthUrl(state);
  }

  setCredentials(credentials: YandexToken): void {
    this.credentials = credentials;
  }

  getCredentials(): YandexToken | undefined {
    return this.credentials;
  }

  updateToken(): void {
  }

  disconnect(): void {
  }

}
