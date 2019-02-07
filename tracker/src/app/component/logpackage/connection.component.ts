import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../../service/alert.service';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'connection',
  templateUrl: './html/connection.component.html',
  styleUrls: ['./css/connection.component.css']
})

export class ConnectionComponent implements OnInit {

  title = 'Get Started with Tracker!';
  model: any = {};
  loading = false;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService) { }

  ngOnInit() {
      // reset login status
      this.authenticationService.logout();
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
        .subscribe(
            data => {
                this.router.navigate(['/ticket']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
  }
}
