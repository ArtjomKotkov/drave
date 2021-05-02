import {StorableData} from '../../backend/state';


export interface StorageModel {
  [key: string]: { // disk type
    [key: string]: StorableData // disk name
  };
}
