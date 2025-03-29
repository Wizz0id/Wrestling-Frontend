import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrestlersListComponent } from './wrestlers-list.component';

describe('WrestlersListComponent', () => {
  let component: WrestlersListComponent;
  let fixture: ComponentFixture<WrestlersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WrestlersListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrestlersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
