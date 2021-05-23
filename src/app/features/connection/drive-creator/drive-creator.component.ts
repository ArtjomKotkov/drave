import {Component, OnInit} from '@angular/core';
import {FactoryResolver} from '../../../backend/factories';
import {AbstractDrive, DriveConfig} from '../../../backend/state';
import {DrivesStoreService} from '../../../backend/services/shared/store.service';
import {DriveFactories} from '../../../backend/factories/drive.factory';


@Component({
  selector: 'dr-drive-creator',
  templateUrl: './drive-creator.component.html',
  styleUrls: ['./drive-creator.component.scss']
})
export class DriveCreatorComponent implements OnInit {

  constructor(
    private driveFactoryResolver: FactoryResolver,
    private drivesStoreService: DrivesStoreService
  ) {
  }

  factory: DriveFactories | undefined;
  drive: AbstractDrive | undefined;

  async ngOnInit(): Promise<void> {
    await this.createDrive();
  }

  async createDrive(): Promise<void> {
    const driveData = this.extractState();
    if (!driveData) {
      return;
    }
    this.factory = this.driveFactoryResolver.getFactory(driveData.type);
    if (!this.factory) {
      return;
    }
    this.drive = this.factory.make();
    await this.drive.init(driveData);
  }

  extractState(): DriveConfig | undefined {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const state = params.get('state');
    return state ? JSON.parse(state) as DriveConfig : undefined;
  }

  save(): void {
    if (!this.drive) {
      return;
    }
    this.drivesStoreService.add(this.drive);
  }

}
