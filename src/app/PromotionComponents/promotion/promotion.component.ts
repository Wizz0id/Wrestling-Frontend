import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Promotion} from '../../DTO/Promotion';

@Component({
  selector: 'app-promotion',
  imports: [],
  standalone:true,
  templateUrl: './promotion.component.html',
  styleUrl: './promotion.component.css'
})
export class PromotionComponent {
  @Input() promotion!: Promotion;
  @Output() event = new EventEmitter<number>()

  constructor() {
  }
}
