import { Component, ViewChild, ElementRef } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationTracker } from '../../providers/location-tracker/location-tracker';
declare var google: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map:any;
  constructor(public navCtrl: NavController,public geolocation: Geolocation, 
    public locationTracker: LocationTracker) {
 
  }// constructor

  ionViewDidLoad() {

      this.loadMap();

  }// ioViewLoad
  start(){
    this.locationTracker.startTracking();
  }
 
  stop(){
    this.locationTracker.stopTracking();
  }

  loadMap(){
 
    this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
    }, (err) => {
      console.log(err);
    });
 
  }
  function (success){
    console.log(success);
}
addMarker(){
 
  let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
  });
 
  let content = "<h4>Information!</h4>";         
 
  this.addInfoWindow(marker, content);
 
}
addInfoWindow(marker, content){
 
  let infoWindow = new google.maps.InfoWindow({
    content: content
  });
 
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });
 
}

}//MapPage
