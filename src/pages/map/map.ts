import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';

//Providers
import { ParseProvider } from '../../providers/parse/parse'; //To Remove
import { AuthProvider } from '../../providers/auth/auth';
import { MapControlsProvider } from '../../providers/map-controls/map-controls';
import { UiUxProvider } from '../../providers/ui-ux/ui-ux';
import { UserpositionProvider } from '../../providers/userposition/userposition';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  map: any;
  options: any;

  userInfo = {
    surveyingUser: this.auth.currentUser().name,
    surveyingOrganization: this.auth.currentUser().organization,
    latitude: null,
    longitude: null
  }

  humanAssets = {
    name: null,
    humanAsset: null,
    latitude: null,
    longitude: null,
    surveyingUser: null,
    surveyingOrganization: null
  };

  physicalAssets = {
    name: null,
    physicalAsset: null,
    latitude: null,
    longitude: null,
    surveyingUser: null,
    surveyingOrganization: null
  }

  markerArray = [];

  userimage = 'assets/icon/userNew.png';
  queryimage = 'assets/icon/users-group.png';
  assetsimage ='assets/icon/physicalAsset.png';
  assetsHumanimage = 'assets/icon/humanAsset.png';

  constructor(private parseProvider: ParseProvider, 
    public navCtrl: NavController,
    private auth: AuthProvider, 
    public loadingCtrl: LoadingController,
    private mapCtrl: MapControlsProvider,
    private themeCtrl: UiUxProvider,
    private userPst: UserpositionProvider) {

      this.options = this.userPst.options;
      this.userInfo;
  }

  ionViewWillEnter() {
  }
  
  async ionViewDidLoad() {
    //.then(()=>{
    this.themeCtrl.coolLoadz.present()

    await this.initializeMap().then(() => {
        //this.themeCtrl.coolLoadz.present()
        this.mapCtrl.addMultipleMarkers(
          this.map,
          this.userInfo.latitude,
          this.userInfo.longitude,
          this.userInfo.surveyingOrganization,
          this.assetsimage,
          'name',
          'AssetData',
          this.markerArray)
          .then(()=> {
            this.setMarkersMapOnAll(this.map);
          })
  
        this.mapCtrl.addMultipleMarkers(
          this.map,
          this.userInfo.latitude,
          this.userInfo.longitude,
          this.userInfo.surveyingOrganization,
          this.queryimage,
          'fname',
          'SurveyData',
          this.markerArray)
          .then(() => { 
            this.setMarkersMapOnAll(this.map);
            this.getUserPosition();
            
        });
        //this.themeCtrl.coolLoadz.dismiss(); 
      //})
    });    

    this.themeCtrl.coolLoadz.dismiss() 
  }
  ionViewDidEnter() {    
  }
  ionViewDidLeave() {
  }

  /*
    Map Creation
  */
  public initializeMap() {
    //this.themeCtrl.coolLoadz.present();
    return this.userPst.getUserPosition().then((position) => {

        let mapOptions = {
          center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          zoom: 16,
          fullscreenControl: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.userInfo.latitude = position.coords.latitude;
        this.userInfo.longitude = position.coords.longitude;

        
        /* Create Map */
        this.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

        /* We can show our location only if map was previously initialized */
        //this.addMarker(position.coords.latitude, position.coords.longitude,'User Location', this.userimage);
        this.mapCtrl.addMarker(this.map,position.coords.latitude,position.coords.longitude,'User Location', this.userimage,this.markerArray);

        //this.themeCtrl.coolLoadz.dismiss()

    }).catch((error) => {
        console.log('Error getting location', error);
      });
    //this.themeCtrl.coolLoadz.dismiss()
  }

  setMarkersMapOnAll(map) {
    // Sets the map on all markers in the array.
    for (var i = 0; i < this.markerArray.length; i++) {
      this.markerArray[i].setMap(map);
    }
  }
  
  showMarkers() {
    /*
    Shows any markers currently in the array.
    */
    this.setMarkersMapOnAll(this.map);
  }

  
  clearMarkers() {
    /*
      Removes the markers from the map, but keeps them in the array.
    */
    this.setMarkersMapOnAll(null);
  }

  
  deleteMarkers() {
    /*
      Deletes all markers in the array by removing references to them.
    */
    this.clearMarkers();
    this.markerArray = [];
    this.mapCtrl.addMarker(this.map,this.userInfo.latitude,this.userInfo.longitude,'User Location',this.userimage,this.markerArray);
  }


  restartMarkers(){
    /*
      Reinitiate Everything
    */
    this.mapCtrl.addMultipleMarkers(this.map,this.userInfo.latitude,this.userInfo.longitude,this.userInfo.surveyingOrganization,this.queryimage,'fname','SurveyData',this.markerArray).then(() => {
      this.setMarkersMapOnAll(this.map);
    });

    this.mapCtrl.addMultipleMarkers(this.map,this.userInfo.latitude,this.userInfo.longitude,this.userInfo.surveyingOrganization,this.assetsimage,'name','AssetData',this.markerArray).then(() => {
      this.setMarkersMapOnAll(this.map);
    });
  }

  public centerMap(){
    this.map.setCenter(new google.maps.LatLng(this.userInfo.latitude, this.userInfo.longitude));
  }
  
  /*
    Geolocation
  */
  async getUserPosition() {

    //Loading Controller
    let loading = this.loadingCtrl.create({
      content: 'Retrieving Location...'
    });

    //loading.present();
    
    return await this.userPst.getUserPosition().then((resp) => {
      let latitude = resp.coords.latitude;
      let longitude = resp.coords.longitude;
      
      this.humanAssets.latitude = this.physicalAssets.latitude = latitude;
      this.humanAssets.longitude = this.physicalAssets.longitude = longitude;

      this.userInfo.latitude = latitude;
      this.userInfo.longitude = longitude;

      //loading.dismiss();

      this.themeCtrl.toasting(String([latitude,longitude]), 'top')

      console.log(latitude,longitude)

    }).catch((error) => {
      console.log('Error getting location ',error);
    });
  }
  
  /*
    Survey
  */
  public postAssetsConfirm(localAssetsArray) {
    this.physicalAssets.surveyingOrganization = this.humanAssets.surveyingOrganization = this.userInfo.surveyingOrganization;
    this.physicalAssets.surveyingUser = this.physicalAssets.surveyingUser = this.userInfo.surveyingUser;

    this.parseProvider.postObjectsToClass(localAssetsArray,'AssetData').then(() => {
      for (var key in localAssetsArray){
        localAssetsArray[key] = null;
      }
      this.themeCtrl.toasting('Submitted | Entregado', 'bottom');
    }, (error) => {
      console.log(error);
      alert('Error Confirming.');
    }); 
  } 

}