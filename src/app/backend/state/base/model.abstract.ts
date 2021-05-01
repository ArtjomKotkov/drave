import {DriveAbstractService} from "./drive.abstract";
import {AbstractAuthService} from "./auth.abstract";

export interface AbstractFile {}

export interface AbstractResponse {}

export interface DriveConfig {
  color: string
  name: string
}


interface AbstractDriveInterface {}

export abstract class AbstractDrive implements AbstractDriveInterface {
  abstract driveService: DriveAbstractService;
  abstract authService: AbstractAuthService;
  abstract config: DriveConfig | undefined;

  get action(): DriveAbstractService {
    return this.driveService;
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

}
