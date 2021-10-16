import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {

  apiUrl: string = ''

  constructor(
    private http: HttpClient
  ) { 
    this.apiUrl = environment.api_url
  }

  public getElements () : Observable<any> {
    return this.http.get(this.apiUrl)
  }

  public getElementMap () : any {
    let elementMap: any = {}

    let toIgnore: number[] = [
      /*H*/   1,      2,    3,    4,    5,    6,    7,    8,    9,    10,   11,   12,   13,   14,   15,   16, /*He*/
      /*Li    Be*/    20,   21,   22,   23,   24,   25,   26,   27,   28,   29, /*B     C     N     O     F     Ne*/ 
      /*Na    Mg*/    38,   39,   40,   41,   42,   43,   44,   45,   46,   47, /*Al    Si    P     S     Cl    Ar*/  
      /*K     Ca      Sc    Ti    V     Cr    Mn    Fe    Co    Ni    Cu    Zn    Ga    Ge    As    Se    Br    Kr*/
      /*Rb    Sr      Y     Zr    Nb    Mo    Tc    Ru    Rh    Pd    Ag    Cd    In    Sn    Sb    Te    I     Xe*/
      /*Cs    Ba*/    92, /*Hf    Ta    W     Re    Os    Ir    Pt    Au    Hg    Tl    Pb    Bi    Po    At    Rn*/
      /*Fr    Ra*/    110,/*Rf    Db    Sg    Bh    Hs    Mt    Ds    Rg    Cn    Nh    Fl    Mc    Lv    Ts    Og*/
      126,    127,    128,/*La    Ce    Pr    Nd    Pm    Sm    Eu    Gd    Tb    Dy    Ho    Er    Tm    Yb    Lu */   
      144,    145,    146,/*Ac    Th    Pa    U     Np    Pu    Am    Cm    Bk    Cf    Es    Fm    Md    No    Lr*/
    ]
    
    const cols = 18
    const rows = 9

    let atomicNumber = 1

    for ( let i = 0; i < rows; i++ ) {
      for ( let j = 0; j < cols; j++ ) {
        let index = i  * cols + j
        if ( !toIgnore.includes ( index )) {
          elementMap[ index.toString() ] = atomicNumber
          atomicNumber += 1
        } else {
          elementMap[ index.toString() ] = ''
        }
      }
    }

    return elementMap
  }

}
