import {environment} from '../../../../environments/environment';


export class YandexAuthHandler {

  yandexApiSettings = environment.application.yandex;

  getAuthUrl(state: string): string {
    return `${this.yandexApiSettings.rootUrl}authorize?response_type=token&client_id=${this.yandexApiSettings.client_id}&redirect_uri=${this.yandexApiSettings.redirect_uri}&force_confirm=${this.yandexApiSettings.force_confirm}&scope=${this.yandexApiSettings.scope}${state ? '&state=' + state : ''}`;
  }
}
