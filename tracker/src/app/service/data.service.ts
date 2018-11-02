import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: Http) {}

  getImpacts() {
    const url = `${this.apiUrl}/impact/?format=json`;
    return this.http.get(url, this.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getPriorities() {
    const url = `${this.apiUrl}/priority/?format=json`;
    return this.http.get(url, this.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getTimeSensitivenesses() {
    const url = `${this.apiUrl}/timesensitiveness/?format=json`;
    return this.http.get(url, this.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getApplications() {
    const url = `${this.apiUrl}/application/?format=json`;
    return this.http.get(url, this.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getVersions() {
    const url = `${this.apiUrl}/version/?format=json`;
    return this.http.get(url, this.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getModules() {
    const url = `${this.apiUrl}/module/?format=json`;
    return this.http.get(url, this.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getStatus() {
    const url = `${this.apiUrl}/status/?format=json`;
    return this.http.get(url, this.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getUsers() {
    const url = `${this.apiUrl}/users/?format=json`;
    return this.http.get(url, this.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getGroups() {
    const url = `${this.apiUrl}/groups/?format=json`;
    return this.http.get(url, this.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  private jwt() {
        // create authorization header with jwt token
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // if (!currentUser) {
        //   alert('No Current User');
        // }
        if (currentUser && currentUser.token) {
            const headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
  }
}
