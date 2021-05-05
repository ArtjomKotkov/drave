import {AbstractDrive} from '../base';
import {YandexAuthService} from '../../services/yandex';
import {YandexDriveService} from '../../services/yandex';
import {YandexConfig} from './config.data';
import {YandexMetaData, YandexToken} from './yandex.model';


export class YandexDrive extends AbstractDrive {

  authService = new YandexAuthService();
  driveService = new YandexDriveService();
  config = undefined;
  defaultSettings = YandexConfig;
  metaData: YandexMetaData | undefined;

  private ready = false;

  private $credentials = this.authService.getCredentials();

  constructor() {
    super();
    this.$credentials.subscribe(value => this.rebuild(value));
  }

  private rebuild(credentials: YandexToken | undefined): void {
    this.ready = false;
    if (credentials === undefined) {
      return;
    }
    this.driveService.configure(credentials);
    this.ready = true;
  }

  isReady(): boolean {
    return this.ready;
  }

}
