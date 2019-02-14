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
  ready: Array<Ticket> = [];
  tested: Array<Ticket> = [];
  dropped: Array<Ticket> = [];


  constructor (
    private ticketService: TicketService,
    private alertService: AlertService,) {
    this.ticketService.getAllTicket().subscribe(tickets => {
      this.ticketCollection = tickets;
      for (var i = 0; this.ticketCollection[i]; i++) {
        let customObj = new Ticket();
        if (this.ticketCollection[i].status === 'ready') {
          customObj = this.ticketCollection[i];
          this.ready.push(customObj);
        } else if (this.ticketCollection[i].status === 'tested') {
          customObj = this.ticketCollection[i];
          this.tested.push(customObj);
        } else if (this.ticketCollection[i].status === 'dropped')
          this.dropped.push(customObj);
      }
      this.containers = [
        new Container(1, 'ready', this.ready),
        new Container(2, 'tested', this.tested),
        new Container(3, 'dropped', this.dropped)
      ];
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
