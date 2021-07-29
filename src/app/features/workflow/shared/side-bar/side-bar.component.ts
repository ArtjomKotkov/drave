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

  menuOpened = false;
  menuMode: 'drive' | 'common' = 'common';

  constructor() {
  }

  ngOnInit(): void {
  }

  selectDrive(drive: AbstractDrive): void {
    this.menuMode = 'drive';
    if (this.$selectedDrive.getValue() === drive) {
      this.$selectedDrive.next(undefined);
      this.menuOpened = false;
    } else {
      this.$selectedDrive.next(drive);
      this.menuOpened = true;
    }
  }

  switchCommonMenu(): void {
    this.menuMode = 'common';
    if (this.$selectedDrive.getValue()) {
      this.menuOpened = false;
      this.$selectedDrive.next(undefined);
      this.menuOpened = true;
    } else {
      this.menuOpened = !this.menuOpened;
    }
  }

}
