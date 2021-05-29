import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'dr-scroll-area',
  templateUrl: './scroll-area.component.html',
  styleUrls: ['./scroll-area.component.scss']
})
export class ScrollAreaComponent implements OnInit{

  @Input() direction = 'vertical';
  @Input() color = 'var(--color-base-blue)';

  constructor(
  ) {}

  ngOnInit(): void {
  }

}
