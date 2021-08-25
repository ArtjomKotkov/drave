import {AbstractDrive, StorableData, YandexDrive} from '../state';
import {AbstractDriveFactory} from './base/drive-factory.abstract';
import {Injectable} from '@angular/core';
import {GoogleDrive} from '../state/google/drive.model';
import {driveConfig} from "../../features/connection/drive-creator/drive-creator.const";
import {DriveConfig} from "../state/base/config.abstract";

export type DriveFactories = YandexDriveFactory | GoogleDriveFactory;

@Injectable({
  providedIn: 'root'
})
export class FactoryResolver {
  private factoryMap: { [key: string]: DriveFactories } = {
    yandex: new YandexDriveFactory(),
    google: new GoogleDriveFactory()
  };

  getFactory(name: string): DriveFactories | undefined {
    return this.factoryMap[name];
  }

  getAvailableFactoriesNames(): string[] {
    return Object.keys(this.factoryMap);
  }
}


class YandexDriveFactory extends AbstractDriveFactory {
  name = 'yandex';
  driveClass: any = YandexDrive;
  sampleDrive: YandexDrive = new YandexDrive(driveConfig);
}

class GoogleDriveFactory extends AbstractDriveFactory {
  name = 'google';
  driveClass: any = GoogleDrive;
  sampleDrive: GoogleDrive = new GoogleDrive(driveConfig);
}
