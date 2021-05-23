import {AuthHandler} from '../../handlers/base/auth.handler';

export abstract class AbstractAuthService {

  abstract handler: AuthHandler;

  abstract redirectToAuth(state: string): void;

  abstract handleBackRedirect(): void;

  abstract setCredentials(credentials: any): void;

  abstract getCredentials(): any;

  abstract updateToken(): void;

}

