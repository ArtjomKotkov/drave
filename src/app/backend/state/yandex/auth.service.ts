import {BrowserLocalStorage} from "../../../core_services/storage/local.storage";
import {AbstractAuthService} from "../base/auth.abstract";
import {YandexAuthHandler} from "../../handlers";
import {YandexToken} from "./yandex.model";


export class YandexAuthService implements AbstractAuthService {

  yandex_storage_key = 'credentials_yandex';

  constructor(
    private authHandler: YandexAuthHandler,
    private localStorage: BrowserLocalStorage
  ) {}

  redirectToAuth(): void {
    window.location.href = this.authHandler.getAuthUrl();
  }

  processAfterRedirect(): void {
    const tokenInfo = this.extractToken() as YandexToken;
    this.localStorage.setJsonItem(this.yandex_storage_key, tokenInfo);
  }

  updateToken(): void {

  };

  disconnect(): void {

  };

  getCredentials(): YandexToken {
    return this.localStorage.getJsonItem(this.yandex_storage_key) as YandexToken;
  }

  extractToken(): object {
    const hash = location.hash;
    return hash.split('&').reduce((obj, item) => {
      const keyValue = item.split('=');
      return {
        ...obj,
        [keyValue[0]]: keyValue[1]
      }
    }, {})
  }

}
