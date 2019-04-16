import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';
//import { Camera, CameraOptions } from '@ionic-native/camera';

// Providers
import { ParseProvider } from '../../../providers/parse/parse';
import { AuthProvider } from '../../../providers/auth/auth';
import { UserpositionProvider } from '../../../providers/userposition/userposition';
import { AssetManagerProvider } from '../../../providers/asset-manager/asset-manager';
import { UiUxProvider} from '../../../providers/ui-ux/ui-ux';


@Component({
  selector: 'patientid',
  templateUrl: 'patientid.html'
})
export class PatientIDForm {

  isenabled:boolean=false;
  //images: Array<{src: String}>;
  Imgsrc: String;

  patientID = {
    fname: null,
    lname: null,
    nickname: null,
    dob: null,
    sex: null,
    telephoneNumber:null,
    marriageStatus: null,
    familyRelationships: null,
    occupation:null,
    educationLevel:null,
    communityname:null,
    city:null,
    province: null,
    insuranceNumber: null,
    insuranceProvider: null,
    clinicProvider: null,
    cedulaNumber: null,
    latitude: null,
    longitude: null,
    surveyingUser: this.auth.currentUser().name,
    surveyingOrganization: this.auth.currentUser().organization
    //photoIdentificaiton

  }

  date_of_birth = {
    day: null,
    month:null,
    year:null
  }

  
  
  constructor(private parseProvider: ParseProvider,
    private auth: AuthProvider,  
    public viewCtrl:ViewController,
    private userPositn:UserpositionProvider,
    public assetsMngr: AssetManagerProvider,
    //private camera:Camera,
    public themeCtrl:UiUxProvider) {

    console.log('Hello PatientIDForm ');
    this.auth.authenticated();
  }


  

  ionViewDidEnter() {
    this.recordCoordinates();
  }

  async secureCredentials(){
    this.patientID.surveyingUser = await this.auth.currentUser().name
    this.patientID.surveyingOrganization = await this.auth.currentUser().organization

  }

  public fixDate(){
    for (let key in this.date_of_birth){
      if (this.date_of_birth[key] == null){
        this.date_of_birth[key] = 0;  
      }

    }
    this.patientID.dob = String(this.date_of_birth.day+'/'+ this.date_of_birth.month +'/'+ this.date_of_birth.year)
    console.log(this.patientID.dob)
  }

  public recordCoordinates() {
    this.userPositn.getUserPosition().then((resp) => {
      this.patientID.latitude = resp.coords.latitude;
      this.patientID.longitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location',error);
    });
  } 

  async post_n_clear() {
    this.isenabled=false;
    await this.secureCredentials() //make sure credentials are stored
    await this.fixDate() //combine fields
    this.parseProvider.postObjectsToClass(this.patientID,'SurveyData').then((/*surveyPoint*/) => {
      for (var key in this.patientID){
        this.patientID[key] = null;
      }
      this.themeCtrl.toasting('Submitted | Entregado', "bottom");
    }, (error) => {
      console.log(error);
      alert('Error Confirming.');
    });
  }

  /*
  takePhoto () {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
      this.Imgsrc = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });

  }*/

  checkifenter(){
    if (this.patientID.fname !== ''){
      this.isenabled=true; 
    } 
    else {
      this.isenabled=false;
    }
  }

  //Navigation
  close() {
    this.viewCtrl.dismiss();
  }

  /*
    * Sets the Value of a key in the PatientID Dictionary
    * 
    * @example
    * set("Greenwood","city")
    * 
    * @param {string} value for dictionary key
    * @param {string} dictionary key
    * @returns 
  */
  set(value,key){
    this.patientID[key]= value;
    console.log(this.patientID[key]);
  }

  /*  
  */
}
