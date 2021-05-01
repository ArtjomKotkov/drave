import {AbstractDrive} from "../base";
import {YandexAuthService} from "./auth.service";
import {YandexDriveService} from "./drive.service";


export class YandexDrive extends AbstractDrive {
  authService = new YandexAuthService();
  driveService = new YandexDriveService();
  config = undefined;
}
