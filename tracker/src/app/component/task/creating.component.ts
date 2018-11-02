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

export class CreatingComponent implements OnInit {

  name = 'Creating\'s Ticket';
  model: any = {};
  modules: Module[];
  applications: Application[];

  ngOnInit() {
    this.getApplications();
    this.getModules();
  }

  constructor(private ticketService: TicketService,
              private alertService: AlertService,
              private dataService: DataService,
              private router: Router) {}

  getApplications(): void {
    this.dataService.getApplications()
        .then(applications => this.applications = applications);
  }

  getModules(): void {
    this.dataService.getModules()
        .then(modules => this.modules = modules);
  }

  create() {
    this.model['time_sensitiveness'] = 'to be determined';
    this.model['version_affected_set'] = ['to be determined', ];
    this.model['priority'] = 'to be determined';
    this.model['status'] = 'draft';
    this.model['impact'] = 'to be determined';
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
