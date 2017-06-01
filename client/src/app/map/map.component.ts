import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
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

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  loggedUser: any;
  search: any;
  completeInfo: any;
  public adress: any;
  public city: any;
  public country: any;
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
    );
  }

  @ViewChild('search')
  public searchElementRef: ElementRef;

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

  ngOnInit() {

    // Session guard
    this.loggedUser = this.sessionService.loggedUser;
    this.sessionService.getLogginEmitter().subscribe(
      user => {
        this.loggedUser = user;
        console.log('USUARIO LOGADO EMMITER');
        console.log(this.loggedUser);
      }
    );



    //this.gymId = this.route.params;

    //  create search FormControl
    this.searchControl = new FormControl();

    // load Places Autocomplete
    const instance = this;
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          // get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          this.setNewPosition({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          });
          // set new position
          this.getLocationData(place);

          instance.addLocation({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          });

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 14;
          this.city = place.address_components[2].long_name;
          this.country = place.address_components[5].long_name;
          this.adress = place.address_components[1].long_name + ', ' + place.address_components[0].long_name;
        });
      });
    });
  }

  addLocation(location) {
    this.locationUser = location;
  }

  getLocationData(location) {
    this.completeInfo = location;
  }

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
    this.latitude = $event['coords'].lat;
    this.longitude = $event['coords'].lng;
    this.notifyChangePosition();
    // this.markers.push({
    //   lat: $event.coords.lat,
    //   lng: $event.coords.lng
    // });
  }

}
