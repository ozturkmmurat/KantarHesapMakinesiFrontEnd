import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeContentModalComponent } from './size-content-modal.component';

describe('SizeContentModalComponent', () => {
  let component: SizeContentModalComponent;
  let fixture: ComponentFixture<SizeContentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SizeContentModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SizeContentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
