import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GimmicksListComponent } from './gimmicks-list.component';

describe('GimmicksListComponent', () => {
  let component: GimmicksListComponent;
  let fixture: ComponentFixture<GimmicksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GimmicksListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GimmicksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
