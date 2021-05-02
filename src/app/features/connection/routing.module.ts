import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConnectionComponent} from './connection.component';
import {DriveCreatorComponent} from './drive-creator/drive-creator.component';

const routes: Routes = [
  {path: '', component: ConnectionComponent},
  {path: 'make', component: DriveCreatorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectionRoutingModule { }
