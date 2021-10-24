import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  public saveCsv ( data : any[], fileName: string, included: string[] = []): void {
    let now = new Date()
    let separator: string=';'
    let headers: string = ''
    let str_data: string = ''
    if ( data.length > 0 ) {
      let firstElement: any = data[0]
      let keys: string[] = Object.keys(firstElement)
      if ( included.length > 0 ) {
        headers = keys.filter( k => included.includes(k)).join(separator) + '\n'    
      } else {
        headers = keys.join(separator) + '\n'
      }
      data.forEach(element => {
        keys.forEach(key => {
          if ( included.length > 0 ) {
            if ( included.includes( key )) {
              str_data += element[key] + separator
            }
          } else {
            str_data += element[key] + separator
          }
        })
        str_data += '\n'
      })
      str_data = headers + str_data
    }

    let file = new Blob([ str_data ], { type : 'text/csv;charset=utf-8' })
    let filename = fileName + `_${now.getDate()}_${now.getMonth() + 1}_${now.getFullYear()}_${now.getTime()}.csv`
    FileSaver.saveAs(file, filename)
  }
}
