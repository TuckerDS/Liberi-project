import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  loggedUser: any;

  constructor(
    private router: Router,
    private sessionService: SessionService) { }

  ngOnInit() {
    this.loggedUser = this.sessionService.loggedUser;
    this.sessionService.getLogginEmitter().subscribe(
      user => {
        if (user) {
          this.loggedUser = user;
        } else { this.router.navigate(['/login']); }
      });
  }

  editUser() {
    this.router.navigate(['/user/edit']);
  }
}
