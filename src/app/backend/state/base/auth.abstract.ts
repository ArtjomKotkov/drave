export abstract class AbstractAuthService {

  abstract redirectToAuth(): void;

  abstract processAfterRedirect(): void;

}

