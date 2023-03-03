import { TestBed } from '@angular/core/testing';

import { CostVariableService } from './cost-variable.service';

describe('CostVariableService', () => {
  let service: CostVariableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostVariableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
