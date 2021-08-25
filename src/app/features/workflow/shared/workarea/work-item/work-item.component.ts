import {Component, Input, OnInit} from '@angular/core';
import { AbstractFile } from '../../../../../backend/state/base/model.abstract';

@Component({
  selector: 'dr-work-item',
  templateUrl: './work-item.component.html',
  styleUrls: ['./work-item.component.scss']
})
export class WorkItemComponent implements OnInit {

  @Input() item?: AbstractFile;

  defaultFolderColor = 'FCD462';

  constructor() { }

  ngOnInit(): void {
  }

  get driveColor(): string {
    return this.item?.drive.config?.common?.color ? this.item?.drive.config?.common?.color : this.defaultFolderColor;
  }

}
