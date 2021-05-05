import {AbstractAuthService} from '../base/auth.abstract';
import {YandexAuthHandler} from '../../handlers';
import {YandexToken} from '../../state';
import {BehaviorSubject} from 'rxjs';


export class YandexAuthService extends AbstractAuthService {

  private authHandler = new YandexAuthHandler();
  private credentials = new BehaviorSubject<YandexToken | undefined>(undefined);

  redirectToAuth(state: string): void {
    window.location.href = this.authHandler.getAuthUrl(state);
  }

  setCredentials(credentials: YandexToken): void {
    this.credentials.next(credentials);
  }

  getCredentials(): BehaviorSubject<YandexToken | undefined> {
    return this.credentials;
  }

  updateToken(): void {
  }

  disconnect(): void {
  }

}
