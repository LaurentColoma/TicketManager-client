import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Ticket } from '../../data/tickets';

import { TicketService } from '../../service/ticket.service';
import { AlertService } from '../../service/alert.service';

import 'rxjs/add/operator/map';

@Component({
  selector: 'testing',
  templateUrl: './html/testing.component.html',
  styleUrls: ['./css/testing.component.css']
})

export class TestingComponent {

  draggedTicket: Ticket;
  name = 'Ticket\'s Testing';
  protected ticketCollection: Ticket[];
  dragOperation: boolean = false;
  containers: Array<Container>;


  constructor (
    private ticketService: TicketService,
    private alertService: AlertService,) {
    this.ticketService.getAllTicket().subscribe(tickets => {
      this.ticketCollection = tickets;
      this.containers = [
        new Container(1, 'planed', this.ticketCollection),
        new Container(2, 'in_progress', this.ticketCollection),
        new Container(3, 'dropped', this.ticketCollection)
      ];
      console.log(this.containers[0])
    });
  }

  onDrag(ticket: Ticket): void {
    this.draggedTicket = ticket;
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
