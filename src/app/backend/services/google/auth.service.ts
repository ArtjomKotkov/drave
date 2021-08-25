import {AbstractAuthService} from '../base/auth.abstract';
import {BehaviorSubject, Subject} from 'rxjs';
import {snakeCaseToCamelCase, structMap} from '../../shared';
import {GoogleAuthHandler} from '../../handlers/google';
import {Credentials, StorableData} from '../../state';


export class GoogleAuthService extends AbstractAuthService {

  handler = new GoogleAuthHandler();
  private $credentials = new BehaviorSubject<Credentials | undefined>(undefined);

  constructor(private $changed: Subject<any>) {
    super();
  }

  async configure(credentials: Credentials): Promise<void> {
    if (credentials) {
      this.setCredentials(credentials);
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
    console.log('update???')
    const credentials = this.$credentials.getValue();
    if (!credentials) {
      return;
    }
    this.$credentials.next(
      {
        ...this.$credentials.getValue(),
        ...structMap(
          await this.handler.updateToken(credentials) as Credentials,
          snakeCaseToCamelCase,
          true
        )
      }
    );
    this.$changed.next(true);
  }
}
