import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Ticket} from '../data/tickets';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import * as Global from '../global';

@Injectable()
export class TicketService {
  private apiUrl: string;

  constructor(private http: Http, private _http: HttpClient) {
    if (!Global.PROD) {
      this.apiUrl = 'http://0.0.0.0:8000/';
    } else {
      this.apiUrl = 'http://tracker.inspyration.org/rest/';
    }
  }

  getAllTicket(): Observable<Array<Ticket>> {
    return this._http.get<Array<Ticket>>(`${this.apiUrl}tickets/?format=json`)
  }

  getPlaned() {
    const url = `${this.apiUrl}/?format=json`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json());
  }

  getTicketById(id: number): Observable<Ticket> {
    return this._http.get<Ticket>(`${this.apiUrl}tickets/${id}/?format=json`);
  }

  createTicket(ticket: Ticket) {
    return this.http.post(`${this.apiUrl}tickets/`, ticket, this.jwt())
          .map(response => response.json());
  }

  updateTicket(ticket: Ticket) {
    return this.http.put(`${this.apiUrl}tickets/` + ticket.id + '/', ticket, this.jwt())
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
            const headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
  }
}
