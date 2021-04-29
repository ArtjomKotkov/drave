import {environment} from "../../../../environments/environment";


export class YandexAuthHandler {

  yandexApiSettings = environment.application.yandex;

  getAuthUrl() {
    return `${this.yandexApiSettings.rootUrl}authorize?response_type=token&
    client_id=${this.yandexApiSettings.client_id}
    redirect_uri=${this.yandexApiSettings.redirect_uri}
    scope=${this.yandexApiSettings.scope}`
  }

}
