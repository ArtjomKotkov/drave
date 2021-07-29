import {Component, OnInit} from '@angular/core';
import {DrivesStoreService} from '../../../backend/services/shared/store.service';
import {FactoryResolver} from '../../../backend/factories';


@Component({
  selector: 'dr-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss']
})
export class CommonComponent implements OnInit {

  constructor(
    // TODO: временное решение, пака не могу подключить удаленный диск.
    private drivesStoreService: DrivesStoreService,
    private factoryResolver: FactoryResolver,
  ) {}

  $drives = this.drivesStoreService.drives;

  ngOnInit(): void {
    const sampleDrive = this.factoryResolver.getFactory('yandex')?.sampleDrive;
    if (sampleDrive) {
      this.$drives.next({yandex: [sampleDrive]});
    }
  }

}
