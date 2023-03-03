import { TestBed } from '@angular/core/testing';

import { ModelElectronicDetailService } from './model-electronic-detail.service';

describe('ModelElectronicDetailService', () => {
  let service: ModelElectronicDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelElectronicDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
