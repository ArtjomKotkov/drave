import {Component, OnInit} from '@angular/core';
import {FactoryResolver} from '../../../backend/factories';
import {AbstractDrive} from '../../../backend/state';
import {DrivesStoreService} from '../../../backend/services/shared/store.service';
import {DriveFactories} from '../../../backend/factories/drive.factory';
import {CommonConfig} from '../../../backend/state/base/config.abstract';
import {driveConfig} from './drive-creator.const';


@Component({
  selector: 'dr-drive-creator',
  templateUrl: './drive-creator.component.html',
  styleUrls: ['./drive-creator.component.scss']
})
export class DriveCreatorComponent implements OnInit {

  constructor(
    private driveFactoryResolver: FactoryResolver,
    private drivesStoreService: DrivesStoreService,
  ) {
  }

  factory: DriveFactories | undefined;
  drive: AbstractDrive | undefined;

  async ngOnInit(): Promise<void> {

    await this.createDrive();
  }

  async createDrive(): Promise<void> {
    const commonConfig = this.extractState();
    if (!commonConfig || !commonConfig.type) {
      return;
    }
    this.factory = this.driveFactoryResolver.getFactory(commonConfig.type);
    if (!this.factory) {
      return;
    }
    this.drive = this.factory.make();
    const fullConfig = driveConfig;
    fullConfig.common = commonConfig;
    await this.drive.configure({
      config: fullConfig
    });

  }

  extractState(): CommonConfig | undefined {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const state = params.get('state');
    return state ? JSON.parse(state) as CommonConfig : undefined;
  }

  save(): void {
    if (!this.drive) {
      return;
    }
    this.drivesStoreService.add(this.drive);
  }

}
