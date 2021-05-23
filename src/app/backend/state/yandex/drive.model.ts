import {AbstractDrive, Credentials, DriveConfig} from '../base';
import {YandexDriveService} from '../../services/yandex';
import {YandexConfig} from './config.data';


export class YandexDrive extends AbstractDrive {

  driveService = new YandexDriveService(this.callStack, this.$changed);
  config = undefined;
  defaultSettings = YandexConfig;

  constructor() {
    super();
  }

  async init(config: DriveConfig, credentials?: Credentials): Promise<void> {
    await super.init(config);
    await this.driveService.init(credentials);
  }

}
