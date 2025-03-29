import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchRenewComponent } from './match-renew.component';

describe('MatchRenewComponent', () => {
  let component: MatchRenewComponent;
  let fixture: ComponentFixture<MatchRenewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchRenewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchRenewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
