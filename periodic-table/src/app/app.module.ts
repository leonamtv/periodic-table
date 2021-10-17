import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ElementComponent } from './element/element.component';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { LabelizerPipe } from './labelizer.pipe';
import { OrbitComponent } from './orbit/orbit.component';
import { TempFromKelvinPipe } from './temp-from-kelvin.pipe';
import { CapitalizePipe } from './capitalize.pipe';
import { ElectronConfigColorPipe } from './electron-config-color.pipe';
import { InfoComponent } from './info/info.component';

@NgModule({
  declarations: [
    AppComponent,
    ElementComponent,
    DialogComponent,
    LabelizerPipe,
    OrbitComponent,
    TempFromKelvinPipe,
    CapitalizePipe,
    ElectronConfigColorPipe,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
