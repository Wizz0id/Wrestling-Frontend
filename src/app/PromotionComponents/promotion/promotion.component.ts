import {Component, OnInit} from '@angular/core';
import {Promotion} from '../../DTO/Promotion';
import {PromotionService} from '../../Service/Promotion.service';
import {NgIf} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-promotion',
  imports: [
    NgIf
  ],
  standalone:true,
  templateUrl: './promotion.component.html',
  styleUrl: './promotion.component.css'
})
export class PromotionComponent implements OnInit{
  promotion!: Promotion;

  constructor(private promotionService: PromotionService, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>
    {
      const promoId = params.get('id');
      if(promoId){
        this.promotionService.getPromotionById(promoId).subscribe(promo => this.promotion = promo);
      }
    }
  )
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files.item(0);
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const base64Image = e.target?.result?.toString().split(',')[1];
          if (base64Image) {
            this.promotion.picture = base64Image;
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }
  updatePromotion() {
    this.promotionService.updatePromotion(this.promotion.id, this.promotion).subscribe(promotion => this.promotion = promotion);
  }
}
