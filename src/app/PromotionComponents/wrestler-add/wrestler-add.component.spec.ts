import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrestlerAddComponent } from './wrestler-add.component';

describe('WrestlerAddComponent', () => {
  let component: WrestlerAddComponent;
  let fixture: ComponentFixture<WrestlerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WrestlerAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrestlerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
