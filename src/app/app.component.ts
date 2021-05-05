import {Component, OnInit} from '@angular/core';
import {DrivesStoreService} from './backend/services/shared/store.service';
import {AbstractDrive, YandexFile} from './backend/state';

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

  $drives = this.drivesStoreService.cachedValue;
  drivesMap: {[key: string]: AbstractDrive[]} = {};
  dirData: YandexFile | undefined = undefined;

  async ngOnInit(): Promise<void> {
    await this.drivesStoreService.connect();
    this.$drives.subscribe(drives => {
      const output: {[key: string]: AbstractDrive[]} = {};
      for (const [key, drivesModels] of Object.entries(drives)) {
        output[key] = drivesModels;
      }
      this.drivesMap = output;
    });
  }

 async load(drive: AbstractDrive): Promise<void> {
    console.log(drive)
    this.dirData = await drive.driveService.getRoot() as YandexFile;
  }

}
