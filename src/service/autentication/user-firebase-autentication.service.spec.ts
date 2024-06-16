import { TestBed } from '@angular/core/testing';

import { UserFirebaseAutenticationService } from './user-firebase-autentication.service';

describe('UserFirebaseAutenticationService', () => {
  let service: UserFirebaseAutenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFirebaseAutenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
