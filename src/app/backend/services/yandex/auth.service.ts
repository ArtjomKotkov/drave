import {AbstractAuthService} from '../base/auth.abstract';
import {Credentials} from '../../state';
import {BehaviorSubject} from 'rxjs';
import {snakeCaseToCamelCase, structMap} from '../../shared';
import {YandexAuthHandler} from '../../handlers';


export class YandexAuthService extends AbstractAuthService {

  handler = new YandexAuthHandler();
  private $credentials = new BehaviorSubject<Credentials | undefined>(undefined);

  redirectToAuth(state: string): void {
    window.location.href = this.handler.getAuthUrl(state);
  }

  async handleBackRedirect(): Promise<void> {
    const credentials: Credentials = await this.handler.changeCode() as Credentials;
    this.$credentials.next(credentials);
  }

  setCredentials(credentials: Credentials): void {
    this.$credentials.next(credentials);
  }

  getCredentials(): BehaviorSubject<Credentials | undefined> {
    return this.$credentials;
  }

  async updateToken(): Promise<Credentials | void> {
    const credentials = this.$credentials.getValue();
    if (!credentials) {
      return;
    }
    return structMap(
      await this.handler.updateToken(credentials) as Credentials,
      snakeCaseToCamelCase,
      true
    );
  }
}
