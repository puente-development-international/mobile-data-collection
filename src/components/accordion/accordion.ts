import { Component, Input, ViewChild, ElementRef, Renderer } from '@angular/core';

@Component({
  selector: 'accordion',
  templateUrl: 'accordion.html'
})
export class AccordionComponent {

  @ViewChild('expandWrapper', {
    read: ElementRef
  }) expandWrapper;
  @Input('expanded') expanded;

  constructor(public renderer: Renderer) {
    console.log('Hello AccordionComponent Component');
  }

  ngAfterViewInit(){
    //this.renderer.setElementStyle(this.expandWrapper.nativeElement, 'height', this.expandHeight + 'px');
    this.renderer.setElementStyle(this.expandWrapper.nativeElement, 'height', 'auto');   
}

}
