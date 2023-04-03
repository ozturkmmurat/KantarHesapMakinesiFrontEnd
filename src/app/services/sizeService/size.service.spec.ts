import { TestBed } from '@angular/core/testing';

import { HeightWeightService } from './size.service';

describe('HeightWeightService', () => {
  let service: HeightWeightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeightWeightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
