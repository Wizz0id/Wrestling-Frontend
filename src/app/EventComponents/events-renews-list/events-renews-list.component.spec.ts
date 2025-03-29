import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsRenewsListComponent } from './events-renews-list.component';

describe('EventsRenewsListComponent', () => {
  let component: EventsRenewsListComponent;
  let fixture: ComponentFixture<EventsRenewsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsRenewsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsRenewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
