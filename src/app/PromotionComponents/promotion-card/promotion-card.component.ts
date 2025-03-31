import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Promotion} from '../../DTO/Promotion';
import {PromotionService} from '../../Service/Promotion.service';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-promotion-card',
  imports: [
    NgIf
  ],
  standalone: true,
  templateUrl: './promotion-card.component.html',
  styleUrl: './promotion-card.component.css'
})
export class PromotionCardComponent {
  @Input() promotion!: Promotion;
  @Output() event = new EventEmitter<number>()

  constructor(private promotionService: PromotionService, private router: Router) {
  }
  ToPromotion(){
    this.router.navigate([`promotions/${this.promotion.id}`]);
  }
}
