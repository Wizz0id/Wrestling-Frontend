import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Promotion} from '../../DTO/Promotion';
import {PromotionService} from '../../Service/Promotion.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-promotion',
  imports: [
    NgIf
  ],
  standalone:true,
  templateUrl: './promotion.component.html',
  styleUrl: './promotion.component.css'
})
export class PromotionComponent {
  @Input() promotion!: Promotion;
  @Output() event = new EventEmitter<number>()

  constructor(private promotionService: PromotionService) {
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
            console.log('Base64 String:', base64Image); // Логирование для проверки
            this.promotion.picture = base64Image;
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }
  updatePromotion() {
    this.promotionService.updatePromotion(this.promotion.id, this.promotion);
  }
}
