import {AbstractAuthService} from '../base/auth.abstract';
import {BehaviorSubject} from 'rxjs';
import {snakeCaseToCamelCase, structMap} from '../../shared';
import {GoogleAuthHandler} from '../../handlers/google';
import {GoogleToken} from '../../state';


export class GoogleAuthService extends AbstractAuthService {

  private authHandler = new GoogleAuthHandler();
  private credentials = new BehaviorSubject<GoogleToken | undefined>(undefined);

  redirectToAuth(state: string): void {
    window.location.href = this.authHandler.getAuthUrl(state);
  }

  setCredentials(credentials: GoogleToken): void {
    this.credentials.next(credentials);
  }

  getCredentials(): BehaviorSubject<GoogleToken | undefined> {
    return this.credentials;
  }

  async updateToken(): Promise<GoogleToken | undefined> {
    const refreshToken = this.credentials.getValue()?.refreshToken;
    if (!refreshToken) {
      return ;
    }
    return structMap(
      await this.authHandler.updateToken(refreshToken) as GoogleToken,
      snakeCaseToCamelCase,
      true
    );
  }
}
