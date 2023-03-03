import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostVariableComponent } from './cost-variable.component';

describe('CostVariableComponent', () => {
  let component: CostVariableComponent;
  let fixture: ComponentFixture<CostVariableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostVariableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
