import { Component, OnInit } from '@angular/core';

import { Ticket } from '../../data/tickets';

import { TicketService } from '../../service/ticket.service';
import { AlertService } from '../../service/alert.service';

import 'rxjs/add/operator/map';

@Component({
  selector: 'validation',
  templateUrl: './html/validation.component.html',
  styleUrls: ['./css/validation.component.css']
})

export class ValidationComponent implements OnInit{

  draggedTicket: Ticket;
  name = 'Ticket\'s Validation';
  protected ticketCollection: Ticket[];

  constructor (
    private ticketService: TicketService,
    private alertService: AlertService,
    ) { }

  ngOnInit() {
    this.ticketService.getAllTicket().subscribe(tickets => {
      this.ticketCollection = tickets;
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