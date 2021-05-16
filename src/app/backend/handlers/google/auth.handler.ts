import {environment} from '../../../../environments/environment';
import {YandexToken} from '../../state';
import {Request} from '../shared/request';


export class GoogleAuthHandler {
  googleApiSettings = environment.application.google;
  request = new Request();

  getAuthUrl(state: string): string {
    return `${this.googleApiSettings.rootUrl}?response_type=token&client_id=${this.googleApiSettings.client_id}&redirect_uri=${this.googleApiSettings.redirect_uri}&include_granted_scopes=true&scope=${this.googleApiSettings.scope}${state ? '&state=' + state : ''}`;
  }

  async updateToken(refreshToken: string): Promise<YandexToken> {
    const response = await this.request.make(this.googleApiSettings.rootUrl, {
      data: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: this.googleApiSettings.client_id,
        client_secret: this.googleApiSettings.client_secret
      },
      method: 'POST'
    });
    return await response.json() as YandexToken;
  }

}
