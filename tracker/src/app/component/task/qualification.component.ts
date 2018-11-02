import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Ticket } from '../../data/tickets';
import { Impact } from '../../data/impact';
import { Priority} from '../../data/priority';
import { Module } from '../../data/module';
import { Time_sensitiveness } from '../../data/time-sensitiveness';
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

export class QualificationComponent implements OnInit {

  protected ticketCollection: Ticket[];
  impacts: Impact[];
  priorities: Priority[];
  modules: Module[];
  applications: Application[];
  time_sensitivenesses: Time_sensitiveness[];
  statuses: Status[];
  users: User[];
  name = 'Ticket\'s Qualification';
  showHide: boolean;
  selectedTicket: Ticket;
  model: any = {};

  constructor(private ticketService: TicketService,
              private dataService: DataService,
              private alertService: AlertService,
              private router: Router) {
    this.showHide = false;
  }

  ngOnInit() {
    this.ticketService.getAllTicket().subscribe(tickets => {
      this.ticketCollection = tickets;
    });
    this.getImpacts();
    this.getPriorities();
    this.getModules();
    this.getTimeSensitivenesses();
    this.getApplications();
    this.getStatus();
    this.getUsers();
  }

  getImpacts(): void {
    this.dataService.getImpacts()
      .then(impacts => this.impacts = impacts);
  }

  getPriorities(): void {
    this.dataService.getPriorities()
        .then(priorities => this.priorities = priorities);
  }

  getModules(): void {
    this.dataService.getModules()
        .then(modules => this.modules = modules);
  }

  getTimeSensitivenesses(): void {
    this.dataService.getTimeSensitivenesses()
        .then(time_sensitivenesses => this.time_sensitivenesses = time_sensitivenesses);
  }

  getApplications(): void {
    this.dataService.getApplications()
        .then(applications => this.applications = applications);
  }

  getStatus(): void {
    this.dataService.getStatus()
        .then(status => this.statuses = status);
  }

  getUsers(): void {
    this.dataService.getUsers()
        .then(users => this.users = users);
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
    this.model['version_affected_set'] = ['V 0.2', ];
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
