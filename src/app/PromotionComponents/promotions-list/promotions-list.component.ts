import {Component, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {Promotion} from '../../DTO/Promotion';
import {PromotionService} from '../../Service/Promotion.service';
import {PromotionComponent} from '../promotion/promotion.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-promotions-list',
  imports: [
    PromotionComponent,
    NgForOf,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './promotions-list.component.html',
  styleUrl: './promotions-list.component.css'
})
export class PromotionsListComponent implements OnInit{
  promotionList: Promotion[] = [];
  searchQuery: FormControl = new FormControl("");

  constructor(private promotionService: PromotionService) {
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
}
