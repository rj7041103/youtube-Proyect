import { TestBed } from '@angular/core/testing';

import { ColorserviceService } from './colorservice.service';

describe('ColorserviceService', () => {
  let service: ColorserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
