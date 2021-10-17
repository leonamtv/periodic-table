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
  
  public open( data: any, type : 'element' | 'info' = 'element' ,  after: any = () => {}) {
      this.dialogRef = this.dialog.open(
        DialogComponent,
        {
          data : { 
            data,
            type 
          },
          height: ( type == 'element' ) ? ( window.innerHeight - 100 ) + 'px' : ( window.innerHeight * 0.6 ) + 'px',
          width: '1200px',
          autoFocus: false,
        }
      );
    this.dialogRef.afterClosed().subscribe(after);
  }

  public close() {
    this.dialogRef.close()
  }

}
