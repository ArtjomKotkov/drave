import {AbstractAuthService} from '../base/auth.abstract';
import {Credentials, StorableData} from '../../state';
import {BehaviorSubject, Subject} from 'rxjs';
import {snakeCaseToCamelCase, structMap} from '../../shared';
import {YandexAuthHandler} from '../../handlers';


export class YandexAuthService extends AbstractAuthService {

  handler = new YandexAuthHandler();
  private $credentials = new BehaviorSubject<Credentials | undefined>(undefined);

  constructor(private $changed: Subject<any>) {
    super();
  }

  async configure(data: StorableData): Promise<void> {
    if (data.credentials) {
      this.setCredentials(data.credentials);
    } else {
      await this.handleBackRedirect();
    }
  }

  redirectToAuth(state: string): void {
    window.location.href = this.handler.getAuthUrl(state);
  }

  async handleBackRedirect(): Promise<void> {
    const credentials: Credentials = await this.handler.changeCode() as Credentials;
    this.$credentials.next(
      structMap(
        credentials,
        snakeCaseToCamelCase,
        true
      )
    );
  }

  setCredentials(credentials: Credentials): void {
    this.$credentials.next(credentials);
    this.$changed.next(true);
  }

  getCredentials(): BehaviorSubject<Credentials | undefined> {
    return this.$credentials;
  }

  async updateToken(): Promise<void> {
    const credentials = this.$credentials.getValue();
    if (!credentials) {
      return;
    }
    this.$credentials.next({
      ...this.$credentials.getValue(),
      ...structMap(
        await this.handler.updateToken(credentials) as Credentials,
        snakeCaseToCamelCase,
        true
      )
    });
    this.$changed.next(true);
  }
}
