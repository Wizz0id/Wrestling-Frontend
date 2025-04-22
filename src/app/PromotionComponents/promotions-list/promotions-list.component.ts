import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Promotion} from '../../DTO/Promotion';
import {PromotionService} from '../../Service/Promotion.service';
import {PromotionCardComponent} from '../promotion-card/promotion-card.component';

@Component({
  selector: 'app-promotions-list',
  imports: [
    ReactiveFormsModule,
    PromotionCardComponent
  ],
  standalone: true,
  templateUrl: './promotions-list.component.html',
  styleUrl: './promotions-list.component.css'
})
export class PromotionsListComponent implements OnInit{
  promotionList: Promotion[] = [];
  searchQuery: FormControl = new FormControl("");
  createFormVisible: boolean = false;
  promotionForm: FormGroup;

  constructor(private promotionService: PromotionService, private fb: FormBuilder) {
    this.promotionForm = this.fb.group({
      name: ['', Validators.required],
      fioOfCeo: ['', Validators.required],
      picture: [''],
    });
  }

  ngOnInit(): void {
    this.loadWrestlers();
  }

  loadWrestlers(): void {
    this.promotionService.getPromotions(this.searchQuery.value).subscribe((list) => this.promotionList = list);
  }

  onSearchKeyDown(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    event.preventDefault();
    if (keyboardEvent.key === 'Enter') {
      this.loadWrestlers();
    }
  }

  createPromotion(){
    this.createFormVisible = !this.createFormVisible
  }
  submitPromotion(){
    if (this.promotionForm.valid) {
      this.promotionService.createPromotion(this.promotionForm.value).subscribe(promo => this.promotionList.push(promo));
    } else {
      console.error('Форма невалидна. Проверьте все поля.');
    }
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
            this.promotionForm.value.picture = base64Image;
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  protected readonly localStorage = localStorage;
}
