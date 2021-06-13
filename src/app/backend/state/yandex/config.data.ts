import {BaseConfig, DriveConfig} from '../base/config.abstract';


export const YandexConfig: BaseConfig  = {
  rootFolder: '/',
  trashRoot: '/',
  baseColor: '#E61400'
};

export const GoogleConfig: BaseConfig  = {
  rootFolder: 'root',
  trashRoot: '',
  baseColor: '#FFD04B'
};

export const YandexDriveConfig: DriveConfig = {
  base: YandexConfig
};

export const GoogleDriveConfig: DriveConfig = {
  base: GoogleConfig
};
