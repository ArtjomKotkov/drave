import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CachedDrives} from '../../../../backend/services/shared/store.service';
import {AbstractDrive} from '../../../../backend/state';


@Component({
  selector: 'dr-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @Input() drives!: BehaviorSubject<CachedDrives>;
  @Input() direction = 'column';

  $selectedDrive: BehaviorSubject<AbstractDrive | undefined> = new BehaviorSubject<AbstractDrive | undefined>(undefined);

  constructor() {
  }

  ngOnInit(): void {
  }

  selectDrive(drive: AbstractDrive): void {
    if (this.$selectedDrive.getValue() === drive) {
      this.$selectedDrive.next(undefined);
    } else {
      this.$selectedDrive.next(drive);
    }
  }

}
