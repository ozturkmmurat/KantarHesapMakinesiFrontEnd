import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoryPackageCrudComponent } from './accessory-package-crud.component';

describe('AccessoryPackageCrudComponent', () => {
  let component: AccessoryPackageCrudComponent;
  let fixture: ComponentFixture<AccessoryPackageCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessoryPackageCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessoryPackageCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
