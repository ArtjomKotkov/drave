import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {StorageModel} from './storage.model';
import {StorableData} from '../../backend/state';

@Injectable({
  providedIn: 'root'
})
export class DrivesStorage {
  /**
   * Storage
   */

  storage = window.localStorage;
  cachedValue: StorageModel = {};
  rootKey = environment.application.localStorageData.driveRootKey;

  connect(): void {
    const data = this.storage.getItem(this.rootKey);
    this.cachedValue = JSON.parse(data ? data : '') as StorageModel;
  }

  clear(): void {
    this.storage.clear();
  }

  save(): void {
    this.storage.setItem(this.rootKey, JSON.stringify(this.cachedValue));
  }

  getAll(): StorageModel {
    return this.cachedValue;
  }

  getDrive(type: string, key: string): StorableData | undefined {
    const typeMap = this.cachedValue[type];
    if (!typeMap) {
      return;
    }
    return this.cachedValue[type][key] as StorableData;
  }

  saveDrive(type: string, key: string, data: StorableData): void {
    const typeMap = this.cachedValue[type];
    if (!typeMap) {
      this.cachedValue[type] = {};
    }
    this.cachedValue[type][key] = data;
    this.save();
  }

  getDrives(type: string): object {
    return this.cachedValue[type];
  }
}
