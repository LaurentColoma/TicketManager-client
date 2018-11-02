import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../../service/alert.service';
import { UserService} from '../../service/user.service';

@Component({
  selector: 'registration',
  templateUrl: './html/registration.component.html',
  styleUrls: ['./css/registration.component.css']
})

export class RegistrationComponent {

  name = 'registration';
  model: any = {};
  loading = false;

  constructor(
      private router: Router,
      private userService: UserService,
      private alertService: AlertService) { }

  register() {
      this.loading = true;
      this.userService.create(this.model)
          .subscribe(
              data => {
                  this.alertService.success('Registration successful', true);
                  this.router.navigate(['/connection']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }
}
