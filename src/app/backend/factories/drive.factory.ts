import {AbstractDrive, StorableData, YandexDrive} from '../state';
import {AbstractDriveFactory} from './base/drive-factory.abstract';
import {Injectable} from '@angular/core';
import {DrivesStorage} from '../../core_services/storage/local.storage';
import {StorageModel} from '../../core_services/storage/storage.model';
import {FactoryDriveModel} from './factory-drive.model';


@Injectable({
  providedIn: 'root'
})
export class FactoryResolver {

  constructor(private storage: DrivesStorage) {
  }

  private factoryMap: { [key: string]: AbstractDriveFactory; } = {
    yandex: new YandexDriveFactory(this.storage),
    test: new YandexDriveFactory(this.storage)
  };

  getFactory(name: string): AbstractDriveFactory | undefined {
    return this.factoryMap[name];
  }

  getAvailableFactoriesNames(): string[] {
    return Object.keys(this.factoryMap);
  }

  getAll(): FactoryDriveModel {
    const allDrives: StorageModel = this.storage.getAll();
    const allDrivesModels: any = {};
    for (const [driveType, driveData] of Object.entries(allDrives)) {
      const factory = this.getFactory(driveType);
      allDrivesModels[driveType] = [];
      for (const storableData of Object.values(driveData)) {
        allDrivesModels[driveType].push(factory?.makeFromStorableData(storableData));
      }
    }
    return allDrivesModels as FactoryDriveModel;
  }
}


class YandexDriveFactory extends AbstractDriveFactory {

  constructor(private storage: DrivesStorage) {
    super();
  }

  name = 'yandex';
  driveClass: any = YandexDrive;
  sampleDrive: YandexDrive = new YandexDrive(this.storage);

  make(): AbstractDrive {
    return new this.driveClass(this.storage);
  }

  makeFromStorableData(data: StorableData): AbstractDrive {
    const drive = new this.driveClass(this.storage);
    drive.configuration = data.config;
    drive.setCredentials(data.credentials);
    return drive;
  }
}
