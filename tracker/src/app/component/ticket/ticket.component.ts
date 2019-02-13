import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {Ticket} from '../../data/tickets';
import {TicketService} from '../../service/ticket.service';
import {DataTransferService} from "../../service/dataTransfer.service";

@Component({
  selector: 'ticket',
  templateUrl: './html/ticket.component.html',
  styleUrls: ['./css/ticket.component.css']
})

export class TicketComponent {

  ticketCollection: Ticket[];
  responsible: any;
  error: any;
  toggler: boolean = false;
  title = 'Tracker';

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private dataTransfer: DataTransferService) {
    this.ticketService.getAllTicket().subscribe(tickets => {
      this.ticketCollection = tickets;
    });
  }

  onSelect(ticket: Ticket): void {
    this.dataTransfer._setDataHandler(ticket);
    this.router.navigate(['/details'])
  }

  toggle() {
    if (this.toggler === false) {
      document.getElementById('sidenav').style.display = "block";
      this.toggler = true;
    } else {
      document.getElementById('sidenav').style.display = "none";
      this.toggler = false;
    }
  }
}
