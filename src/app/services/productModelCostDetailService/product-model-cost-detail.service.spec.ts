import { TestBed } from '@angular/core/testing';

import { ProductModelCostDetailService } from './product-model-cost-detail.service';

describe('ProductModelCostDetailService', () => {
  let service: ProductModelCostDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductModelCostDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
