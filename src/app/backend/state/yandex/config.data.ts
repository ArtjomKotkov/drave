import {BaseConfig} from '../base/config.abstract';


export const baseConfigsByType: Record<string, BaseConfig> = {
  yandex: {
    rootFolder: '/',
    trashRoot: '/',
    baseColor: '#E61400'
  },
  google: {
    rootFolder: 'root',
    trashRoot: '',
    baseColor: '#FFD04B'
  }
};
