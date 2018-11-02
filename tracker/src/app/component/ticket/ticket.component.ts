import { Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';


import { Ticket} from '../../data/tickets';
import { TicketService} from '../../service/ticket.service';

@Component({
  selector: 'ticket',
  templateUrl: './html/ticket.component.html',
  styleUrls: ['./css/ticket.component.css']
})

export class TicketComponent implements OnInit {

  protected ticketCollection: Ticket[];
  responsible: any;
  error: any;
  selectedTicket: Ticket;
  name = 'Ticket\'s List';

  constructor(private ticketService: TicketService,
              private router: Router) { }


  ngOnInit() {
    this.ticketService.getAllTicket().subscribe(tickets => {
      this.ticketCollection = tickets;
    });
  }

  onSelect(ticket: Ticket): void {
    this.selectedTicket = ticket;
    this.router.navigate(['/details', this.selectedTicket.id]);
  }
}
