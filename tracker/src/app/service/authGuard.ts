import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {}

  canActivate() {
      if (localStorage.getItem('userData')) {
          if(!this.auth.isAuthenticated())
            return false;
          return true;
      }
      return false;
}
