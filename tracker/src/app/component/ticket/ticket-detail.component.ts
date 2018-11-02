import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Ticket} from '../../data/tickets';
import { Comment } from '../../data/comment';

import { TicketService} from '../../service/ticket.service';
import { CommentService } from '../../service/comment.service';
import { AlertService } from '../../service/alert.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'ticket-detail',
  templateUrl: './html/ticket-detail.component.html',
  styleUrls: ['./css/ticket-detail.component.css']
})

export class TicketDetailComponent implements OnInit {
  ticket: Ticket;
  comments: Comment[];
  error: any;
  model: any = {};
  name = 'Ticket\'s Detail';
  dateCreation: string;

  constructor(
    private ticketService: TicketService,
    private commentService: CommentService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    const dateNow = new DatePipe('en-EN');
    this.dateCreation = dateNow.transform(new Date(), 'yyyy/mm/dd hh:mm:ss');
  }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.ticketService.getTicket(+params.get('id')))
      .subscribe(ticket => this.ticket = ticket);
    this.getComments();
  }

  refresh(): void {
    window.location.reload();
  }

  getComments(): void {
    this.commentService
        .getComment()
        .then(comments => this.comments = comments);
  }

  createComment() {
    this.model['ticket'] = this.ticket.url;
    this.model['date'] = this.dateCreation;
    this.commentService.createComment(this.model)
      .subscribe(data => {
          this.alertService.success('Comment added', true);
        },
        error => {
          this.alertService.error(error);
        });
  }
}
