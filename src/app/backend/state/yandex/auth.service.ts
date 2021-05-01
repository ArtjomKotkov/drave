import {BrowserLocalStorage} from "../../../core_services/storage/local.storage";
import {AbstractAuthService} from "../base/auth.abstract";
import {YandexAuthHandler} from "../../handlers";
import {YandexToken} from "./yandex.model";


export class YandexAuthService extends AbstractAuthService {

  private yandexStorageKey = 'credentials_yandex';
  private localStorage = new BrowserLocalStorage();
  private authHandler = new YandexAuthHandler();

  redirectToAuth(): void {
    window.location.href = this.authHandler.getAuthUrl();
  }

  processAfterRedirect(): void {
    const tokenInfo = this.extractToken() as YandexToken;
    this.localStorage.setJsonItem(this.yandexStorageKey, tokenInfo);
  }

  updateToken(): void {

  };

  disconnect(): void {

  };

  getCredentials(): YandexToken {
    return this.localStorage.getJsonItem(this.yandexStorageKey) as YandexToken;
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
