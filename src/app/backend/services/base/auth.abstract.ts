export abstract class AbstractAuthService {

  abstract redirectToAuth(state: string): void;

  abstract setCredentials(credentials: any): void;

  abstract getCredentials(): any;

  abstract updateToken(): void;

}

