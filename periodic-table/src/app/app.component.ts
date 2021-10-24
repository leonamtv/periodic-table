import { Component } from '@angular/core';
import { DialogService } from './components/dialog/dialog.service';
import { ElementsService } from './elements.service';
import { ColorUtil } from './util/color.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  public readonly cols = 18
  public readonly rows = 9

  public theme: 'dark' | 'base' = 'base';

  public selectedElement: any 
  public elements: any[] = new Array<any>();
  public loadingElements: boolean = false
  private elementMap: any = {}
  
  public title: string = 'periodic-table';

  constructor (
    private elementService: ElementsService,
    private dialogService: DialogService
  ) {
    this.loadElements()
    this.loadElementMap()
  }

  private parseUrlParameters () {
    const url = new URL(window.location.href);
    const { pathname } = url
    let parameter = pathname.replace('/', '')
    if ( this.elements && this.elements.length > 0 ) {
      if ( parameter && parameter.length > 0 ) {
        let element = this.elements.find( e => 
          e.name.toString().toLowerCase() == parameter.toString().toLowerCase() ||
          e.symbol.toString().toLowerCase() == parameter.toString().toLowerCase()
        )
        if ( element ) {
          this.selectedElement = element
          this.openElementDialog()
        }
      }
    }
  }

  public changeTheme () {
    if ( this.theme == 'base' ) this.theme = 'dark'
    else this.theme = 'base'
  }

  private loadElements () {
    this.loadingElements = true
    this.elementService
      .getElements()
      .subscribe( data  => {
        if ( data && data.elements ) 
          this.elements = data.elements
        this.parseUrlParameters()
      }, error => {
        console.error({ error })
      }, () => {
        this.loadingElements = false
      })
  }

  private loadElementMap () {
    this.elementMap = this.elementService.getElementMap()
  }

  private getAtomicNumberByIndexes ( i: number, j: number ) {
    let linearIndex: number = i  * this.cols + j
    let linearIndexStr: string = linearIndex.toString()
    if ( 
      this.elementMap && 
      linearIndexStr in this.elementMap
    ) {
      return ( this.elementMap[linearIndexStr] == '' ) ? -1 : this.elementMap[linearIndexStr]
    }
    return -1
  }

  private getElementByIndexes (  i: number, j: number ) {
    let atomicNumber: any = this.getAtomicNumberByIndexes ( i, j )
    if ( atomicNumber == -1 ) {
      return null
    } else {
      if ( this.elements.length > 0 ) {
        return this.elements[ atomicNumber - 1 ]
      } else {
        return null
      }
    }
  }

  public getPropertyByIndexes ( i: number, j: number, property: string ) : string {
    const defaultContent: string = ' '
    let element: any = this.getElementByIndexes ( i, j )
    if ( element ) {
      if ( element[property] ) {
        return element[property];
      } 
    } 
    return defaultContent;
  }

  public getClassesByIndexes( i: number, j: number ) {
    let defaultClass: string = 'blank-element'
    let normalClass: string = 'normal-element'
    let bottomRowsClass: string = 'lant-act-element'
    let borderClass: string = 'border-element'
    let transparentBorderClass: string = 'transparent-border-element'

    
    let classes = [ defaultClass ]
    
    if ( i == -1 ) {
      return [ 'period' ]
    } 
    if ( j == -1 ) {
      return [ 'group' ]
    }

    let element: any = this.getElementByIndexes ( i, j )
    
    if ( element ) {
      classes.push ( normalClass, borderClass )
    } else {
      classes.push ( normalClass, transparentBorderClass )
    }
    
    let isLanthanide: boolean = this.elementService.isLanthanide ( this.getAtomicNumberByIndexes ( i, j ))
    
    if  ( isLanthanide ) {
      classes.push ( bottomRowsClass )
    }
    
    return classes.join(' ')
  }

  public getBackgroundColorByIndexes ( i: number, j: number ) {
    const defaultColor: string = 'transparent'
    const whiteColor: string = 'white'
    if ( i == -1 || j == -1 ) {
      return defaultColor
    }
    let element: any = this.getElementByIndexes ( i, j )
    if ( element ) {
      if ( element['cpk-hex'] )
        return '#' + element['cpk-hex']
      else
        return whiteColor
    } 
    return defaultColor
  }

  public getColorByIndexes ( i: number, j: number ) {
    let element: any = this.getElementByIndexes ( i, j )
    
    if ( element && element['cpk-hex']) {
      let cpkHexColor = element['cpk-hex']
      let result: any = ColorUtil.hexToRgb ( '#' + cpkHexColor )

      if ( result )
        return ColorUtil.contrastColor ( result.r, result.g, result.b )
    } 
    return ColorUtil.contrastColor ( 255, 255, 255 )
  }

  public getCursorByIndexes( i: number, j: number ) {
    let element = this.getElementByIndexes ( i, j )
    return ( element ) ? 'pointer' : 'default'
  }

  public selectElement ( i: number, j: number ) {
    this.selectedElement = this.getElementByIndexes ( i, j )
    this.openElementDialog()
  }

  public openElementDialog () {
    if ( this.selectedElement )
      this.dialogService.open( this.selectedElement, 'element', ( data: any ) => {})
  }

  public openInfoDialog () {
    this.dialogService.open( {}, 'info', ( data: any ) => {})
  }

  public openElementsDialog () {
    this.dialogService.open( this.elements, 'elements', ( data: any ) => {})
  }

}

