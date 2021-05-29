import {Directive, OnInit, ElementRef, Input} from '@angular/core';


@Directive({
  selector: '[drDynamicColor]'
})
export class ColorDirective implements OnInit {

  @Input() color!: string | undefined;

  constructor(
    private elementRef: ElementRef
  ) {
  }

  ngOnInit(): void {
    this.updateColor();
  }

  updateColor(): void {
    this.elementRef.nativeElement.style.removeProperty('--color-dynamic');
    this.elementRef.nativeElement.style.setProperty('--color-dynamic', '#' + (this.color ? this.color : 'ffffff'), 'important');
  }

}
