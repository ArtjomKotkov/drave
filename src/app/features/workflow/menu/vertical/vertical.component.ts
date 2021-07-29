import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AbstractDrive} from '../../../../backend/state';
import {BehaviorSubject, Subject} from 'rxjs';
import {AbstractDriveMetaData} from '../../../../backend/state/base/model.abstract';
import {DrivesStoreService} from '../../../../backend/services/shared/store.service';
import {FormControl, FormGroup} from '@angular/forms';
import {DriveConfig} from '../../../../backend/state/base/config.abstract';

@Component({
  selector: 'dr-vertical-menu',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss']
})
export class VerticalComponent implements OnInit {

  @Input() selectedDrive: BehaviorSubject<AbstractDrive | undefined> = new BehaviorSubject<AbstractDrive | undefined>(undefined);
  @Input() opened = false;
  @Input() mode: 'drive' | 'common' = 'common';

  $driveMetaData: Subject<AbstractDriveMetaData> = new Subject<AbstractDriveMetaData>();

  // TODO: починить отображение метаданных и формы в целом.

  constructor(
    private drivesStoreService: DrivesStoreService,
  ) {}

  formDrive = new FormGroup({
    active: new FormControl(false),
    hidden: new FormControl(false)
  });

  formCommon = new FormGroup({
    enableYandex: new FormControl(false),
    enableGoogle: new FormControl(false)
  });


  ngOnInit(): void {
    this.selectedDrive.subscribe(drive => {
      if (!drive) {
        return;
      }
      this.$driveMetaData.next(drive.driveService.getMetaData());
      drive.configService.config.subscribe(config => this.setDefaultFormValue(config));
    });
  }

  deleteDrive(): void {
    const drive = this.selectedDrive.getValue();
    if (!drive) {
      return;
    }
    this.drivesStoreService.delete(drive);
  }

  setDefaultFormValue(config: DriveConfig): void {
    if (this.mode === 'drive') {
      const active = config.workflow?.default?.isEnabled ? config.workflow?.default?.isEnabled : false;
      if (!active) {
        this.formDrive.disable();
        this.formDrive.controls.active.enable();
      }
      this.formDrive.setValue({
        active,
        hidden: config.workflow?.default?.isHidden ? config.workflow?.default?.isHidden : false,
      });
    } else {

    }
  }

  saveConfig(): void {
    const currentDrive = this.selectedDrive.getValue();
  }

}
