import {BrowserLocalStorage} from "../../../core_services/storage/local.storage";
import {AbstractAuthService} from "../base/auth.abstract";
import {YandexAuthHandler} from "../../handlers";
import {YandexToken} from "./auth.model";


class YandexAuthService implements AbstractAuthService {

  yandex_storage_key = 'credentials_yandex';

  constructor(
    private authHandler: YandexAuthHandler,
    private localStorage: BrowserLocalStorage
  ) {}

  redirectToAuth(): void {
    window.location.href = this.authHandler.getAuthUrl();
  }

  processAfterRedirect(): void {
    const tokenInfo = this.authHandler.extractToken() as YandexToken;
    this.localStorage.setJsonItem(this.yandex_storage_key, tokenInfo);
  }

  getCredentials(): YandexToken {
    return this.localStorage.getJsonItem(this.yandex_storage_key) as YandexToken;
  }



}
