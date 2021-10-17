import { Component, Input, OnInit } from '@angular/core';
import { ColorUtil } from '../util/color.util';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: [ './element.component.scss' ]
})
export class ElementComponent implements OnInit {

  private readonly units: any = {
    'atomic_mass' : 'g/mol',
    'density' : 'kg/m³'
  }

  @Input() element: any = {}

  constructor() {}

  ngOnInit(): void { }

  public getTempPropertiesTable () {
    return [
      'boil', 'melt'
    ]
  }

  public getUnitByPropertyTable ( property: string ) {
    return ( property in this.units ) ? this.units[property] : ''
  }

  public getPropertiesTable () {
    return [
      'appearance', 'atomic_mass', 'category', 'density', 
      'phase', 'number', 'period', 'discovered_by', 'boil', 
      'melt'
    ]
  }

  public hasProperty ( property: string ) : boolean {
    return property in this.element && this.element[property] && this.element[property] != ''
  }

  public getProperty ( property: string ) {
    const defaultContent: string = 'unknown'
    if ( this.element ) {
      if ( this.getTempPropertiesTable().includes ( property )) {
        if ( this.element[property] ) {
          return this.element[property];
        } else  
          return null;
      }
      if ( this.element[property] ) {
        return this.element[property];
      } 
    } 
    return defaultContent;
  }

  public getColor () {
    if ( this.element && this.element['cpk-hex']) {
      let cpkHexColor = this.element['cpk-hex']
      let result: any = ColorUtil.hexToRgb ( '#' + cpkHexColor )

      if ( result )
        return ColorUtil.contrastColor ( result.r, result.g, result.b )
    } 
    return ColorUtil.contrastColor ( 255, 255, 255 )
  }

  public getBackgroundColor () {
    const whiteColor: string = 'white'
    if ( this.element['cpk-hex'] )
      return '#' + this.element['cpk-hex']
    else
      return whiteColor
  }

}
