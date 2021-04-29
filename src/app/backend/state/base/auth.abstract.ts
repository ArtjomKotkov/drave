export abstract class AbstractAuthService {

  abstract redirectToAuth(): void;

  abstract processAfterRedirect(): void;

  abstract updateToken(): void;

  abstract disconnect(): void;

  abstract getCredentials(): object;

}

