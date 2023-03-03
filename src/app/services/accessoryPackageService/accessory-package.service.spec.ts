import { TestBed } from '@angular/core/testing';

import { AccessoryPackageService } from './accessory-package.service';

describe('AccessoryPackageService', () => {
  let service: AccessoryPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessoryPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
