import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { costumerGuard } from './costumer.guard';

describe('costumerGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => costumerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
