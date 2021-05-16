import {AbstractDrive, AbstractToken, DriveConfig} from '../base';
import {GoogleToken} from './google.model';
import {GoogleConfig} from '../yandex/config.data';
import {GoogleAuthService} from '../../services/google/auth.service';
import {GoogleDriveService} from '../../services/google/drive.service';
import {snakeCaseToCamelCase, structMap} from '../../shared';


export class GoogleDrive extends AbstractDrive {

  authService = new GoogleAuthService();
  driveService = new GoogleDriveService(this.callStack);
  config = undefined;
  defaultSettings = GoogleConfig;

  private ready = false;
  private $credentials = this.authService.getCredentials();

  constructor() {
    super();
  }

  async init(config: DriveConfig, credentials: AbstractToken): Promise<void> {
    credentials = structMap(
      credentials,
      snakeCaseToCamelCase,
      true
    ) as AbstractToken;
    await super.init(config, credentials);
    this.$credentials.subscribe(async value => this.rebuild(value));
  }

  private async rebuild(credentials: GoogleToken | undefined): Promise<void> {
    this.ready = false;
    if (credentials === undefined) {
      return;
    }
    this.driveService.configure(credentials);
    await this.driveService.updateMetaData();
    this.ready = true;
  }

  isReady(): boolean {
    return this.ready;
  }

}
