import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import * as Global from '../global';

import { Comment } from '../data/comment';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class CommentService {
  private apiUrl: string;

  constructor(private http: Http) {
    if (!Global.PROD) {
      this.apiUrl = 'http://0.0.0.0:8000/';
    } else {
      this.apiUrl = 'http://tracker.inspyration.org/rest/';
    }
  }

  getComment() {
    return this.http.get(this.apiUrl, this.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  createComment(comment: Comment) {
    return this.http.post(this.apiUrl, comment)
      .map(response => response.json());
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
      const headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
      return new RequestOptions({headers: headers});
    }
  }
}
