import { Component, OnInit } from '@angular/core';
import { Injectable, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  USER_ROUTE = '/user';
  ENDPOINT: string;
  userId: string;
  currentUser: any;
  loggedUser: any;

  constructor(
    @Inject('BASE_ENDPOINT') private BASE: string,
    @Inject('API_ENDPOINT') private API: string,
    private userSvc: SessionService,
    private route: ActivatedRoute,
    private router: Router) {
      this.ENDPOINT = BASE + API;
    }

  ngOnInit() {
    this.loggedUser = this.userSvc.loggedUser;
    this.userSvc.getLogginEmitter().subscribe(
      user => {
        if (user) {
          this.loggedUser = user;
        } else { this.router.navigate(['/login']); }
      });
  }

  submitEdition() {
    this.userSvc.editUser(this.loggedUser)
      .subscribe( user => {
        this.loggedUser = user;
        this.router.navigate(['user']);
      })
  }

}
