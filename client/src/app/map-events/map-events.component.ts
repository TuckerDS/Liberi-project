import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
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
  selector: 'app-map-events',
  templateUrl: './map-events.component.html',
  styleUrls: ['./map-events.component.css']
})
export class MapEventsComponent implements OnInit {

  // google maps zoom level
  zoom: 8;

  // initial center position for the map
  lat: 51.673858;
  lng: 7.815982;

  markers = [
  {
    lat: 51.673858,
    lng: 7.815982,
    label: 'A',
    draggable: true
  },
  {
    lat: 51.373858,
    lng: 7.215982,
    label: 'B',
    draggable: false
  },
  {
    lat: 51.723858,
    lng: 7.895982,
    label: 'C',
    draggable: true
  }
  ];

//
  public latitude: number = 40.3919186;
  public longitude: number = -3.6990989;

  completeInfo: any;
  locationUser: any;

  constructor(private mapService: MapService,
              private router: Router,
              private route: ActivatedRoute, myElement: ElementRef,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private sessionService: SessionService
  ) { }

  ngOnInit() {




    //  create search FormControl
    // this.searchControl = new FormControl();

    // load Places Autocomplete
    const instance = this;
    this.mapsAPILoader.load().then(() => {
      // let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      //   types: ["address"]
      // });
      // autocomplete.addListener("place_changed", () => {
      //   this.ngZone.run(() => {
      //     // get the place result
      //     let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // this.setNewPosition({
          //   lat: place.geometry.location.lat(),
          //   lng: place.geometry.location.lng()
          // });
          // // set new position
          // this.getLocationData(place);
          //
          // instance.addLocation({
          //   lat: place.geometry.location.lat(),
          //   lng: place.geometry.location.lng()
          // });
          //
          // // verify result
          // if (place.geometry === undefined || place.geometry === null) {
          //   return;
          // }
          // // set latitude, longitude and zoom
          // this.latitude = place.geometry.location.lat();
          // this.longitude = place.geometry.location.lng();
//          this.zoom = 14;
//          this.city = place.address_components[2].long_name;
//          this.country = place.address_components[5].long_name;
//          this.adress = place.address_components[1].long_name + ', ' + place.address_components[0].long_name;
      //   });
      // });
    });




  }


  addLocation(location) {
    this.locationUser = location;
  }

  getLocationData(location) {
    this.completeInfo = location;
  }

  private setNewPosition(position) {
    this.latitude = position.lat;
    this.longitude = position.lon;
    //this.zoom = 12;
  }



  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event['coords'].lat,
      lng: $event['coords'].lng,
      label: 'Evento',
      draggable: false
    });
  }

  markerDragEnd(m, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }



}
