import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsListComponent } from './promotions-list.component';

describe('PromotionsListComponent', () => {
  let component: PromotionsListComponent;
  let fixture: ComponentFixture<PromotionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
