import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnInit {

  @Input() element: any = {}

  constructor() {}

  ngOnInit(): void { }

  public getPropertiesTable () {
    return [
      'appearance', 'atomic_mass', 'boil', 'category', 'density', 'melt',
      'phase', 'number', 'period', 'discovered_by'
    ]
  }

  public getProperty ( property: string ) {
    const defaultContent: string = ' '
    if ( this.element ) {
      if ( this.element[property] ) {
        return this.element[property];
      } 
    } 
    return defaultContent;
  }

}
