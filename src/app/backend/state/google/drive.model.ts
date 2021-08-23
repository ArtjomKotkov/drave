import {AbstractDrive, Credentials, StorableData} from '../base';
import {GoogleDriveConfig} from '../yandex/config.data';
import {GoogleDriveService} from '../../services/google/drive.service';
import {GoogleAuthService} from '../../services/google/auth.service';
import {BehaviorSubject} from 'rxjs';
import {ConfigService} from '../../services/base/config.service';


export class GoogleDrive extends AbstractDrive {

  driveService: GoogleDriveService = new GoogleDriveService(this.callStack);
  authService: GoogleAuthService = new GoogleAuthService(this.$changed);
  configService: ConfigService = new ConfigService(GoogleDriveConfig);

  private $credentials!: BehaviorSubject<Credentials | undefined>;

  async init(): Promise<void> {
    this.$credentials = this.authService.getCredentials();

    this.$credentials.subscribe(credentials => this.driveService.rebuild(credentials));
    await this.driveService.registerCallback(401, this.authService.updateToken.bind(this.authService));

    this.configService.config.subscribe(_ => this.$changed.next(true));
  }

  async configure(data: StorableData): Promise<void> {
    if (data.config) {
      this.configService.set(data.config);
    }
    await this.authService.configure(data);
  }

}
