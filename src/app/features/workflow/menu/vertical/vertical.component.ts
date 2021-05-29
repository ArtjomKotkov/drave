import {Component, Input, OnInit} from '@angular/core';
import {AbstractDrive} from '../../../../backend/state';
import {BehaviorSubject, Subject} from 'rxjs';
import {AbstractDriveMetaData} from '../../../../backend/state/base/model.abstract';
import {getContrastColor} from '../../../../utils';

@Component({
  selector: 'dr-vertical-menu',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss']
})
export class VerticalComponent implements OnInit {

  @Input() selectedDrive: BehaviorSubject<AbstractDrive | undefined> = new BehaviorSubject<AbstractDrive | undefined>(undefined);

  $driveMetaData: Subject<AbstractDriveMetaData> = new Subject<AbstractDriveMetaData>();

  constructor() {
  }

  ngOnInit(): void {
    this.selectedDrive.subscribe(drive => {
      if (!drive) {
        return;
      }
      this.$driveMetaData.next(drive.driveService.getMetaData());
    });
  }

  getContrastColor_(hex: string): string {
    return getContrastColor(hex);
  }

}
