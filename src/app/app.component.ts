import {Component, OnInit} from '@angular/core';
import {DrivesStorage} from './core_services/storage/local.storage';
import {FactoryResolver} from './backend/factories';

@Component({
  selector: 'dr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'drave';

  constructor(
    private drivesStorage: DrivesStorage
  ) {}

  ngOnInit(): void {
    this.drivesStorage.connect();
  }

}
