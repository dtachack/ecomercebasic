import { TestBed } from '@angular/core/testing';

import { AuthInterceptorService } from './authinterceptor.service';

describe('AuthinterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthInterceptorService = TestBed.get(AuthInterceptorService);
    expect(service).toBeTruthy();
  });
});
