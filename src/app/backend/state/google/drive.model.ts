import {AbstractDrive, Credentials, DriveConfig} from '../base';
import {GoogleConfig} from '../yandex/config.data';
import {GoogleDriveService} from '../../services/google/drive.service';


export class GoogleDrive extends AbstractDrive {

  driveService = new GoogleDriveService(this.callStack, this.$changed);
  config = undefined;
  defaultSettings = GoogleConfig;

  constructor() {
    super();
  }

  async init(config: DriveConfig, credentials?: Credentials): Promise<void> {
    await super.init(config);
    await this.driveService.init(credentials);
  }

}
