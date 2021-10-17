import { Component, ElementRef, Input, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'orbit',
  templateUrl: './orbit.component.html',
  styleUrls: ['./orbit.component.scss']
})
export class OrbitComponent implements AfterViewInit  {

  @Input() element: any = {}
  @Input() width: number = 400
  @Input() height: number = 400

  interval: any

  @ViewChild("canvas", { static: false }) canvas: ElementRef | undefined

  constructor() { }

  ngAfterViewInit(): void { 
    this.drawOrbit()
    this.interval = setInterval (() => {
      this.drawOrbit()
    }, 100)
  }
  
  private drawOrbit () {
    const { shells } = this.element
    const layerOffset = 20
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

          let angularDifference = 360 / shell

          for ( let i = 0; i < shell; i++ ) {
            let electronCircle = new Path2D();
            
            let dateAngle = ( 6 * ( date.getSeconds()) + 0.36 * ( date.getMilliseconds())) * Math.PI / 360
            let offsetAngle = Math.PI / 180 * ( angularDifference * i )
            let angle = dateAngle + offsetAngle - Math.PI / 2

            let secondX = centerX + layerRadius * Math.cos(angle);
            let secondY = centerY + layerRadius * Math.sin(angle);

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

      }

    }
  }

}
