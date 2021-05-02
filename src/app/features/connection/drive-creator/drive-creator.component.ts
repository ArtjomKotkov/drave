import {Component, OnInit} from '@angular/core';
import {FactoryResolver} from '../../../backend/factories';
import {AbstractDrive, YandexToken} from '../../../backend/state';
import {AbstractDriveFactory} from '../../../backend/factories/base/drive-factory.abstract';


@Component({
  selector: 'dr-drive-creator',
  templateUrl: './drive-creator.component.html',
  styleUrls: ['./drive-creator.component.scss']
})
export class DriveCreatorComponent implements OnInit {

  constructor(private driveFactoryResolver: FactoryResolver) {
    this.tokenData = this.extractData();
  }

  tokenData: YandexToken;
  factory: AbstractDriveFactory | undefined;
  drive: AbstractDrive | undefined;

  ngOnInit(): void {
    this.createDrive();
  }

  createDrive(): void {
    const driveData = this.decodeState();
    if (!driveData) {
      return;
    }
    this.factory = this.driveFactoryResolver.getFactory(driveData.type);
    if (this.factory) {
      this.drive = this.factory.make();
      this.drive.configuration = driveData;
      this.drive.setCredentials(this.tokenData);
    }
  }

  decodeState(): any | undefined {
    if (!this.tokenData.state) {
      return;
    }
    return JSON.parse(decodeURI(this.tokenData.state));
  }

  extractData(): YandexToken {
    const hash = location.href.split('#')[1];
    return hash.split('&').reduce((obj, item) => {
      const keyValue = item.split('=');
      return {
        ...obj,
        [keyValue[0]]: keyValue[1]
      };
    }, {}) as YandexToken;
  }

  save(): void {
    if (!this.drive) {
      return;
    }
    this.drive.save();
  }

}
