import { Component, OnInit } from '@angular/core';

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

  constructor (
    private ticketService: TicketService,
    private alertService: AlertService,
    private userService: UserService,
    ) { }

  ngOnInit() {
    this.ticketService.getAllTicket().subscribe(tickets => {
      this.ticketCollection =tickets;
    });
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
