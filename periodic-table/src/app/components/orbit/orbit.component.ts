import { Component, ElementRef, Input, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';

@Component({
  selector: 'orbit',
  templateUrl: './orbit.component.html',
  styleUrls: ['./orbit.component.scss']
})
export class OrbitComponent implements AfterViewInit, OnDestroy  {

  @Input() element: any = {}
  @Input() width: number = 300
  @Input() height: number = 300

  public oneCyclePer: number = 6
  
  private intervalId: any
  private angle: number = 0
  private intervalMs: number = 1

  public minInterval: number = 1
  public maxInterval: number = 20
  public stepInterval: number = 1

  @ViewChild("canvas", { static: false }) canvas: ElementRef | undefined

  constructor() { }

  ngAfterViewInit(): void { 
    this.drawOrbit()
    this.intervalId = setInterval (() => {
      this.drawOrbit()
    }, this.intervalMs)
  }

  ngOnDestroy (): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  
  private drawOrbit () {
    const { shells } = this.element
    const layerOffset = 15
    const electronRadius = 3
    const date = new Date()

    if (this.canvas && this.canvas.nativeElement) {
      let ctx = this.canvas.nativeElement.getContext("2d");

      ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

      let width = this.canvas.nativeElement.width
      let height = this.canvas.nativeElement.height

      let centerX = width / 2;
      let centerY = height / 2;

      if ( shells && shells.length > 0 ) {

        let outerInnerCircle = new Path2D();

        outerInnerCircle.arc(centerX, centerY, layerOffset, 0, 2 * Math.PI);

        ctx.fillStyle = "red";
        ctx.lineWidth = 1;
        ctx.fill(outerInnerCircle);

        let layerRadius = layerOffset

        shells.forEach(( shell: number )=> {
          layerRadius += layerOffset 

          let angularDifference = parseInt(( 360 / shell).toString())

          for ( let i = 0; i < shell; i++ ) {
            let electronCircle = new Path2D();
            
            let offsetAngle   = Math.PI / 180 * ( angularDifference * i )
            let electronAngle = Math.PI / 180 * this.angle + offsetAngle

            let secondX = centerX + layerRadius * Math.cos(electronAngle);
            let secondY = centerY + layerRadius * Math.sin(electronAngle);

            electronCircle.arc( secondX, secondY, electronRadius, 0, 2 * Math.PI);
            
            ctx.fillStyle = "green";
            ctx.lineWidth = 1;
            ctx.fill(electronCircle);
          }
          
          let layerCircle = new Path2D();

          layerCircle.arc( centerX, centerY, layerRadius, 0, 2 * Math.PI);
          
          ctx.strokeStyle = "grey";
          ctx.lineWidth = 1;
          ctx.stroke(layerCircle);

          
        });

        let secondsMs: number =  (( date.getSeconds() % this.oneCyclePer ) * 1000 ) + ( date.getMilliseconds())

        this.angle = secondsMs * 360 / ( this.oneCyclePer * 1000 )
        this.angle = parseInt(this.angle.toString())

      }

    }
  }

}
