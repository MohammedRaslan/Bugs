import { TestBed } from '@angular/core/testing';

import { HelperMethodsServiceService } from './helper-methods-service.service';

describe('HelperMethodsServiceService', () => {
  let service: HelperMethodsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelperMethodsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
