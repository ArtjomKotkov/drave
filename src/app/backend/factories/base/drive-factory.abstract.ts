import {AbstractDrive, StorableData} from '../../state';
import {DriveConfig} from '../../state/base/config.abstract';
import {driveConfig} from '../../../features/connection/drive-creator/drive-creator.const';
import {baseConfigsByType} from '../../state/yandex/config.data';


export abstract class AbstractDriveFactory {

  abstract name: string;
  abstract driveClass: any;
  abstract sampleDrive: AbstractDrive;

  make(configData: DriveConfig): AbstractDrive {
    const drive = new this.driveClass(configData);
    drive.init();
    return drive;
  }

  async makeFromStorableData(data: StorableData): Promise<AbstractDrive> {
    const drive = new this.driveClass(data.config);
    await drive.init();
    await drive.configure(data.credentials);
    return drive;
  }
}

export function getDefaultConfigByType(type: string): DriveConfig {
  const config = JSON.parse(JSON.stringify(driveConfig));
  config.base = baseConfigsByType[type];
  return config;
}
