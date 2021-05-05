import {AbstractDrive, AbstractToken, DriveConfig} from '../base';
import {YandexAuthService} from '../../services/yandex';
import {YandexDriveService} from '../../services/yandex';
import {YandexConfig} from './config.data';
import {YandexToken} from './yandex.model';


export class YandexDrive extends AbstractDrive {

  authService = new YandexAuthService();
  driveService = new YandexDriveService();
  config = undefined;
  defaultSettings = YandexConfig;

  private ready = false;

  private $credentials = this.authService.getCredentials();

  constructor() {
    super();

  }

  async init(config: DriveConfig, credentials: AbstractToken): Promise<void> {
    await super.init(config, credentials);
    this.$credentials.subscribe(async value => this.rebuild(value));
  }

  private async rebuild(credentials: YandexToken | undefined): Promise<void> {
    this.ready = false;
    if (credentials === undefined) {
      return;
    }
    this.driveService.configure(credentials);
    await this.driveService.getMetaData();
    this.ready = true;
  }

  isReady(): boolean {
    return this.ready;
  }

}
