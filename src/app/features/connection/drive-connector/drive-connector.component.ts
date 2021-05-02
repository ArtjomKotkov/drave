import {Component, Input, OnInit} from '@angular/core';
import {FactoryResolver} from '../../../backend/factories';
import {AbstractDriveFactory} from '../../../backend/factories/base/drive-factory.abstract';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AbstractDrive} from '../../../backend/state';


@Component({
  selector: 'dr-drive-connector',
  templateUrl: './drive-connector.component.html',
  styleUrls: ['./drive-connector.component.scss']
})
export class DriveConnectorComponent implements OnInit {
  @Input() factoryName: string | undefined;

  factory: AbstractDriveFactory | undefined;
  sampleDrive: AbstractDrive | undefined;
  isOpen = false;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    color: new FormControl(''),
  });

  constructor(private driveFactoryResolver: FactoryResolver) {
  }

  ngOnInit(): void {
    this.factory = this.driveFactoryResolver.getFactory(this.factoryName ? this.factoryName : '');
    this.sampleDrive = this.factory?.sampleDrive;
    this.setDefaultFormValue();
  }

  continueConnection(): void {
    if (this.form.invalid) {
      return;
    }
    this.sampleDrive?.authService.redirectToAuth(this.getRedirectState());
  }

  setDefaultFormValue(): void {
    this.form.controls.color.setValue(this.sampleDrive?.settings.baseColor);
  }

  getRedirectState(): string {
    return JSON.stringify({
      ...this.getDriveData(),
      ...this.getFormData()
    });
  }

  getDriveData(): object {
    return {
      type: this.factory?.name
    };
  }

  getFormData(): object {
    return {
      name: this.form.value.name,
      color: this.form.value.color.slice(1)
    };
  }

}
