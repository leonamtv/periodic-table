import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {

  private apiUrl: string = ''

  private readonly lanthanidesNumberOfElements: number = 15
  private readonly lanthanidesInitialAtomicNumber: number = 57
  private readonly actinidesNumberOfElements: number = 15
  private readonly actinidesInitialAtomicNumber: number = 89

  constructor(
    private http: HttpClient
  ) { 
    this.apiUrl = environment.api_url
  }

  public isLanthanide ( atomicNumber: number ) : boolean {
    return this.lanthanidesInitialAtomicNumber <= atomicNumber && atomicNumber < ( this.lanthanidesInitialAtomicNumber + this.lanthanidesNumberOfElements )
  }

  public isActinide ( atomicNumber: number ) : boolean {
    return this.actinidesInitialAtomicNumber <= atomicNumber && atomicNumber < ( this.actinidesInitialAtomicNumber + this.actinidesNumberOfElements )
  }

  public getElements () : Observable<any> {
    return this.http.get(this.apiUrl)
  }

  public getElementMap () : any {
    const cols = 18
    const rows = 9
    const lanthanidesLinearGridPositions: number[] = [
      129,  130,  131,  132,  133,  134,  135,  136,  137,  138,  139,  140,  141,  142,  143
    ]
    const actinidesLinearGridPositions: number[] = [
      147,  148,  149,  150,  151,  152,  153,  154,  155,  156,  157,  158,  159,  160,  161
    ]
    
    let elementMap: any = {}

    let toIgnore: number[] = [
      /*H*/   1,      2,    3,    4,    5,    6,    7,    8,    9,    10,   11,   12,   13,   14,   15,   16, /*He*/
      /*Li    Be*/    20,   21,   22,   23,   24,   25,   26,   27,   28,   29, /*B     C     N     O     F     Ne*/ 
      /*Na    Mg*/    38,   39,   40,   41,   42,   43,   44,   45,   46,   47, /*Al    Si    P     S     Cl    Ar*/  
      /*K     Ca      Sc    Ti    V     Cr    Mn    Fe    Co    Ni    Cu    Zn    Ga    Ge    As    Se    Br    Kr*/
      /*Rb    Sr      Y     Zr    Nb    Mo    Tc    Ru    Rh    Pd    Ag    Cd    In    Sn    Sb    Te    I     Xe*/
      /*Cs    Ba*/    92, /*Hf    Ta    W     Re    Os    Ir    Pt    Au    Hg    Tl    Pb    Bi    Po    At    Rn*/
      /*Fr    Ra*/    110,/*Rf    Db    Sg    Bh    Hs    Mt    Ds    Rg    Cn    Nh    Fl    Mc    Lv    Ts    Og*/
                        /*|--------------------------------Lanthanides--------------------------------------------|*/
      126,    127,    128,/*La    Ce    Pr    Nd    Pm    Sm    Eu    Gd    Tb    Dy    Ho    Er    Tm    Yb    Lu */   
                        /*|---------------------------------Actinides---------------------------------------------|*/
      144,    145,    146,/*Ac    Th    Pa    U     Np    Pu    Am    Cm    Bk    Cf    Es    Fm    Md    No    Lr*/
    ]


    let atomicNumber = 1

    for ( let i = 0; i < rows; i++ ) {
      for ( let j = 0; j < cols; j++ ) {
        let index = i  * cols + j
        if ( atomicNumber == this.lanthanidesInitialAtomicNumber ) {
          atomicNumber += this.lanthanidesNumberOfElements
        } else if ( atomicNumber == this.actinidesInitialAtomicNumber ) {
          atomicNumber += this.actinidesNumberOfElements
        }
        if ( !toIgnore.includes ( index )) {
          elementMap[ index.toString() ] = atomicNumber
          atomicNumber += 1
        } else {
          elementMap[ index.toString() ] = ''
        }
      }
    }

    for ( let i = this.lanthanidesInitialAtomicNumber;  i < ( this.lanthanidesInitialAtomicNumber + this.lanthanidesNumberOfElements ); i++ ) {
      let lanthanideIndex = i - this.lanthanidesInitialAtomicNumber
      let elementMapIndex = lanthanidesLinearGridPositions[ lanthanideIndex ].toString()
      elementMap [ elementMapIndex ] = i
    }

    for ( let i = this.actinidesInitialAtomicNumber; i < ( this.actinidesInitialAtomicNumber + this.actinidesNumberOfElements ); i++ ) {
      let actinideIndex = i - this.actinidesInitialAtomicNumber
      let elementMapIndex = actinidesLinearGridPositions [ actinideIndex ].toString()
      elementMap [ elementMapIndex ] = i
    }

    return elementMap
  }

}
