import { TestBed } from '@angular/core/testing';

import { ModelAccessoryDetailService } from './model-accessory-detail.service';

describe('ModelAccessoryDetailService', () => {
  let service: ModelAccessoryDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelAccessoryDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
