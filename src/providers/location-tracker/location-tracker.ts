import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
 
@Injectable()
export class LocationTracker {
 
  public watch: any;   
  public lat: number = 0;// start lat
  public lng: number = 0;// start lng
  public lat2: number = 0;// end lat
  public lng2: number = 0;// end lng
  public dist: number = 0;

  constructor(public zone: NgZone, public backgroundGeolocation:BackgroundGeolocation,
  public geolocation:Geolocation) {
 
  }
 
  startTracking() {
 
    // Background Tracking
   
    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 2000
    };
   
    this.backgroundGeolocation.configure(config).subscribe((location) => {
   
      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
   
      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
      });
   
    }, (err) => {
   
      console.log(err);
   
    });
   
    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();
   
   
    // Foreground Tracking
   
  let options = {
    frequency: 3000,
    enableHighAccuracy: true
  };
   
  this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
   
    console.log(position);
   
    // Run update inside of Angular's zone
    this.zone.run(() => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    });
   
  });
   
  }
 
  stopTracking() {
 
    console.log('stopTracking');
    let config = {
        desiredAccuracy: 0,
        stationaryRadius: 20,
        distanceFilter: 10,
        debug: true,
        interval: 2000
      };
     
      this.backgroundGeolocation.configure(config).subscribe((location) => {
     
        console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
     
        // Run update inside of Angular's zone
        this.zone.run(() => {
            this.lat2 = location.latitude;
            this.lng2 = location.latitude;
        });
     
      }, (err) => {
     
        console.log(err);
     
      });
   
    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();
   
  }
 
}