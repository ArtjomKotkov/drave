import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';

import {DrivesStorage} from './core_services/storage/local.storage';
import {FactoryResolver} from './backend/factories';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [DrivesStorage, FactoryResolver],
  bootstrap: [AppComponent]
})
export class AppModule {
}
