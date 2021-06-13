import {Component, Input, OnInit} from '@angular/core';
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

  $driveMetaData: Subject<AbstractDriveMetaData> = new Subject<AbstractDriveMetaData>();

  constructor(
    private drivesStoreService: DrivesStoreService
  ) {}

  form = new FormGroup({
    active: new FormControl(false),
    hidden: new FormControl(false)
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
    const active = config.workflow?.default?.isEnabled ? config.workflow?.default?.isEnabled : false;
    if (!active) {
      this.form.disable();
      this.form.controls.active.enable();
    }
    this.form.setValue({
      active,
      hidden: config.workflow?.default?.isHidden ? config.workflow?.default?.isHidden : false,
    });
  }

  saveConfig(): void {
    const currentDrive = this.selectedDrive.getValue();
  }

}
