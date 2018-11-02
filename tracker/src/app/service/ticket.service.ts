import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Ticket} from '../data/tickets';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable()
export class TicketService {
  private apiUrl = 'http://127.0.0.1:8000/tickets';

  constructor(private http: Http, private _http: HttpClient) { }

  getAllTicket(): Observable<Array<Ticket>> {
    return this._http.get<Array<Ticket>>(`${this.apiUrl}/?format=json`)
  }



  getPlaned() {
    const url = `${this.apiUrl}/?format=json`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json());
  }

  // getTicketsPlaned(query: string) {
  //   const url = `${this.apiUrl}/?format=json`;
  //   return this.http.get(url + '/?' + query)
  //     .toPromise()
  //     .then(response => response.json())
  //     .catch(this.handleError);
  // }

  getTicket(id: number): Promise<Ticket> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url, this.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  createTicket(ticket: Ticket) {
    return this.http.post('http://127.0.0.1:8000/tickets/', ticket, this.jwt())
          .map(response => response.json());
  }

  updateTicket(ticket: Ticket) {
    return this.http.put('http://127.0.0.1:8000/tickets/' + ticket.id + '/', ticket, this.jwt())
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
