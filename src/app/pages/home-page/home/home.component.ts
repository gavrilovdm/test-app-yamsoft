import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ProductI} from "../../../core/interfaces/products.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnChanges {
  @Input() inputProducts!: ProductI[]
  @Output() onScroll: EventEmitter<void> = new EventEmitter<void>();

  public products: ProductI[] = [];

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['inputProducts'].firstChange) {
      return;
    }

    if (changes['inputProducts'].currentValue !== changes['inputProducts'].previousValue) {
      this.products.push(...changes['inputProducts'].currentValue.slice(-3));
      return;
    }
  }
}
