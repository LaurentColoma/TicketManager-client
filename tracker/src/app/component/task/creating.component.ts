import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { TicketService } from '../../service/ticket.service';
import { AlertService} from '../../service/alert.service';
import { DataService } from '../../service/data.service';

import { Application } from '../../data/application';
import { Module } from '../../data/module';

@Component({
  selector: 'creating',
  templateUrl: './html/creating.component.html',
  styleUrls: ['./css/creating.component.css']
})

export class CreatingComponent {

  name = 'Creating\'s Ticket';
  model: any = {};
  modules: Module;
  applications: Application;
  formHandler: 0;

  constructor(private ticketService: TicketService,
              private alertService: AlertService,
              private dataService: DataService,
              private router: Router) {
    this.getApplications();
    this.getModules();
  }

  getApplications(): void {
    this.dataService.getApplications()
        .subscribe(applications => this.applications = applications);
  }

  getModules(): void {
    this.dataService.getModules()
        .subscribe(modules => this.modules = modules);
  }

  _setFormHandler(value) {
    if (this.formHandler != 0)
      this.formHandler = value
    console.log(this.formHandler);
  }

  create() {
    this.model['time_sensitiveness'] = 'TBD';
    this.model['version_affected_set'] = ['TBD'];
    this.model['priority'] = 'TBD';
    this.model['status'] = 'draft';
    this.model['impact'] = 'TBD';
    this.model['sprint'] = 'TBD';
    this.model['roadmap'] = 'TBD';
    this.model['open'] = 'True';
    this.ticketService.createTicket(this.model)
      .subscribe(data => {
          this.alertService.success('Ticket was created successfully', true);
          this.router.navigate(['/ticket']);
        },
        error => {
          this.alertService.error(error);
        });
  }
}
