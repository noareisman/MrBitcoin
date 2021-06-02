import { TestBed } from '@angular/core/testing';

import { Services.UtilService } from './services.util.service';

describe('Services.UtilService', () => {
  let service: Services.UtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Services.UtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
