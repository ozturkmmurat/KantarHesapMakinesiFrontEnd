import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationCostComponent } from './installation-cost.component';

describe('InstallationCostComponent', () => {
  let component: InstallationCostComponent;
  let fixture: ComponentFixture<InstallationCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallationCostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstallationCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
