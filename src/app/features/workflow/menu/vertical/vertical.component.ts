import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';

import {UntilDestroy} from '@ngneat/until-destroy';

import {AbstractDrive} from '../../../../backend/state';
import {AbstractDriveMetaData} from '../../../../backend/state/base/model.abstract';
import {DrivesStoreService} from '../../../../backend/services/shared/store.service';
import {DriveConfig} from '../../../../backend/state/base/config.abstract';
import {CommonConfigService} from '../../../../backend/services/common/common-config.service';


@UntilDestroy()
@Component({
  selector: 'dr-vertical-menu',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalComponent implements OnChanges, OnInit {

  @Input() selectedDrive?: AbstractDrive;
  @Input() opened = false;
  @Input() mode: 'drive' | 'common' = 'common';

  driveMetaData?: AbstractDriveMetaData;

  loading = false;

  constructor(
    private drivesStoreService: DrivesStoreService,
    private commonConfigService: CommonConfigService,
  ) {
  }

  formDrive = new FormGroup({
    active: new FormControl(false),
    hidden: new FormControl(false)
  });

  formCommon = new FormGroup({
    enableYandex: new FormControl(false),
    enableGoogle: new FormControl(false)
  });

  ngOnInit(): void {
    this.formDrive.valueChanges.subscribe(value => this.updateDriveFormValues(value));
    this.formCommon.valueChanges.subscribe(value => this.updateCommonFormValues(value));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loading = true;
    if (this.selectedDrive) {
      this.driveMetaData = this.selectedDrive.driveService.getMetaData();
      this.setDefaultDriveFormValue(this.selectedDrive.configService.config.getValue());
    } else {
      this.setDefaultCommonFormValue();
    }
  }

  deleteDrive(): void {
    if (!confirm('Вы действительно хотите удалить этот диск?')) {
      return;
    }
    if (!this.selectedDrive) {
      return;
    }
    this.drivesStoreService.delete(this.selectedDrive);
  }

  setDefaultDriveFormValue(config: DriveConfig): void {
    if (this.mode !== 'drive') {
      return;
    }
    const active = config.workflow?.default?.isEnabled ? config.workflow?.default?.isEnabled : false;
    if (!active) {
      this.formDrive.disable();
      this.formDrive.controls.active.enable();
    }
    this.formDrive.setValue({
      active,
      hidden: config.workflow?.default?.isHidden ? config.workflow?.default?.isHidden : false,
    });
  }

  setDefaultCommonFormValue(): void {
    if (this.mode !== 'common') {
      return;
    }
    const config = this.commonConfigService.config;
    this.formCommon.setValue({
      enableYandex: config.workflow.yandexEnabled,
      enableGoogle: config.workflow.googleEnabled,
    });
  }

  updateDriveFormValues(value: Record<string, any>): void {
    if (!this.selectedDrive) {
      return;
    }
    const currentDriveConfig = this.selectedDrive.config;
    Object.keys(value).forEach(key => {
      switch (key) {
        case 'active':
          currentDriveConfig.workflow.default.isEnabled = value.active;
          break;
        case 'hidden':
          currentDriveConfig.workflow.default.isHidden = value.hidden;
          break;
      }
    });
    this.selectedDrive?.configService.set(currentDriveConfig);
  }

  updateCommonFormValues(value: Record<string, any>): void {

    const commonConfig = this.commonConfigService.config;
    Object.keys(value).forEach(key => {
      switch (key) {
        case 'enableYandex':
          commonConfig.workflow.yandexEnabled = value.enableYandex;
          break;
        case 'enableGoogle':
          commonConfig.workflow.googleEnabled = value.enableGoogle;
          break;
      }
    });
    this.commonConfigService.set(commonConfig);
  }

}
