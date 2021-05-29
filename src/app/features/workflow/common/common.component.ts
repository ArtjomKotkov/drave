import {Component, OnInit} from '@angular/core';
import {DrivesStoreService} from '../../../backend/services/shared/store.service';


@Component({
  selector: 'dr-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss']
})
export class CommonComponent implements OnInit {

  constructor(
    private drivesStoreService: DrivesStoreService
  ) {}

  $drives = this.drivesStoreService.drives;

  ngOnInit(): void {
  }

}
