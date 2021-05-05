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
  drivesMap: { [key: string]: AbstractDrive[] } = {};

  async ngOnInit(): Promise<void> {
    await this.drivesStoreService.connect();
    this.$drives.subscribe(drives => {
      const output: { [key: string]: AbstractDrive[] } = {};
      for (const [key, drivesModels] of Object.entries(drives)) {
        output[key] = drivesModels;
      }
      this.drivesMap = output;
    });
  }

  async load(drive: AbstractDrive, value?: string): Promise<void> {
    const result = (value ? await drive.driveService.get(value) : await drive.driveService.getRoot()) as YandexFile;
    drive.$buffer.next(result.embedded?.items ? result.embedded?.items : []);
  }

  async delete(drive: AbstractDrive): Promise<void> {
    await this.drivesStoreService.delete(drive);
  }
}


import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'keyValue', pure: false})
export class KeyValue implements PipeTransform {
  transform(value: any, args: any[] | null = null): any {
    const keys = Object.keys(value);
    return keys.map(key => {
      return {
        key,
        value: value[key]
      };
    });
  }
}
