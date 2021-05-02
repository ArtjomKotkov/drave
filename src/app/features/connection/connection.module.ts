import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConnectionRoutingModule} from './routing.module';
import {ConnectionComponent} from './connection.component';
import {DriveConnectorComponent} from './drive-connector/drive-connector.component';
import {DriveCreatorComponent} from './drive-creator/drive-creator.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ConnectionComponent,
    DriveConnectorComponent,
    DriveCreatorComponent
  ],
  imports: [
    CommonModule,
    ConnectionRoutingModule,
    ReactiveFormsModule
  ]
})
export class ConnectionModule {
}
