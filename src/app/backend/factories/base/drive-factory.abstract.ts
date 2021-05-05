import {AbstractDrive, DriveConfig, StorableData} from '../../state';


export abstract class AbstractDriveFactory {

  abstract name: string;
  abstract driveClass: any;
  abstract sampleDrive: AbstractDrive;

  abstract make(): AbstractDrive;

  configure(model: AbstractDrive, config: DriveConfig): AbstractDrive {
    model.configuration = config;
    return model;
  }

  abstract makeFromStorableData(data: StorableData): Promise<AbstractDrive>;
}
