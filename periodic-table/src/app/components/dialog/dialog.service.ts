import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  dialogRef: any

  constructor(
    public dialog: MatDialog,
  ) {

  }

  public open(data: any, type: 'element' | 'info' | 'elements' = 'element', after: any = () => { }) {

    let config: any = 
      {
        data: {
          data,
          type
        },
        autoFocus: false,
      }

    if ( type == 'element' ) {
      config['width'] = (window.innerWidth - 0.02 * window.innerWidth) + 'px'
    }

    if ( type == 'elements' ) {
      config['width'] = (window.innerWidth - 0.1 * window.innerWidth) + 'px'
    }

    this.dialogRef = this.dialog.open(
      DialogComponent,
      config
    );
    this.dialogRef.afterClosed().subscribe(after);
  }

  public close() {
    this.dialogRef.close()
  }

}
