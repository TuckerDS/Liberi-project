import { Component, OnInit } from '@angular/core';
import { Injectable, Inject } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Event } from '../event/event.model';
import { EventService } from '../services/event.service';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
@Injectable()
export class AddEventComponent implements OnInit {
  EVENT_ROUTE = '/event';
  ENDPOINT: string;
  uploader: FileUploader;
<<<<<<< HEAD
  longitude: number;
  latitude: number;
=======
  longitude = 0;
  latitude = 0;
>>>>>>> dev

  // Corrige los errores de compilación de angular,
  // las propiedades deben existir previamente.
  myForm: any;
  selectOptions: any;
  isDisabled: any;

  newEvent = {
    user_id: '',
    title: '',
    description: '',
    category: '',
<<<<<<< HEAD
    latitude: 0,
    longitude: 0,
=======
    latitude: 40.3919145,
    longitude: -3.6990801,
>>>>>>> dev
    permanent: false,
    startDate: new Date(),
    endDate: new Date(),
    picture: ''
  };
<<<<<<< HEAD
=======

>>>>>>> dev
  startHour = '';
  endHour = '';
  start = '';
  end = '';

  feedback: string;

  user_id: any;
  loggedUser: any;

  constructor (
    @Inject('BASE_ENDPOINT') private BASE: string,
    @Inject('API_ENDPOINT') private API: string,
    private ev: EventService,
    private router: Router,
    private sessionService: SessionService) {
      this.ENDPOINT = BASE + API;
      this.uploader = new FileUploader({
        url: this.ENDPOINT + this.EVENT_ROUTE
      });
<<<<<<< HEAD



=======
>>>>>>> dev
    }

  ngOnInit() {
    // Route Guard
    this.loggedUser = this.sessionService.loggedUser;
<<<<<<< HEAD
    if( this.loggedUser ){
=======
    if ( this.loggedUser ) {
>>>>>>> dev
      this.newEvent.user_id =  this.sessionService.loggedUser._id;
    } else {
      this.router.navigate(['/login']);
    }
    this.sessionService.getLogginEmitter().subscribe(
      user => {
        if (user) {
          this.loggedUser = user;
        } else {
          this.router.navigate(['/login']);
        }
<<<<<<< HEAD
      });

=======
      }
    );
>>>>>>> dev

    this.uploader.onSuccessItem = (item, response) => {
      this.feedback = JSON.parse(response).message;
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };
<<<<<<< HEAD
=======

    // get current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
           this.newEvent.latitude = position.coords.latitude;
           this.newEvent.longitude = position.coords.longitude;
      });
    }
>>>>>>> dev
  }


  submitForm(myForm) {

<<<<<<< HEAD
    this.newEvent.startDate.setTime(Date.parse(this.start + " " + this.startHour));
    this.newEvent.endDate.setTime(Date.parse(this.end + " " + this.endHour));

    if (this.uploader.queue.length === 0) {
      console.log("lalocalizacion que se envia sin foto")
      console.log(this.newEvent.latitude);
      console.log(this.newEvent.longitude);
=======
    this.newEvent.startDate.setTime(Date.parse(this.start + ' ' + this.startHour));
    this.newEvent.endDate.setTime(Date.parse(this.end + ' ' + this.endHour));

    if (this.uploader.queue.length === 0) {
>>>>>>> dev
      this.ev.addEvent(this.newEvent)
        .subscribe( event => {
          this.newEvent = event;
          this.router.navigate(['']);
<<<<<<< HEAD
        })
    } else {
      console.log("lalocalizacion que se envia CON foto")
      console.log(this.newEvent.latitude);
      console.log(this.newEvent.longitude);
=======
        });
    } else {
>>>>>>> dev
      this.uploader.onBuildItemForm = (item, form) => {
        form.append('user_id', this.loggedUser._id);
        form.append('title', this.newEvent.title);
        form.append('description', this.newEvent.description);
        form.append('category', this.newEvent.category);
        form.append('latitude', this.newEvent.latitude);
        form.append('longitude', this.newEvent.longitude);
        form.append('permanent', this.newEvent.permanent);
        form.append('startDate', this.newEvent.startDate);
        form.append('endDate', this.newEvent.endDate);
      };
      this.uploader.uploadAll();
      this.router.navigate(['']);
    }
  }

  updatePosition(e) {
    this.newEvent.latitude = e.latitude;
<<<<<<< HEAD
     this.newEvent.longitude = e.longitude ;
=======
    this.newEvent.longitude = e.longitude ;
>>>>>>> dev
    this.longitude = e.longitude;
    this.latitude = e.latitude;
  }
}
