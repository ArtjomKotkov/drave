import {AbstractDrive, StorableData, YandexDrive} from '../state';
import {AbstractDriveFactory} from './base/drive-factory.abstract';
import {Injectable} from '@angular/core';
import {GoogleDrive} from '../state/google/drive.model';

type driveFactories = YandexDriveFactory | GoogleDriveFactory;

@Injectable({
  providedIn: 'root'
})
export class FactoryResolver {
  private factoryMap: { [key: string]: driveFactories } = {
    yandex: new YandexDriveFactory(),
    google: new GoogleDriveFactory()
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

  async makeFromStorableData(data: StorableData): Promise<AbstractDrive> {
    const drive = new this.driveClass();
    await drive.init(data.config, data.credentials);
    return drive;
  }
}

class GoogleDriveFactory extends AbstractDriveFactory {

  name = 'google';
  driveClass: any = GoogleDrive;
  sampleDrive: GoogleDrive = new GoogleDrive();

  make(): AbstractDrive {
    return new this.driveClass();
  }

  async makeFromStorableData(data: StorableData): Promise<AbstractDrive> {
    const drive = new this.driveClass();
    await drive.init(data.config, data.credentials);
    return drive;
  }
}
