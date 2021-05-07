import {environment} from '../../../../environments/environment';
import {YandexToken} from '../../state';
import {Request} from '../shared/request';


export class YandexAuthHandler {
  yandexApiSettings = environment.application.yandex;
  request = new Request();

  getAuthUrl(state: string): string {
    return `${this.yandexApiSettings.rootUrl}authorize?response_type=token&client_id=${this.yandexApiSettings.client_id}&redirect_uri=${this.yandexApiSettings.redirect_uri}&force_confirm=${this.yandexApiSettings.force_confirm}&scope=${this.yandexApiSettings.scope}${state ? '&state=' + state : ''}`;
  }

  async updateToken(refreshToken: string): Promise<YandexToken> {
    const response = await this.request.make(this.yandexApiSettings.rootUrl, {
      data: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: this.yandexApiSettings.client_id,
        client_secret: this.yandexApiSettings.client_secret
      },
      method: 'POST'
    });
    return await response.json() as YandexToken;
  }

}
