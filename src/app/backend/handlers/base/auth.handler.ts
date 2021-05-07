export abstract class AbstractAuthHandler {
  abstract getAuthUrl(state: string): string;

  abstract updateToken(): object;
}
