import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {CachedDrives} from '../../../../backend/services/shared/store.service';
import {AbstractDrive} from '../../../../backend/state';
import {CommonConfigService} from '../../../../backend/services/common/common-config.service';
import {AppConfig} from '../../../../backend/state/base/config.abstract';
import {AbstractFile} from '../../../../backend/state/base/model.abstract';
import {PathService} from '../../../../backend/services/shared/path.service';


type workareaData = Record<string, AbstractFile[]>;

@Component({
  selector: 'dr-workarea',
  templateUrl: './workarea.component.html',
  styleUrls: ['./workarea.component.scss']
})
export class WorkareaComponent implements OnInit {

  @Input() drives?: CachedDrives;

  public workAreaItemsByType: BehaviorSubject<workareaData> = new BehaviorSubject<workareaData>({});
  public workAreaItems!: AbstractFile[];

  constructor(
    private commonConfigService: CommonConfigService,
    private pathDriveService: PathService,
  ) { }

  ngOnInit(): void {
    this.commonConfigService.configObservable.subscribe(config => this.loadAllDrives(config));
    this.workAreaItemsByType.subscribe(value => {

      let workAreaItems: AbstractFile[] = [];
      Object.values(value).forEach(drivesFileList => {
        workAreaItems = [...workAreaItems, ...drivesFileList];
      });

      this.workAreaItems = workAreaItems;
    });
  }

  loadAllDrives(appConfig: AppConfig): void {
    if (!this.drives) {
      return;
    }
    this.loadDrivesData(this.sortAvailableDrives(appConfig, this.drives));
  }

  sortAvailableDrives(commonConfig: AppConfig, drives: CachedDrives): CachedDrives {
    const sortedCachedDrives: CachedDrives = {};
    Object.keys(drives).filter(key => this.sorterAvailableDrives(commonConfig, key)).forEach(key => {
      sortedCachedDrives[key] = drives[key];
    });
    return sortedCachedDrives;
  }

  sorterAvailableDrives(commonConfig: AppConfig, type: string): boolean {
    switch (type) {
      case 'yandex':
        return !commonConfig.workflow.yandexEnabled;
      case 'google':
        return !commonConfig.workflow.googleEnabled;
      default:
        return true;
    }
  }

  async loadDrivesData(drives: CachedDrives, forceDelete = false): Promise<void> {
    let workAreaItemsByType: workareaData = this.workAreaItemsByType.getValue();

    workAreaItemsByType = forceDelete ? {} : this.filterExpectedDrivesTypes(workAreaItemsByType, Object.keys(drives));

    if (!Object.keys(drives).length) {
      this.workAreaItemsByType.next(workAreaItemsByType);
      return;
    }

    for (const driveTypeKey of Object.keys(drives)) {

      if (Object.keys(workAreaItemsByType).includes(driveTypeKey)) {
        return;
      }

      for (const drive of drives[driveTypeKey]) {
        const folderData = await this.loadFolder(drive);
        if (!workAreaItemsByType.hasOwnProperty(driveTypeKey)) {
          workAreaItemsByType[driveTypeKey] = [];
        }
        workAreaItemsByType[driveTypeKey] = workAreaItemsByType[driveTypeKey].concat(folderData);
        this.workAreaItemsByType.next(workAreaItemsByType);
      }

    }

  }

  filterExpectedDrivesTypes(data: workareaData, availableTypes: string[]): workareaData {
    const filteredData: workareaData = {};
    Object.keys(data).forEach(key => {
      if (availableTypes.includes(key)) {
        filteredData[key] = data[key];
      }
    });
    return filteredData;
  }

  async loadFolder(drive: AbstractDrive, identificator?: string): Promise<AbstractFile[]> {
    const file = (
      !identificator ? await drive.driveService.getRoot() : await drive.driveService.get(identificator)
    )?.nested?.files;
    this.pathDriveService.addForDrive(drive);
    return file ? file : [];
  }

}
