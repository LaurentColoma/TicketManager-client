import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Impact } from '../data/impact';
import { Priority } from '../data/priority';
import { TimeSensitiveness } from '../data/time-sensitiveness';
import { Application } from '../data/application';
import { Version } from '../data/version';
import { Module } from '../data/module';
import { Status } from '../data/status';
import { User } from '../data/user';
import { Group } from '../data/group';
import * as Global from '../global';

@Injectable()
export class DataService {
  private apiUrl: string;

  constructor(private http: Http, private _http: HttpClient) {
    if (!Global.PROD) {
      this.apiUrl = 'http://0.0.0.0:8000/';
    } else {
      this.apiUrl = 'http://tracker.inspyration.org/rest/';
    }
  }

  getImpacts(): Observable<Impact> {
    return this._http.get<Impact>(`${this.apiUrl}impact/?format=json`)
  }

  getPriorities(): Observable<Priority> {
    return this._http.get<Priority>(`${this.apiUrl}priority/?format=json`)
  }

  getTimeSensitivenesses(): Observable<TimeSensitiveness> {
    return this._http.get<TimeSensitiveness>(`${this.apiUrl}timesensitiveness/?format=json`)
  }

  getApplications(): Observable<Application> {
    return this._http.get<Application>(`${this.apiUrl}application/?format=json`)
  }

  getVersion(): Observable<Version> {
    return this._http.get<Version>(`${this.apiUrl}version/?format=json`)
  }

  getModules(): Observable<Module> {
    return this._http.get<Module>(`${this.apiUrl}module/?format=json`)
  }

  getStatus(): Observable<Status> {
    return this._http.get<Status>(`${this.apiUrl}status/?format=json`)
  }

  getUsers(): Observable<User> {
    return this._http.get<User>(`${this.apiUrl}users/?format=json`)
  }

  getGroup(): Observable<Group> {
    return this._http.get<Group>(`${this.apiUrl}group/?format=json`)
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
