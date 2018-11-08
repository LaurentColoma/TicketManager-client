import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User} from '../data/user';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll() {
      return this.http.get('http://0.0.0.0:8000/users/?format=json', this.jwt())
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    getById(id: number) {
      return this.http.get('http://0.0.0.0:8000/users/?format=json' + id, this.jwt())
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    create(user: User) {
        return this.http.post('http://0.0.0.0:8000/users/', user, this.jwt())
          .map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put('http://0.0.0.0:8000/users/' + user.id, user, this.jwt())
          .map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('http://0.0.0.0:8000/users/' + id, this.jwt())
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
