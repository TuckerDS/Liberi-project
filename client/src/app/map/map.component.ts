import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
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

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  loggedUser: any;

  error: any;
  search: any;
  completeInfo: any;
  public adress: any;
  public city: any;
  public country: any;
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
    );
  }

  @ViewChild('search')
  public searchElementRef: ElementRef;


  constructor( private mapService: MapService,
               private router: Router,
               private route: ActivatedRoute,
               private myElement: ElementRef,
               private mapsAPILoader: MapsAPILoader,
               private ngZone: NgZone,
               private sessionService: SessionService
             ) { this.elementRef = myElement; }

  ngOnInit() {

    // Session guard
    this.loggedUser = this.sessionService.loggedUser;
    this.sessionService.getLogginEmitter().subscribe(
      user => {
        this.loggedUser = user;
      }
    );

    //  Create search FormControl
    this.searchControl = new FormControl();

    // load Places Autocomplete
    const instance = this;
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {


          // Get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          this.setNewPosition({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          });

          // Set new position
          this.getLocationData(place);

          instance.addLocation({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          });


          // Verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          // Set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 14;
          this.city = place.address_components[2].long_name;
          this.country = place.address_components[5].long_name;
          this.adress = place.address_components[1].long_name + ', ' + place.address_components[0].long_name;
        });
      });
    });

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
    this.longitude = position.lng;
    this.zoom = 12;
    this.notifyChangePosition();
  }

  mapClicked($event: MouseEvent) {
    this.latitude = $event['coords'].lat;
    this.longitude = $event['coords'].lng;
    this.notifyChangePosition();
    // this.markers.push({
    //   lat: $event.coords.lat,
    //   lng: $event.coords.lng
    // });
  }

}
