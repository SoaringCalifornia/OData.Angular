import { ConfigService } from './config.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GridOdataComponent } from './grid-odata/grid-odata.component';

import {
  DxDataGridModule,
  DxButtonModule,
  DxFormModule,
  DxPopupModule,
  DxTabPanelModule,
  DxLoadPanelModule,
  DxTemplateModule,
  DxNumberBoxModule
} from 'devextreme-angular';

export function startupService(
  configService: ConfigService) {
  return () => configService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    GridOdataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    DxDataGridModule,
    DxButtonModule,
    DxFormModule,
    DxPopupModule,
    DxTabPanelModule,
    DxLoadPanelModule,
    DxTemplateModule,
    DxNumberBoxModule
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: startupService,
      deps: [ConfigService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
