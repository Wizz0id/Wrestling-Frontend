import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrestlerComponent } from './wrestler-card.component';

describe('WrestlerComponent', () => {
  let component: WrestlerComponent;
  let fixture: ComponentFixture<WrestlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WrestlerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrestlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
