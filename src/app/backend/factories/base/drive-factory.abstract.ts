import {AbstractDrive, StorableData} from '../../state';


export abstract class AbstractDriveFactory {

  abstract name: string;
  abstract driveClass: any;
  abstract sampleDrive: AbstractDrive;

  abstract make(): AbstractDrive;

  abstract makeFromStorableData(data: StorableData): Promise<AbstractDrive>;
}
