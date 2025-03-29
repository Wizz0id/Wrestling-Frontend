import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRenewComponent } from './event-renew.component';

describe('EventRenewComponent', () => {
  let component: EventRenewComponent;
  let fixture: ComponentFixture<EventRenewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventRenewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventRenewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
