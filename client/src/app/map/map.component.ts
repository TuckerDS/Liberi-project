import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
<<<<<<< HEAD
// -----
import { MapsAPILoader } from 'angular2-google-maps/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgZone, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import {} from '@types/googlemaps';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MapService } from '../services/map.service';
import { SessionService } from '../services/session.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
=======
import { SessionService } from '../services/session.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgZone, ViewChild, NgModule } from '@angular/core';
import { ElementRef } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {} from '@types/googlemaps';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MapService } from '../services/map.service';
>>>>>>> dev

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  loggedUser: any;
<<<<<<< HEAD
=======
  error: any;
>>>>>>> dev
  search: any;
  completeInfo: any;
  public adress: any;
  public city: any;
  public country: any;
<<<<<<< HEAD
  feedback: string;
  error: any;
  searchQuery: any;
  searchControl: FormControl; //input
  public latitude: number = 40.3919186;
  public longitude: number = -3.6990989; // la que quiera al principio
  public zoom = 10;
  google: any;
  public query = '';
  public countries = [ 'Madrid', 'Miami', 'Murcia'];
  public filteredList = [];
  public elementRef;
  locationUser: any;


  // Notificar cambios al padre;
  @Output() onChangePosition = new EventEmitter<any>();

  notifyChangePosition() {

    this.onChangePosition.emit (
      {
        latitude: this.latitude,
        longitude: this.longitude
      }
=======
  searchControl: FormControl;     // Input control.
  public latitude = 40.3919186;   // Position at
  public longitude = -3.6990989;  // the beggining.
  public zoom = 10;
  google: any;
  public elementRef;
  locationUser: any;

  // Notify changes to parent component.
  @Output() onChangePosition = new EventEmitter<any>();

  notifyChangePosition() {
    this.onChangePosition.emit (
      { latitude: this.latitude, longitude: this.longitude }
>>>>>>> dev
    );
  }

  @ViewChild('search')
  public searchElementRef: ElementRef;

<<<<<<< HEAD
  constructor(private mapService: MapService,
              private router: Router,
              private route: ActivatedRoute, myElement: ElementRef,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private sessionService: SessionService
              // private loggedin: LoggedinService,

              ) {
                  this.elementRef = myElement;
              }
=======
  constructor( private mapService: MapService,
               private router: Router,
               private route: ActivatedRoute,
               private myElement: ElementRef,
               private mapsAPILoader: MapsAPILoader,
               private ngZone: NgZone,
               private sessionService: SessionService
             ) { this.elementRef = myElement; }
>>>>>>> dev

  ngOnInit() {

    // Session guard
    this.loggedUser = this.sessionService.loggedUser;
    this.sessionService.getLogginEmitter().subscribe(
      user => {
        this.loggedUser = user;
<<<<<<< HEAD
        console.log('USUARIO LOGADO EMMITER');
        console.log(this.loggedUser);
      }
    );



    //this.gymId = this.route.params;

    //  create search FormControl
=======
      }
    );

    //  Create search FormControl
>>>>>>> dev
    this.searchControl = new FormControl();

    // load Places Autocomplete
    const instance = this;
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
<<<<<<< HEAD
          // get the place result
=======

          // Get the place result
>>>>>>> dev
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          this.setNewPosition({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          });
<<<<<<< HEAD
          // set new position
=======
          // Set new position
>>>>>>> dev
          this.getLocationData(place);

          instance.addLocation({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          });

<<<<<<< HEAD
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          // set latitude, longitude and zoom
=======
          // Verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          // Set latitude, longitude and zoom
>>>>>>> dev
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 14;
          this.city = place.address_components[2].long_name;
          this.country = place.address_components[5].long_name;
          this.adress = place.address_components[1].long_name + ', ' + place.address_components[0].long_name;
        });
      });
    });
<<<<<<< HEAD
  }

  addLocation(location) {
    this.locationUser = location;
  }

  getLocationData(location) {
    this.completeInfo = location;
  }

=======

    // Get current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
           this.latitude = position.coords.latitude;
           this.longitude = position.coords.longitude;
      });
    }

  }

  addLocation(location) { this.locationUser = location; }

  getLocationData(location) { this.completeInfo = location; }

>>>>>>> dev
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  private setNewPosition(position) {
    this.latitude = position.lat;
<<<<<<< HEAD
    this.longitude = position.lon;
    this.zoom = 12;
  }

  // editGym() {
  //   let formInfo = {
  //     city: this.city,
  //     country: this.country,
  //     adress: this.adress,
  //     position: {
  //       latitud: this.latitude,
  //       longitud: this.longitude
  //     }
  //   }
  //   // this.session.fillInfoUbicationSignUp(formInfo, this.gymId.value.id)
  //   //   .subscribe(
  //   //     (gym) => this.success(gym),
  //   //     (err) => this.errorCb(err)
  //   // );
  //
  // }

  errorCb(err) {
    this.error = err;
    //this.gym = null;
  }

  success(gymId) {
    this.error = null;
    this.router.navigate(['gym/' + gymId]);
  }

  onSubmit(value: any): void {
    // value.user = this.session.loggedUser._id
    value.lat = this.latitude;
    value.lng = this.longitude;
    value.raw = this.completeInfo.formatted_address;
    this.mapService.createAddress(value).subscribe();
    console.log(value);
  }


  mapClicked($event: MouseEvent) {
    console.log($event);
=======
    this.longitude = position.lng;
    this.zoom = 12;
    this.notifyChangePosition();
  }

  mapClicked($event: MouseEvent) {
>>>>>>> dev
    this.latitude = $event['coords'].lat;
    this.longitude = $event['coords'].lng;
    this.notifyChangePosition();
    // this.markers.push({
    //   lat: $event.coords.lat,
    //   lng: $event.coords.lng
    // });
  }

}
