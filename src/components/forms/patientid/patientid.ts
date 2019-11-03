import { Component } from '@angular/core';

import { ViewController, ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

// Providers
import { ParseProvider } from '../../../providers/parse/parse';
import { AuthProvider } from '../../../providers/auth/auth';
import { UserpositionProvider } from '../../../providers/userposition/userposition';
//import { PhotosProvider } from '../../../providers/photos/photos'
import { AssetManagerProvider } from '../../../providers/asset-manager/asset-manager';
import { UiUxProvider} from '../../../providers/ui-ux/ui-ux';
import { StorageProvider} from '../../../providers/storage/storage'

import { SearchbarObjectIdComponent } from '../../searchbar-object-id/searchbar-object-id';
import { SignaturePadComponent } from '../../signature/signature';


@Component({
  selector: 'patientid',
  templateUrl: 'patientid.html'
})
export class PatientIDForm {

  isenabled: boolean = false;
  is_submitting: boolean = false;
  image: string;
  signatureImage: string;

  patientID = {
    fname: null,
    lname: null,
    relationship:null,
    relationship_id:null,
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

  geography = {
    communityname: null,
    city:null,
    province: null
  }

  date_of_birth = {
    day: null,
    month:null,
    year:null
  }
  relationship = {
    objectID: null,
    fname: null,
    lname: null
  }

  constructor(private parseProvider: ParseProvider,
    private auth: AuthProvider,  
    public viewCtrl:ViewController,
    public modalCtrl:ModalController,
    private userPositn:UserpositionProvider,
    private camera:Camera,
    //private photoController: PhotosProvider,
    public assetsMngr: AssetManagerProvider,
    private storagePrvdr: StorageProvider,
    public themeCtrl:UiUxProvider) {

    console.log('Hello PatientIDForm ');
    this.auth.authenticated();
  }

  ionViewDidEnter() {
    this.recordCoordinates();
    this.secureCredentials();
  }

  async secureCredentials(){
    
    if(this.patientID.surveyingOrganization == null || this.patientID.surveyingUser ){
      this.patientID.surveyingUser = this.auth.currentUser().name
      this.patientID.surveyingOrganization = this.auth.currentUser().organization
    }
    if(this.patientID.surveyingOrganization == null || this.patientID.surveyingUser ){
      this.storagePrvdr.getUserInfoFromStorage().then((results)=>{
        results[0].then((result)=>{
          this.patientID.surveyingUser = result
        }).catch((error)=>console.log(error));
        results[1].then((result)=>{
          this.patientID.surveyingOrganization = result
        }).catch((error)=>console.log(error))
      }).catch((error)=>console.log(error))
    }
  }

  fixDate(){
    for (let key in this.date_of_birth){
      if (this.date_of_birth[key] == null){
        this.date_of_birth[key] = 0;  
      }

    }
    this.patientID.dob = String(this.date_of_birth.day+'/'+ this.date_of_birth.month +'/'+ this.date_of_birth.year)
    
    this.patientID.relationship = `${this.relationship.lname}, ${this.relationship.fname}`
    this.patientID.relationship_id = this.relationship.objectID
    console.log(this.patientID.relationship)
  }

  public recordCoordinates() {
    this.userPositn.getUserPosition().then((resp) => {
      this.patientID.latitude = resp.coords.latitude;
      this.patientID.longitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location',error);
    });
  } 

  public fakeCachelocation(){
    this.patientID.communityname = this.geography.communityname;
    this.patientID.city = this.geography.city;
    this.patientID.province = this.geography.province;
  }

  async post_n_clear() {
    this.isenabled=false;
    this.is_submitting=true;
    await this.secureCredentials(); //make sure credentials are stored
    await this.fixDate(); //combine fields
    await this.fakeCachelocation();
    
    await this.parseProvider.postObjectsToClass(this.patientID,'SurveyData', this.image,this.signatureImage ).then((/*surveyPoint*/) => {
      for (var key in this.patientID){
        this.patientID[key] = null;
      }
      this.image = null;
      this.is_submitting=false;
      this.date_of_birth.day = this.date_of_birth.month = this.date_of_birth.year = null;
      this.relationship.fname = this.relationship.lname = this.relationship.objectID = null;
      this.themeCtrl.toasting('Submitted | Entregado', "bottom");
      this.fakeCachelocation;
    }, (error) => {
      console.log(error);
      alert('Error Confirming.');
    });
  }

  
  async takePhoto(): Promise<any> {
    const options: CameraOptions = {
      /*quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false*/
      quality: 40,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    try {
      this.image = "data:image/jpeg;base64," + await this.camera.getPicture(options);
    }
    catch(e){
      console.log(`Error:${e}`)
    }
    
  }

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
    * Retrieves objectID from templates's content drawer
    * 
    * @example
    * inputObjectIDfromComponent($event)
    * 
    * @param {any} object emitted from ContentDrawer
    * @returns 
  */
  inputObjectIDfromComponent(selectedItem) {
    //this.isenabled=true;
    this.relationship.objectID = selectedItem.id; //Retrieve RESERVED Parse-Server Object ID Value
    this.relationship.fname = selectedItem.get('fname');
    this.relationship.lname = selectedItem.get('lname');
  }

  inputSignaturefromComponent(selectedItem) {
    try {
      this.signatureImage = selectedItem;
    }
    catch(e){
      console.log(`Error:${e}`)
    }
  }

  presentModal() {
    const modal = this.modalCtrl.create(SearchbarObjectIdComponent);
    modal.onDidDismiss(data => {
      if(data == null){
        console.log('Exited')
      }
      else{
        this.inputObjectIDfromComponent(data)
      }
        
    });
    modal.present();
  }

  openSignatureModel(){
    const modal = this.modalCtrl.create(SignaturePadComponent);
    modal.onDidDismiss(data => {
      if(data == null){
        console.log('Exited')
      }
      else{
        this.inputSignaturefromComponent(data)
      }
        
    });
    modal.present();
  }

}
