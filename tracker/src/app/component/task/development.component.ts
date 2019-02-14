import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Ticket } from '../../data/tickets';
import { User } from '../../data/user';
import { Sprint } from '../../data/sprint';

import { TicketService } from '../../service/ticket.service';
import { AlertService } from '../../service/alert.service';
import { UserService } from '../../service/user.service';

import 'rxjs/add/operator/map';

@Component({
  selector: 'development',
  templateUrl: './html/development.component.html',
  styleUrls: ['./css/development.component.css']
})

export class DevelopmentComponent implements OnInit{

  users: User[];
  draggedTicket: Ticket;
  name = 'Ticket\'s Development';
  protected ticketCollection: Ticket[];
  dragOperation: boolean = false;
  containers: Array<Container>;
  dateStart: string;
  in_progress: Array<Ticket> = [];
  ready: Array<Ticket> = [];
  dropped: Array<Ticket> = [];

  constructor (
    private ticketService: TicketService,
    private alertService: AlertService,
    private userService: UserService,) {
    const dateNow = new DatePipe('en-EN');
    this.dateStart = dateNow.transform(new Date(), 'yyyy-MM-dd');
    this.ticketService.getAllTicket().subscribe(tickets => {
      this.ticketCollection = tickets;
      for (var i = 0; this.ticketCollection[i]; i++) {
        let customObj = new Ticket();
        if (this.ticketCollection[i].status === 'in_progress') {
          customObj = this.ticketCollection[i];
          this.in_progress.push(customObj);
        } else if (this.ticketCollection[i].status === 'ready') {
          customObj = this.ticketCollection[i];
          this.ready.push(customObj);
        } else if (this.ticketCollection[i].status === 'dropped')
          this.dropped.push(customObj);
      }
      this.containers = [
        new Container(1, 'in_progress', this.in_progress),
        new Container(2, 'ready', this.ready),
        new Container(3, 'dropped', this.dropped)
      ];
    });
  }

  ngOnInit() {
    this.getUsers();
  }

  onDrag(ticket: Ticket): void {
    this.draggedTicket = ticket;
  }

  getUsers(): void {
    this.userService
      .getAll()
      .then(users => this.users = users);
  }

  updateSprint(ticket, sprint: Sprint) {
    ticket['sprint'] = sprint;
    this.ticketService.updateTicket(ticket)
      .subscribe(
        data => {
          this.alertService.success('Update done successfully', true);
        },
        error => {
          this.alertService.error(error);
        });
  }

  updateResponsible(ticket: Ticket, responsible: string) {
    ticket['responsible'] = responsible;
    this.ticketService.updateTicket(ticket)
      .subscribe(
        data => {
          this.alertService.success('Update done successfully', true);
        },
        error => {
          this.alertService.error(error);
        });
  }

  updateStatus(ticket: Ticket, status: string) {
    ticket['status'] = status;
    this.ticketService.updateTicket(ticket)
      .subscribe(
        data => {
          this.alertService.success('Update done successfully', true);
        },
        error => {
          this.alertService.error(error);
        });
  }
}

class Container {
  constructor(public id: number, public name: string, public tickets: Ticket[]) {}
}
