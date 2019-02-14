import { Component, OnInit, Input} from '@angular/core';
import { DatePipe } from '@angular/common';

import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import { Ticket} from '../../data/tickets';
import { Comment } from '../../data/comment';


import {TicketService} from '../../service/ticket.service';
import { AlertService } from '../../service/alert.service';
import {DataTransferService} from "../../service/dataTransfer.service";

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'ticket-detail',
  templateUrl: './html/ticket-detail.component.html',
  styleUrls: ['./css/ticket-detail.component.css']
})



export class TicketDetailComponent implements OnInit {
  @Input() ticket: Ticket;
  comments: Comment[];
  error: any;
  model: any = {};
  title = 'Details of';
  dateCreation: string;

  constructor(
    private alertService: AlertService,
    private dataTransfer: DataTransferService,
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private location: Location) {
    const dateNow = new DatePipe('en-EN');
    this.dateCreation = dateNow.transform(new Date(), 'yyyy/mm/dd hh:mm:ss');
    this.ticket = this.dataTransfer._getDataHandler();
  }

  ngOnInit() {
    this.getTicket();
  }

  getTicket(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.ticketService.getTicketById(id)
      .subscribe(ticket => this.ticket = ticket);
  }

  refresh(): void {
    location.reload();
  }
}
