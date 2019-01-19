import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

//Providers
import { QueryServiceProvider } from '../query-service/query-service';

declare var google;



@Injectable()
export class MapControlsProvider {

  constructor(private querySrvc: QueryServiceProvider) {
    console.log('Hello MapControlsProvider Provider');
  }


  /**
  * Adds a marker
  * "Look At Google Maps Documentation"
  * @example
  * addMarker(map,position.coords.latitude,position.coords.longitude,'User Location', this.userimage,this.markerArray)
  * 
  * @param {any}    map Google Map 
  * @param {number} latitude Latitudinal coordinates
  * @param {number} longitude Longitudianl coordinates
  * @param {string} markerInformation Information for Marker
  * @param {any}    image image of marker
  * @param {array}  localMarkerArray Marker Array to load into Google Maps
  * @returns 
  */
  public addMarker(map, latitude: number, longitude: number, markerInformation:string,image, localMarkerArray){
    /*
    * Adds a marker to the map and push to the array.
    */
    let marker = new google.maps.Marker({
        map: map,
        icon: image,
        animation: google.maps.Animation.DROP,
        position: {
          lat: latitude,
          lng: longitude
        },
    });

    //let markerInfo = "<h4>You are here!</h4>";
    let markerInfo = markerInformation;         

    let infoModal = new google.maps.InfoWindow({
        content: markerInfo
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoModal.open(map, marker);
    });

    //Google's Solution
    //Pushes marker into Array
    localMarkerArray.push(marker);
  }


  /**
  * Adds Markesr Based on Parse-Server Query
  * "Look At Google Maps Documentation"
  * @example
  * addMultipleMarkers(map,latitude,longitude,'Puente','markerImageName','fname','SurveyData',markerArray)
  * 
  * @param {any}    map Google Map 
  * @param {number} refLatitude Latitudinal coordinates
  * @param {number} refLongitude Longitudianl coordinates
  * @param {number} refOrganization Longitudianl coordinates
  * @param {string} markerInformation Information for Marker
  * @param {any}    multipleMarkersImages image of marker
  * @param {string} markerParseName name of marker
  * @param {string} parseClassName Backend table to retrieve info from
  * @param {array}  localMarkerArray Marker Array to load into Google Maps
  * @returns 
  */
  public addMultipleMarkers(map, refLatitude,refLongitude,refOrganization, multipleMarkersImages, markerParseName:string, parseClassName:string, localMarkerArray){
    let latitude = refLatitude;
    let longitude = refLongitude;

    /*
      Parse
    */
    let limit = 100;
    let parseClass = parseClassName;
    let parseField = 'surveyingOrganization';
    let parseFieldValue = String(refOrganization);

    return this.querySrvc.geoQuery(latitude,longitude,limit, parseClass,parseField,parseFieldValue).then((result) => {
      for (let i = 0; i < result.length; i++) {
        let object = result[i];        
        //Loops and pushes each marker into markerArray
        if (object.get('latitude') != null || object.get('longitude') != null) {
          this.addMarker(map,object.get('latitude'),object.get('longitude'),object.get(markerParseName),multipleMarkersImages,localMarkerArray);
        }
      }
    }, (error) => {
      console.log(error);
    });
  }

}
