import {AbstractDrive, Credentials, StorableData} from '../base';
import {YandexAuthService, YandexDriveService} from '../../services/yandex';
import {YandexDriveConfig} from './config.data';
import {BehaviorSubject} from 'rxjs';
import {ConfigService} from '../../services/base/config.service';


export class YandexDrive extends AbstractDrive {

  driveService: YandexDriveService = new YandexDriveService(this.callStack);
  authService: YandexAuthService = new YandexAuthService(this.$changed);
  configService: ConfigService = new ConfigService(YandexDriveConfig);

  private $credentials!: BehaviorSubject<Credentials | undefined>;

  async init(): Promise<void> {
    this.$credentials = this.authService.getCredentials();

    this.$credentials.subscribe(credentials => this.driveService.rebuild(credentials));
    await this.driveService.registerCallback(401, this.authService.updateToken.bind(this.authService));
  }

  async configure(data: StorableData): Promise<void> {
    if (data.config) {
      this.configService.set(data.config);
    }
    await this.authService.configure(data);
  }

}
