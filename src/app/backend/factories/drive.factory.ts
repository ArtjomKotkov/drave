import {YandexDrive} from "../state";
import {AbstractDriveFactory} from "./base/drive-factory.abstract";
import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FactoryResolver {

  private yandexFactory: YandexDriveFactory = new YandexDriveFactory();

  getFactory(name: 'yandex'): AbstractDriveFactory {
    switch (name) {
      case('yandex'):
        return this.yandexFactory
    }
  }

}


class YandexDriveFactory extends AbstractDriveFactory {
  driveClass: any = new YandexDrive();
}
