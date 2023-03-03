import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoryCrudComponent } from './accessory-crud.component';

describe('AccessoryCrudComponent', () => {
  let component: AccessoryCrudComponent;
  let fixture: ComponentFixture<AccessoryCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessoryCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessoryCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
