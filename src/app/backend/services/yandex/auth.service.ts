import {AbstractAuthService} from '../base/auth.abstract';
import {YandexAuthHandler} from '../../handlers';
import {YandexToken} from '../../state';
import {BehaviorSubject} from 'rxjs';
import {snakeCaseToCamelCase, structMap} from '../../shared';


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

  async updateToken(): Promise<YandexToken | undefined> {
    const refreshToken = this.credentials.getValue()?.refreshToken;
    if (!refreshToken) {
      return ;
    }
    return structMap(
      await this.authHandler.updateToken(refreshToken) as YandexToken,
      snakeCaseToCamelCase,
      true
    );
  }
}
