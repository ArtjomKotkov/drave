import {Injectable} from '@angular/core';
import {StorageModel} from '../../../core_services/storage/storage.model';
import {environment} from '../../../../environments/environment';
import {AbstractDrive} from '../../state';
import {LocalStorageService} from '../../../core_services/storage/local.storage';
import {BehaviorSubject} from 'rxjs';
import {FactoryResolver} from '../../factories';


type CachedDrives = { [key: string]: AbstractDrive[] };


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

  get value(): BehaviorSubject<CachedDrives> {
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
      cacheData[driveType] = await Promise.all(driveData.map(async driveMap => await factory.makeFromStorableData(driveMap)));
    }
    this.cachedValue.next(cacheData);
  }

  add(drive: AbstractDrive): void {
    const currentValue = this.cachedValue.getValue();
    if (this.checkClone(drive, currentValue)) {
      return;
    }
    if (!(drive.configuration.type in currentValue)) {
      currentValue[drive.configuration.type] = [];
    }
    currentValue[drive.configuration.type].push(drive);
    this.cachedValue.next(currentValue);
    this.save();
  }

  delete(drive: AbstractDrive): void {
    const currentValue = this.cachedValue.getValue();
    if (!currentValue) {
      return;
    }
    const index = currentValue[drive.configuration.type].indexOf(drive);
    currentValue[drive.configuration.type] = currentValue[drive.configuration.type].splice(index, 1);
    this.cachedValue.next(currentValue);
    this.save();
  }

  update(drive: AbstractDrive): void {
    const currentValue = this.cachedValue.getValue();
    if (!currentValue) {
      return;
    }
    const index = currentValue[drive.configuration.type].indexOf(drive);
    currentValue[drive.configuration.type][index] = drive;
    this.cachedValue.next(currentValue);
    this.save();
  }

  private checkClone(drive: AbstractDrive, data: CachedDrives): boolean {
    if (!(drive.configuration.type in data)) {
      return false;
    }
    const metaData = drive.driveService.getMetaData();
    return !!data[drive.configuration.type].find(
      driveStored => driveStored.driveService.getMetaData()?.owner === drive.driveService.getMetaData()?.owner
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
