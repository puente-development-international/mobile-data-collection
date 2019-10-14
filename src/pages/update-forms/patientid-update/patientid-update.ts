import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';


//Providers
import { ParseProvider } from '../../../providers/parse/parse';
import { UserpositionProvider } from '../../../providers/userposition/userposition';
import { UiUxProvider} from '../../../providers/ui-ux/ui-ux';

@Component({
  selector: 'page-patientid-update',
  templateUrl: 'patientid-update.html',
})
export class PatientUpdatePage {
  //we need to push patientsID into this page and retrieve
  patient : any;

  patientImage : string;
  
  patientID = {
    id: null,
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
    city: null,
    province: null,
    insuranceNumber: null,
    insuranceProvider: null,
    clinicProvider: null,
    cedulaNumber: null,
    latitude:null,
    longitude:null
  } 

  date_of_birth = {
    day: null,
    month:null,
    year:null
  }

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private camera:Camera,
    private parsePrvdr:ParseProvider,
    private themeSrvc:UiUxProvider,
    private userPositn:UserpositionProvider) {
      this.patient = navParams.get('patient');
      this.populateFields();
      this.splitDate();
      
  }
  
  ionViewDidEnter(){
    if(this.patient.attributes.picture){
      this.patientImage = this.patient.attributes.picture._url;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsumerMedicalEvalPage');
  }
  
  popView(){
    this.navCtrl.pop();
  }

  populateFields(){ 
    /*
      Pulls object from other page and puts the attributes in localObject
    */
    
    for (var property in this.patient.attributes) {
      if (this.patientID.hasOwnProperty(property)) {
        this.patientID[property] = this.patient.attributes[property];
      }
    }
    /*if(this.patient.attributes.picture){
      this.patientImage = this.patient.attributes.picture._url;
    }*/
  
    //Updates Forms!
    //for (var prop in this.patient.attributes) this.patientID[prop] = this.patient.attributes[prop];
  }

  public splitDate(){
    let date_arr = this.patientID.dob.split("/")
    
    console.log(date_arr)

    this.date_of_birth.day = date_arr[0]
    this.date_of_birth.month = date_arr[1]
    this.date_of_birth.year = date_arr[2]

    console.log(this.date_of_birth)
    

    //this.patientID.dob = String(this.date_of_birth.day+'/'+ this.date_of_birth.month +'/'+ this.date_of_birth.year)
    //console.log(this.patientID.dob)
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

  async post_n_update() {
    this.patientID.id = this.patient.id;
    await this.fixDate();
    this.parsePrvdr.postObjectsToClass(this.patientID,'SurveyData', this.patientImage).then(() => {
      this.themeSrvc.toasting('Saved | Guardado', 'top');
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
      this.patientImage = "data:image/jpeg;base64," + await this.camera.getPicture(options);
    }
    catch(e){
      console.log(`Error:${e}`)
    }
    
  }

}
