import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';

import {FactoryResolver} from './backend/factories';
import {DrivesStoreService} from './backend/services/shared/store.service';
import {LocalStorageService} from './core_services/storage/local.storage';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    FactoryResolver,
    DrivesStoreService,
    LocalStorageService
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
