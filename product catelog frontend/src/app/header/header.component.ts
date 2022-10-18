import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedin: boolean = false;
  loggedout: boolean = true;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('username') !== null) {
      this.loggedin = true;
      this.loggedout = false;
    }
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    this.router.navigate(['']),
      window.location.reload();
  }

}
