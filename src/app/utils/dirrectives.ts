import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';


@Directive({
  selector: '[drDynamicColor]',
})
export class ColorDirective implements OnChanges {

  @Input() color!: string | undefined;

  constructor(
    private elementRef: ElementRef
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateColor();
  }

  updateColor(): void {
    this.elementRef.nativeElement.style.removeProperty('--color-dynamic');
    this.elementRef.nativeElement.style.setProperty('--color-dynamic', '#' + (this.color ? this.color : 'ffffff'), 'important');
  }

}
