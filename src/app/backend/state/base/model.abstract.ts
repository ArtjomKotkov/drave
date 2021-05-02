import {DriveAbstractService} from './drive.abstract';
import {AbstractAuthService} from './auth.abstract';
import {AbstractConfig} from './config.abstract';

export interface AbstractDriveMetaData {
  availableSpace: number;
  filledSpace: number;
  trashFilledSpace: number;
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
  access_token: string;
  expires_in: string;
  token_type: string;
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
  abstract metaData: AbstractDriveMetaData;

  get action(): DriveAbstractService {
    return this.driveService;
  }

  abstract save(): void;

  setCredentials(credentials: AbstractToken): void {
    this.authService.setCredentials(credentials);
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
      credentials: this.authService.getCredentials(),
      config: this.configuration
    } as StorableData;
  }

  abstract isReady(): boolean;

}
