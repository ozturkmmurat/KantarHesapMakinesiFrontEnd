import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageAccesoriesModalComponent } from './package-accesories-modal.component';

describe('PackageAccesoriesModalComponent', () => {
  let component: PackageAccesoriesModalComponent;
  let fixture: ComponentFixture<PackageAccesoriesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageAccesoriesModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageAccesoriesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
