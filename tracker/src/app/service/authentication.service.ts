import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import * as Global from '../global';

@Injectable()
export class AuthenticationService {
  public token: string;
  private apiUrl: string;

    constructor(private http: Http, public jwtHelper: JwtHelperService) {
        // set token if saved in local storage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        if (!Global.PROD) {
          this.apiUrl = 'http://0.0.0.0:8000/';
        } else {
          this.apiUrl = 'http://tracker.inspyration.org/';
        }
    }

    public login(username: string, password: string): Observable<boolean> {
      const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      });
      return this.http.post(`${this.apiUrl}auth-jwt/`, { username: username, password: password }, { headers: headers})
        .map((response: Response) => {
              const token = response.json() && response.json().token;
              if (token) {
                  this.token = token;

                  localStorage.setItem('userData', JSON.stringify({username: username, token: token}, ));

                  return true;
              } else {
                  return false;
              }
          });
    }

    public logout(): void {
      this.token = null;
      localStorage.removeItem('userData');
    }

    public isAuthenticated() {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const token = userData.token
      return !this.jwtHelper.isTokenExpired(userData.token);
    }
}
