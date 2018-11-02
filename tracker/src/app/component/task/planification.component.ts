import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Ticket } from '../../data/tickets';
import { Sprint } from '../../data/sprint';

import { TicketService } from '../../service/ticket.service';
import { AlertService } from '../../service/alert.service';
import { SprintService } from '../../service/sprint.service';

import 'rxjs/add/operator/map';

@Component({
  selector: 'planification',
  templateUrl: './html/planification.component.html',
  styleUrls: ['./css/planification.component.css']
})

export class PlanificationComponent implements OnInit {

  sprints: Sprint[];
  draggedTicket: Ticket;
  name = 'Ticket\'s Planification';
  ticketCollection: Ticket[];
  ticketPlaned: Ticket[];
  dateStart: string;
  dragOperation: boolean = false;
  containers: Array<Container>;

  constructor (
    private ticketService: TicketService,
    private alertService: AlertService,
    private sprintService: SprintService,) {
    const dateNow = new DatePipe('en-EN');
    this.dateStart = dateNow.transform(new Date(), 'yyyy-MM-dd');
    this.ticketService.getAllTicket().subscribe(tickets => {
      this.ticketCollection = tickets;
      console.log(this.ticketCollection);
      this.setPlaned(this.ticketCollection);
      console.log(this.ticketPlaned);
      this.containers = [
        new Container(1, 'planed', this.ticketPlaned),
        new Container(2, 'in_progress', this.ticketCollection),
        new Container(3, 'dropped', this.ticketCollection)
      ];
      console.log(this.containers[0])
    });
  }

  ngOnInit() {
    this.getSprints();

  }

  onDrag(ticket: Ticket): void {
    this.draggedTicket = ticket;
  }

  setPlaned(tickets: Ticket[]): void {
    let i = 0;
    while (tickets[i]) {
      if (tickets[i].status === 'planed') {
        this.ticketPlaned.push(tickets[i]);
      }
      i = i + 1;
    }
  }

  getSprints(): void {
    this.sprintService
      .getSprints()
      .then(sprints => this.sprints = sprints);
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
