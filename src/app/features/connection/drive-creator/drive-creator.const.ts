import {DriveConfig} from '../../../backend/state/base/config.abstract';


export const driveConfig: DriveConfig = {
  base: {
    rootFolder: '-',
    trashRoot: '-',
    baseColor: '-',
  },
  common: {
    color: '-',
    name: '-',
    type: '-',
  },
  workflow: {
    default: {
      isEnabled: true,
      isHidden: false,
    }
  }
};
