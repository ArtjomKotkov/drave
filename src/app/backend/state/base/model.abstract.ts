import {AbstractConfig} from './config.abstract';
import {DriveAbstractService} from '../../services/base/drive.abstract';
import {AbstractAuthService} from '../../services/base/auth.abstract';
import {YandexMetaData} from '../yandex/yandex.model';
import {BehaviorSubject} from 'rxjs';
import {Stack} from '../../shared';

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
  credentials: AbstractToken;
  config: DriveConfig;
}

export interface AbstractToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  tokenType: string;
  state?: string;
  scope: string;
}

export interface AbstractFile {
}

export interface AbstractResponse {
}

export interface DriveConfig {
  color: string;
  name: string;
  type: string;
}


interface AbstractDriveInterface {
}

export abstract class AbstractDrive implements AbstractDriveInterface {
  abstract driveService: DriveAbstractService;
  abstract authService: AbstractAuthService;
  abstract config: DriveConfig | undefined;
  abstract defaultSettings: AbstractConfig;

  callStack: Stack<string> = new Stack<string>();

  get action(): DriveAbstractService {
    return this.driveService;
  }

  async init(config: DriveConfig, credentials: AbstractToken): Promise<void> {
    this.authService.setCredentials(credentials);
    this.configuration = config;
  }

  get auth(): AbstractAuthService {
    return this.authService;
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
      credentials: this.authService.getCredentials().getValue(),
      config: this.configuration
    } as StorableData;
  }

  abstract isReady(): boolean;

}
