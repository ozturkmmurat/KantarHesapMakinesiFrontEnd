import { TestBed } from '@angular/core/testing';

import { AccessoryPackageDetailService } from './accessory-package-detail.service';

describe('AccessoryPackageDetailService', () => {
  let service: AccessoryPackageDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessoryPackageDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
