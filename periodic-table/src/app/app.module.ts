import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ElementComponent } from './components/element/element.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { LabelizerPipe } from './pipes/labelizer.pipe';
import { OrbitComponent } from './components/orbit/orbit.component';
import { TempFromKelvinPipe } from './pipes/temp-from-kelvin.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { ElectronConfigColorPipe } from './pipes/electron-config-color.pipe';
import { InfoComponent } from './components/info/info.component';
import { ElementGridComponent } from './components/element-grid/element-grid.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatSortModule } from '@angular/material/sort';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';


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
    InfoComponent,
    ElementGridComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatGridListModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
