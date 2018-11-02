import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class SprintService {
  private apiUrl = 'http://127.0.0.1:8000/sprint';

  constructor(private http: Http) {}

  getSprints() {
    const url = `${this.apiUrl}/?format=json`;
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
