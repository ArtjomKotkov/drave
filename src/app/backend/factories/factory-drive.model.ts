import {AbstractDrive} from '../state';


export interface FactoryDriveModel {
  [key: string]: {
    [key: string]: AbstractDrive
  };
}
