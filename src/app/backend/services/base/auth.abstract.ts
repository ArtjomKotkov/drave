import {AuthHandler} from '../../handlers/base/auth.handler';
import {BehaviorSubject} from 'rxjs';
import {Credentials} from '../../state';

export abstract class AbstractAuthService {

  abstract handler: AuthHandler;

  abstract redirectToAuth(state: string): void;

  abstract handleBackRedirect(): void;

  abstract setCredentials(credentials: Credentials): void;

  abstract getCredentials(): BehaviorSubject<Credentials | undefined>;

  abstract updateToken(): void;

}

