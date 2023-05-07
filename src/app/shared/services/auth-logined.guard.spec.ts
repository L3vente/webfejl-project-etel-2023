import { TestBed } from '@angular/core/testing';

import { AuthLoginedGuard } from './auth-logined.guard';

describe('AuthLoginedGuard', () => {
  let guard: AuthLoginedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthLoginedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
