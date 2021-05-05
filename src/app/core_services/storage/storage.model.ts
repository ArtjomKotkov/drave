import {StorableData} from '../../backend/state';


export interface StorageModel {
  [key: string]: StorableData[];
}
