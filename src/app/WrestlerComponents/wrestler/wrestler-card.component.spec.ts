import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrestlerCardComponent } from './wrestler-card.component';

describe('WrestlerCardComponent', () => {
  let component: WrestlerCardComponent;
  let fixture: ComponentFixture<WrestlerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WrestlerCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrestlerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
