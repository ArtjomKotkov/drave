import {environment} from '../../../../environments/environment';
import {Credentials} from '../../state';
import {Request} from '../shared/request';
import {AuthHandler} from '../base/auth.handler';


export class GoogleAuthHandler extends AuthHandler {
  config = environment.application.google;
  request = new Request();

  getAuthUrl(state: string): string {
    return `${this.config.rootUrl}?response_type=code&prompt=consent&client_id=${this.config.client_id}&redirect_uri=${this.config.redirect_uri}&access_type=offline&include_granted_scopes=true&scope=${this.config.scope}${state ? '&state=' + state : ''}`;
  }

  async changeCode(): Promise<object> {
    const response = await this.request.make(this.config.exchange_code_uri, {
      query: {
        grant_type: 'authorization_code',
        code: GoogleAuthHandler.extractCode(),
        client_id: this.config.client_id,
        client_secret: this.config.client_secret,
        redirect_uri: this.config.redirect_uri
      },
      method: 'POST'
    });
    return await response.json();
  }

  async updateToken(credentials: Credentials): Promise<object> {
    const response = await this.request.make(this.config.exchange_code_uri, {
      data: {
        grant_type: 'refresh_token',
        refresh_token: credentials.refreshToken,
        client_id: this.config.client_id,
        client_secret: this.config.client_secret
      },
      method: 'POST'
    });
    return await response.json();
  }
}
