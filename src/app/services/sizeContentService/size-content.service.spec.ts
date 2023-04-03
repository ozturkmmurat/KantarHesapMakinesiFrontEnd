import { TestBed } from '@angular/core/testing';

import { SizeContentService } from './size-content.service';

describe('SizeContentServiceService', () => {
  let service: SizeContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SizeContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
