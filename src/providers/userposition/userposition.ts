import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';

@Injectable()
export class UserpositionProvider {

  options: GeolocationOptions;

  coordinates = {
    latitude : null,
    longitude: null
  }

  constructor(private geolocation:Geolocation,private plt:Platform) {
    console.log('Hello UserpositionProvider');
  }

  /*
  public getUserPosition() {
    //Retrieves coordinates of the user
    this.options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    
    return this.geolocation.getCurrentPosition(this.options)
  }*/

  /**
  * Returns User Position Coordinates
  * 
  * @example
  * getUserPosition()
  * 
  * @returns latitude and longitude coordinates
  */
  async getUserPosition() {
    this.options = {
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 0
    };
    
    await this.plt.ready();
      
    //return await this.geolocation.getCurrentPosition(this.options)
    return this.geolocation.getCurrentPosition(this.options)

    

  }
 

}
