import { Component } from '@angular/core';
import { ElementsService } from './elements.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  public readonly cols = 18
  public readonly rows = 9

  public elements: any[] = new Array<any>();
  public loadingElements: boolean = false
  private elementMap: any = {}
  
  public title: string = 'periodic-table';

  constructor (
    private elementService: ElementsService
  ) {
    this.loadElements ( )
    this.loadElementMap ()
  }

  private loadElements () {
    this.loadingElements = true
    this.elementService
      .getElements()
      .subscribe( data  => {
        this.elements = data
        console.log(data)
      }, error => {
        console.error({ error })
      }, () => {
        this.loadingElements = false
      })
  }

  private loadElementMap () {
    this.elementMap = this.elementService.getElementMap()
    console.log(this.elementMap)
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
  }

  public getElementByIndexes (  i: number, j: number ) {
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

  public getClassesByIndexes( i: number, j: number ) {
    let defaultClass: string = 'blank-element'
    let normalClass: string = 'normal-element'
    let classes = [ defaultClass ]
    let element: any = this.getElementByIndexes (  i, j )
    if ( element ) {
      classes.push ( normalClass )
    } 
    return classes.join(' ')
  }

}

