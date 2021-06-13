import {Injectable} from '@angular/core';
import {StorageModel} from '../../../core_services/storage/storage.model';
import {environment} from '../../../../environments/environment';
import {AbstractDrive} from '../../state';
import {LocalStorageService} from '../../../core_services/storage/local.storage';
import {BehaviorSubject} from 'rxjs';
import {FactoryResolver} from '../../factories';


export type CachedDrives = { [key: string]: AbstractDrive[] };


@Injectable({
  providedIn: 'root'
})
export class DrivesStoreService {

  cachedValue: BehaviorSubject<CachedDrives> = new BehaviorSubject({});
  rootKey = environment.application.localStorageData.driveRootKey;

  constructor(
    private localStorage: LocalStorageService,
    private factoryResolver: FactoryResolver
  ) {
  }

  get drives(): BehaviorSubject<CachedDrives> {
    return this.cachedValue;
  }

  async connect(): Promise<void> {
    const cacheData: CachedDrives = {};
    const data = this.localStorage.read(this.rootKey) as string;
    if (!data) {
      return;
    }
    const storageModel = JSON.parse(data ? data : '') as StorageModel;
    for (const [driveType, driveData] of Object.entries(storageModel)) {
      const factory = this.factoryResolver.getFactory(driveType);
      if (!factory) {
        return;
      }
      cacheData[driveType] = await Promise.all(driveData.map(async driveMap => {
        const drive = await factory.makeFromStorableData(driveMap);
        drive.$changed.subscribe(_ => {
          this.save();
        });
        return drive;
      }));
    }
    this.cachedValue.next(cacheData);
  }

  add(drive: AbstractDrive): boolean {
    const currentValue = this.cachedValue.getValue();
    if (this.checkClone(drive, currentValue) || !drive.type) {
      return false;
    }
    if (!(drive.type in currentValue)) {
      currentValue[drive.type] = [];
    }
    currentValue[drive.type].push(drive);
    this.cachedValue.next(currentValue);
    this.save();
    return true;
  }

  delete(drive: AbstractDrive): void {
    const currentValue = this.cachedValue.getValue();
    if (!currentValue || !drive.type) {
      return;
    }
    const index = currentValue[drive.type].indexOf(drive);
    currentValue[drive.type].splice(index, 1);
    if (currentValue[drive.type].length === 0) {
      delete currentValue[drive.type];
    }
    this.cachedValue.next(currentValue);
    this.save();
  }

  update(drive: AbstractDrive): void {
    const currentValue = this.cachedValue.getValue();
    if (!currentValue || !drive.type) {
      return;
    }
    const index = currentValue[drive.type].indexOf(drive);
    currentValue[drive.type][index] = drive;
    this.cachedValue.next(currentValue);
    this.save();
  }

  private checkClone(drive: AbstractDrive, data: CachedDrives): boolean {
    if (!drive.type || !(drive.type in data)) {
      return false;
    }
    return !!data[drive.type].find(
      driveStored => driveStored.driveService.getMetaData()?.owner.id === drive.driveService.getMetaData()?.owner.id
    );
  }

  private save(): void {
    this.localStorage.write(this.rootKey, this.serialize(this.cachedValue.getValue()));
  }

  private serialize(value: CachedDrives): string {
    const output: StorageModel = {};
    for (const [driveType, drives] of Object.entries(value)) {
      output[driveType] = drives.map(drive => drive.storableData);
    }
    return JSON.stringify(output);
  }

}
