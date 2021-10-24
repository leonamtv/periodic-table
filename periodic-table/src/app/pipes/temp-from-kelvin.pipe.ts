import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempFromKelvin'
})
export class TempFromKelvinPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): any {

    if ( !value )
      return null

    const separador: string = '  |  '
    const decimalPlaces: number = 2
    
    const kelvin: number = Number(value)
    const celsius: number = kelvin - 273.15
    const fahrenheit: number = kelvin * 9 / 5 - 459.67

    const retorno: string = 
      kelvin.toFixed(decimalPlaces)      + 'K' + separador + 
      celsius.toFixed(decimalPlaces)     + '°C' + separador + 
      fahrenheit.toFixed(decimalPlaces)  + '°F'
    return retorno;
  }

}
