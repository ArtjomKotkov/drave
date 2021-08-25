import {AbstractDrive, Credentials, StorableData} from '../base';
import {GoogleDriveService} from '../../services/google/drive.service';
import {GoogleAuthService} from '../../services/google/auth.service';
import {BehaviorSubject} from 'rxjs';
import {ConfigService} from '../../services/base/config.service';
import {DriveConfig} from '../base/config.abstract';


export class GoogleDrive extends AbstractDrive {

  constructor(driveConfig: DriveConfig) {
    super(driveConfig);
  }

  driveService: GoogleDriveService = new GoogleDriveService(this);
  authService: GoogleAuthService = new GoogleAuthService(this.$changed);
  configService: ConfigService = new ConfigService(this.initConfig);

  private $credentials!: BehaviorSubject<Credentials | undefined>;

  async init(): Promise<void> {
    this.$credentials = this.authService.getCredentials();

    this.$credentials.subscribe(credentials => this.driveService.rebuild(credentials));
    await this.driveService.registerCallback(401, this.authService.updateToken.bind(this.authService));

    this.configService.config.subscribe(_ => this.$changed.next(true));
  }

  async configure(credentials: Credentials): Promise<void> {
    await this.authService.configure(credentials);
  }

}
