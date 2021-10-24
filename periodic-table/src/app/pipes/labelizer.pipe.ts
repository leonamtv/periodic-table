import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labelizer'
})
export class LabelizerPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let splitedValues: string[] = value.split('_')
    let capitalizedValues: string[] = splitedValues.map( val => {
      return val.charAt(0).toUpperCase() + val.slice(1)
    })
    return capitalizedValues.join(' ');
  }

}
