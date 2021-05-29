import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';

import {FactoryResolver} from './backend/factories';
import {DrivesStoreService} from './backend/services/shared/store.service';
import {LocalStorageService} from './core_services/storage/local.storage';
import {PipesModule} from './features/pipes/pipes.module';
import {KeyValue} from './utils';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    PipesModule
  ],
  providers: [
    FactoryResolver,
    DrivesStoreService,
    LocalStorageService,
    KeyValue
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
