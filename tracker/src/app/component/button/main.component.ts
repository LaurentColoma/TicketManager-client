import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'main',
  templateUrl: './html/main.component.html',
  styleUrls: ['./css/main.component.css']
})

export class MainComponent {

  constructor(private router: Router){
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.router.navigate(['/connection']);
  }

}
