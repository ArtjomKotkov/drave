import {AbstractConfig} from './config.abstract';
import {DriveAbstractService} from '../../services/base/drive.abstract';
import {Stack} from '../../shared';
import {Subject} from 'rxjs';

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
  credentials: Credentials;
  config: DriveConfig;
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

export interface DriveConfig {
  color: string;
  name: string;
  type: string;
}

export abstract class AbstractDrive {
  abstract driveService: DriveAbstractService;
  abstract config: DriveConfig | undefined;
  abstract defaultSettings: AbstractConfig;

  callStack: Stack<string> = new Stack<string>();

  $changed = new Subject();

  get action(): DriveAbstractService {
    return this.driveService;
  }

  async init(config: DriveConfig, credentials?: Credentials): Promise<void> {
    this.configuration = config;
  }

  get configuration(): DriveConfig {
    return this.config as DriveConfig;
  }

  set configuration(value: DriveConfig) {
    this.config = value;
  }

  get settings(): AbstractConfig {
    return this.defaultSettings;
  }

  get storableData(): StorableData {
    return {
      credentials: this.driveService.authService.getCredentials().getValue(),
      config: this.configuration
    } as StorableData;
  }

}
