import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './html/home.component.html',
  styleUrls: ['./css/home.component.css']
})

export class HomeComponent {

  constructor(private router: Router) { }

  Home(): void {
    this.router.navigate(['/ticket']);
  }

}
