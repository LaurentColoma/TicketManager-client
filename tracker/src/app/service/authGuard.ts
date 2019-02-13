import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {}

  canActivate() {
      if (localStorage.getItem('userData')) {
          if(!this.auth.isAuthenticated()) {
            this.router.navigate(['/authentication'])
            return false;
          }
          return true;
      }
      return false;
  }
}
