import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User} from '../data/user';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import * as Global from '../global';

@Injectable()
export class UserService {
  private apiUrl: string;

    constructor(private http: Http) {
      if (!Global.PROD) {
        this.apiUrl = 'http://0.0.0.0:8000/';
      } else {
        this.apiUrl = 'http://tracker.inspyration.org/rest/';
      }
    }

    getAll() {
      return this.http.get(`${this.apiUrl}users/?format=json`, this.jwt())
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    getById(id: number) {
      return this.http.get(`${this.apiUrl}users/?format=json` + id, this.jwt())
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    create(user: User) {
        return this.http.post(`${this.apiUrl}users/?format=json`, user, this.jwt())
          .map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put(`${this.apiUrl}users/?format=json` + user.id, user, this.jwt())
          .map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(`${this.apiUrl}users/?format=json` + id, this.jwt())
          .map((response: Response) => response.json());
    }

    // private helper methods

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

    private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
