import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Ticket } from '../../data/tickets';
import { Sprint } from '../../data/sprint';

import { TicketService } from '../../service/ticket.service';
import { AlertService } from '../../service/alert.service';
import { SprintService } from '../../service/sprint.service';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import 'rxjs/add/operator/map';

@Component({
  selector: 'planification',
  templateUrl: './html/planification.component.html',
  styleUrls: ['./css/planification.component.css']
})

export class PlanificationComponent implements OnInit {

  sprintCollection: Sprint[];
  draggedTicket: Ticket;
  title = 'Planification';
  protected ticketCollection: Ticket[];
  dateStart: string;
  dragOperation: boolean = false;
  containers: Array<Container>;
  planed: Array<Ticket> = [];
  in_progress: Array<Ticket> = [];
  dropped: Array<Ticket> = [];

  constructor (
    private ticketService: TicketService,
    private alertService: AlertService,
    private sprintService: SprintService,) {
    const dateNow = new DatePipe('en-EN');
    this.dateStart = dateNow.transform(new Date(), 'yyyy-MM-dd');
    this.ticketService.getAllTicket().subscribe(tickets => {
      this.ticketCollection = tickets;
      for (var i = 0; this.ticketCollection[i]; i++) {
        let customObj = new Ticket();
        if (this.ticketCollection[i].status === 'planed') {
          customObj = this.ticketCollection[i];
          this.planed.push(customObj);
        } else if (this.ticketCollection[i].status === 'in_progress') {
          customObj = this.ticketCollection[i];
          this.in_progress.push(customObj);
        } else if (this.ticketCollection[i].status === 'dropped')
          this.dropped.push(customObj);
      }
      this.containers = [
        new Container(1, 'planed', this.planed),
        new Container(2, 'in_progress', this.in_progress),
        new Container(3, 'dropped', this.dropped)
      ];
    });
    this.sprintService.getAllSprint().subscribe(sprints => {
      this.sprintCollection = sprints;
    })
  }

  ngOnInit() {
  }

  onDrag(ticket: Ticket): void {
    this.draggedTicket = ticket;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
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
