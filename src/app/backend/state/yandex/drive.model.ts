import {AbstractDrive} from '../base';
import {YandexAuthService} from './auth.service';
import {YandexDriveService} from './drive.service';
import {YandexConfig} from './config.data';
import {DrivesStorage} from '../../../core_services/storage/local.storage';


export class YandexDrive extends AbstractDrive {

  constructor(private storage: DrivesStorage) {
    super();
  }

  authService = new YandexAuthService();
  driveService = new YandexDriveService();
  config = undefined;
  defaultSettings = YandexConfig;

  save(): void {
    console.log(this.storableData)
    this.storage.saveDrive(this.storableData.config.type, this.storableData.config.name, this.storableData);
  }

}
