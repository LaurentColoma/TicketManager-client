import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as Global from '../global';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class SprintService {
  private apiUrl: string;

  constructor(private http: Http) {
    if (!Global.PROD) {
      this.apiUrl = 'http://0.0.0.0:8000/';
    } else {
      this.apiUrl = 'http://tracker.inspyration.org/rest/';
    }
  }

  getSprints() {
    return this.http.get(`${this.apiUrl}/?format=json`, this.jwt())
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
