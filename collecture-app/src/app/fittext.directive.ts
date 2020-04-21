import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appFittext]'
})
export class FittextDirective {

  @Input("appFittext") defaultSize: number;
  unit = "vmin";
  incrementSize = 0.1;
  resizeTimeout = null;
  minSize = 0.1;

  @HostListener("window:resize")
  doResize() {
    if (this.resizeTimeout) { //If timeout exists, clear it regardless of if it has run yet
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout((() => {
      var targetSize = this.defaultSize;
      var elem = this.el.nativeElement;
  
      elem.style.fontSize = targetSize + this.unit;
  
      var parentWidth = elem.parentNode.offsetWidth;
      /*while (elem.scrollWidth < parentWidth) { //Grow in size
        targetSize += this.incrementSize;
        elem.style.fontSize = targetSize + this.unit;
      }*/
      while (elem.scrollWidth > parentWidth) { //Then shrink (so will always be within)
        //console.log(elem.scrollWidth, parentWidth);
        targetSize -= this.incrementSize;
        elem.style.fontSize = targetSize + this.unit;
      }
      if (targetSize < this.minSize) {
        elem.style.fontSize = this.minSize + this.unit;
      }
      this.el.nativeElement.style.opacity = 1;
    }).bind(this), 200);
  }

  constructor(private el: ElementRef) {
    this.doResize();
  }

}
