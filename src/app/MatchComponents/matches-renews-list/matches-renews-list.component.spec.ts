import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesRenewsListComponent } from './matches-renews-list.component';

describe('MatchesRenewsListComponent', () => {
  let component: MatchesRenewsListComponent;
  let fixture: ComponentFixture<MatchesRenewsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchesRenewsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchesRenewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
