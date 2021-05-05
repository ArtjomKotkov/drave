import {Component, OnInit} from '@angular/core';
import {DrivesStoreService} from './backend/services/shared/store.service';

@Component({
  selector: 'dr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'drave';

  constructor(
    private drivesStoreService: DrivesStoreService
  ) {
  }

  ngOnInit(): void {
    this.drivesStoreService.connect();
  }

}
