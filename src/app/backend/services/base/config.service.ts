
import {BehaviorSubject} from 'rxjs';
import {DriveConfig} from '../../state/base/config.abstract';


export class ConfigService {

  readonly configData: BehaviorSubject<DriveConfig>;

  constructor(
    // tslint:disable-next-line:variable-name
    private config_: DriveConfig
  ) {
    this.configData = new BehaviorSubject<DriveConfig>(config_);
  }

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
