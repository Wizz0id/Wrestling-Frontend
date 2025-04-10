import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionCardComponent } from './promotion-card.component';

describe('PromotionCardComponent', () => {
  let component: PromotionCardComponent;
  let fixture: ComponentFixture<PromotionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
