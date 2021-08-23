import {DriveConfig} from './config.abstract';
import {DriveAbstractService} from '../../services/base/drive.abstract';
import {Stack} from '../../shared';
import {Subject} from 'rxjs';
import {AbstractAuthService} from '../../services/base/auth.abstract';
import {ConfigService} from '../../services/base/config.service';


export interface AbstractDriveMetaData {
  totalSpace: number;
  filledSpace: number;
  trashFilledSpace: number;
  maxFileSize: number;
  owner: {
    id: string;
    login?: string;
    displayName?: string;
  }; // По овнеру исключаем дублиты дисков.
}

export interface StorableData {
  credentials?: Credentials;
  config?: DriveConfig;
}

export interface Credentials {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  tokenType: string;
  state?: string;
  scope: string;
}

export interface AbstractFile {
  id: string;
  name: string;
  mimeType?: string;
  size?: string;
  created?: string;
  modified?: string;
  isDir?: boolean;
  type?: string;
  nested?: {
    limit?: number;
    offset?: number;
    files?: AbstractFile[]
  };
  trashed?: boolean;
}

export interface AbstractResponse {
}

export interface AbstractConfigUpdateModel  {
  workflow?: {
    default?: {
      isEnabled?: boolean;
      isHidden?: boolean;
    }
  };
}

export abstract class AbstractDrive {
  abstract authService: AbstractAuthService;
  abstract driveService: DriveAbstractService;
  abstract configService: ConfigService;

  callStack: Stack<string> = new Stack<string>();
  $changed = new Subject();

  get action(): DriveAbstractService {
    return this.driveService;
  }

  abstract configure(data: StorableData): Promise<void>;

  get config(): DriveConfig {
    return this.configService.config.getValue();
  }

  get storableData(): StorableData {
    return {
      credentials: this.authService.getCredentials().getValue(),
      config: this.configService.config.getValue(),
    } as StorableData;
  }

  get color(): string | undefined {
    return this.configService.configValue.common?.color;
  }

  get name(): string | undefined {
    return this.configService.configValue.common?.name;
  }

  get type(): string | undefined {
    return this.configService.configValue.common?.type;
  }

}
