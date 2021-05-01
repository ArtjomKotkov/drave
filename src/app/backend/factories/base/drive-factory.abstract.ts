import {AbstractDrive, DriveConfig} from "../../state";


export class AbstractDriveFactory {

  driveClass: any

  make(): AbstractDrive {
    return new this.driveClass();
  }

  configure(model: AbstractDrive, config: DriveConfig): AbstractDrive {
    model.configuration = config;
    return model
  }

}
