import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductModelCostComponent } from './product-model-cost.component';

describe('ProductModelCostComponent', () => {
  let component: ProductModelCostComponent;
  let fixture: ComponentFixture<ProductModelCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductModelCostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductModelCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
