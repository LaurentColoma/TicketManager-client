import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import * as Global from '../global';

@Injectable()
export class AuthenticationService {
  public token: string;
  private apiUrl: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        if (!Global.PROD) {
          this.apiUrl = 'http://0.0.0.0:8000/';
        } else {
          this.apiUrl = 'http://tracker.inspyration.org/';
        }
    }

    login(username: string, password: string): Observable<boolean> {
      const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      });
      return this.http.post(`${this.apiUrl}auth-jwt/`, { username: username, password: password }, { headers: headers})
        .map((response: Response) => {
              // login successful if there's a jwt token in the response
              const token = response.json() && response.json().token;
              if (token) {
                  // set token property
                  this.token = token;

                  // store username and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                  // return true to indicate successful login
                  return true;
              } else {
                  // return false to indicate failed login

                  return false;
              }
          });
    }

    logout(): void {
      // clear token remove user from local storage to log user out
      this.token = null;
      localStorage.removeItem('currentUser');
    }
}
