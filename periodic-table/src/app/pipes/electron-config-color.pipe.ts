import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'electronConfigColor'
})
export class ElectronConfigColorPipe implements PipeTransform {

  constructor(private sanitized: DomSanitizer) {}

  transform(value: string, ...args: unknown[]): any {

    const buildChar = ( 
      content: string,
    ) => {
      if ( content == ' ' )
        return `<div style="display: table-cell; padding: 0 3px;"> ${content} </div>`
      return `<div style="display: table-cell; font-weight=600; padding: 0;"> ${content} </div>`
    }

    const buildCustomChar = ( 
      content: string,
      color: string
    ) => {
      return `
      <div
        style="color:${color}; font-weight=600; display: table-cell; padding: 0;"
      >
        ${content}
      </div>`
    }

    let result: string = ''
    
    const colorMap: any = {
      's' : '#5dcf55',
      'p' : '#5565cf',
      'd' : '#b65fd9',
      'f' : '#c78548'
    }

    for (let i = 0; i < value.length; i++) {
      if ( value.charAt(i).trim() in colorMap ) {
        result += buildCustomChar ( value.charAt(i).trim(), colorMap[value.charAt(i).trim()])
      } else {
        result += buildChar ( value.charAt(i))
      }
    }

    result = "<div style='display: table; margin: auto'><div style='display: table-row'>" + result + "</div></div>"

    return this.sanitized.bypassSecurityTrustHtml(result);

  }

}
