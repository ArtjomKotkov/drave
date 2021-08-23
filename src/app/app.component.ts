import {Component, OnInit} from '@angular/core';
import {DrivesStoreService} from './backend/services/shared/store.service';
import {CommonConfigService} from './backend/services/common/common-config.service';


@Component({
  selector: 'dr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'drave';

  constructor(
    private drivesStoreService: DrivesStoreService,
    private commonConfigService: CommonConfigService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.drivesStoreService.connect();
    this.commonConfigService.connect();
  }
}
