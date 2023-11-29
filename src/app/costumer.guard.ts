import { CanActivateFn } from '@angular/router';
import { UserAPIService } from './Services/UserAPI.service';
import { inject } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';

export const costumerGuard: CanActivateFn = (route, state) => {
  const userEmail = JSON.parse(window.localStorage.getItem("userInfo") || '{}').email;
  if(!userEmail) return false; 
  const userAPIService = inject(UserAPIService); 
  const ruter = inject(Router);

  const tokenVerifiedSubject : Subject<boolean> = new Subject<boolean>;

  const verifyUserSubscription : Subscription= userAPIService.verifyUser(userEmail).subscribe(
    {
      next: (response) => tokenVerifiedSubject.next(response),
      error: (err) => ruter.navigate(["../"]), 
      complete: () => verifyUserSubscription.unsubscribe()
    }
  );

  return tokenVerifiedSubject; 
};
