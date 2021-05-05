import {AbstractDrive, StorableData, YandexDrive} from '../state';
import {AbstractDriveFactory} from './base/drive-factory.abstract';
import {Injectable} from '@angular/core';

type driveFactories = YandexDriveFactory;

@Injectable({
  providedIn: 'root'
})
export class FactoryResolver {
  private factoryMap: { [key: string]: driveFactories } = {
    yandex: new YandexDriveFactory()
  };

  getFactory(name: string): driveFactories | undefined {
    return this.factoryMap[name];
  }

  getAvailableFactoriesNames(): string[] {
    return Object.keys(this.factoryMap);
  }
}


class YandexDriveFactory extends AbstractDriveFactory {

  name = 'yandex';
  driveClass: any = YandexDrive;
  sampleDrive: YandexDrive = new YandexDrive();

  make(): AbstractDrive {
    return new this.driveClass();
  }

  makeFromStorableData(data: StorableData): AbstractDrive {
    const drive = new this.driveClass();
    drive.configuration = data.config;
    drive.setCredentials(data.credentials);
    return drive;
  }
}
