import {BehaviorSubject} from 'rxjs';
import {DriveConfig} from '../../state/base/config.abstract';
import {driveConfig} from '../../../features/connection/drive-creator/drive-creator.const';


export class ConfigService {

  constructor(private initDriveConfig: DriveConfig) {
  }

  readonly configData: BehaviorSubject<DriveConfig> = new BehaviorSubject<DriveConfig>(this.initDriveConfig);

  set(config: DriveConfig): void {
    this.configData.next(config);
  }

  update(config: DriveConfig): void {
    const currentConfig = this.configData.getValue();
    if (!currentConfig) {
      this.configData.next(currentConfig);
      return;
    }
    for (const [key, value] of Object.entries(config)) {
      if (key in currentConfig) {
        // @ts-ignore
        currentConfig[key] = value;
      }
    }
    this.configData.next(currentConfig);
  }

  get config(): BehaviorSubject<DriveConfig> {
    return this.configData;
  }

  get configValue(): DriveConfig {
    return this.configData.getValue();
  }


}
