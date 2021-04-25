import {environment} from "../../../../environments/environment";


export class YandexAuthHandler {

  yandexApiSettings = environment.application.yandex;

  getAuthUrl() {
    return `${this.yandexApiSettings.rootUrl}authorize?response_type=token&
    client_id=${this.yandexApiSettings.client_id}
    redirect_uri=${this.yandexApiSettings.redirect_uri}
    scope=${this.yandexApiSettings.scope}`
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
