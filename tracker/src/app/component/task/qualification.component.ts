import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Ticket } from '../../data/tickets';
import { Impact } from '../../data/impact';
import { Priority} from '../../data/priority';
import { Module } from '../../data/module';
import { TimeSensitiveness} from "../../data/time-sensitiveness";
import { Application} from '../../data/application';
import { Status } from '../../data/status';
import { User } from '../../data/user';

import { TicketService } from '../../service/ticket.service';
import { DataService } from '../../service/data.service';
import { AlertService} from '../../service/alert.service';


@Component({
  selector: 'qualification',
  templateUrl: './html/qualification.component.html',
  styleUrls: ['./css/qualification.component.css']
})

export class QualificationComponent {

  ticketCollection: Ticket[];
  impacts: Impact;
  priorities: Priority;
  modules: Module;
  applications: Application;
  time_sensitivenesses: TimeSensitiveness;
  statuses: Status;
  users: User;
  name = 'Ticket\'s Qualification';
  showHide: boolean;
  selectedTicket: Ticket;
  model: any = {};

  constructor(private ticketService: TicketService,
              private dataService: DataService,
              private alertService: AlertService,
              private router: Router) {
    this.showHide = false;
    this.ticketService.getAllTicket().subscribe(tickets => {
      this.ticketCollection = tickets;
    });
    this.dataService.getImpacts().subscribe(impacts => {
      this.impacts = impacts;
    });
    this.dataService.getPriorities().subscribe(priorities => {
      this.priorities = priorities;
    });
    this.dataService.getModules().subscribe(modules => {
      this.modules = modules;
    });
    this.dataService.getTimeSensitivenesses().subscribe(time_sensitivenesses => {
      this.time_sensitivenesses = time_sensitivenesses;
    });
    this.dataService.getApplications().subscribe(applications => {
      this.applications = applications;
    });
    this.dataService.getStatus().subscribe(status => {
      this.statuses = status;
    });
    this.dataService.getUsers().subscribe(user => {
      this.users = user;
    });
  }

  onSelect(ticket: Ticket): void {
    this.selectedTicket = ticket;
  }

  changeShowStatus(e: boolean){
    this.showHide = e;
  }

  update(ticket: Ticket): void {
    this.model['label'] = this.selectedTicket.label;
    this.model['description'] = this.selectedTicket.description;
    this.model['id'] = this.selectedTicket.id;
    this.model['status'] = 'planed';
    this.model['version_affected_set'] = ['0.1'];
    this.model['sprint'] = 'TBD';
    this.model['roadmap'] = 'TBD';
    this.ticketService.updateTicket(this.model)
      .subscribe(
        data => {
          this.alertService.success('Update done successfully', true);
          this.router.navigate(['/ticket']);
        },
        error => {
          this.alertService.error(error);
        });
  }
}
