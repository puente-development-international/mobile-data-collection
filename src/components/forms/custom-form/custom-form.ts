import { Component } from '@angular/core';

import { ViewController, ModalController, NavParams } from 'ionic-angular';


// Providers
import { ParseProvider } from '../../../providers/parse/parse';
import { AuthProvider } from '../../../providers/auth/auth';
import { UiUxProvider} from '../../../providers/ui-ux/ui-ux';

//Components
import { SearchbarObjectIdComponent } from '../../searchbar-object-id/searchbar-object-id';

@Component({
  selector: 'custom-form',
  templateUrl: 'custom-form.html'
})
export class CustomForm {
  form : any;
  isenabled:boolean=false;
  
  client = {
    objectID: null,
    fname: null,
    lname: null
  }

  customForm = {
    title: null,
    description: null,
    organizations: [],
    formSpecificationsId:"",
    fields: [
      {
        title:"",
        answer:""
      },
      {
        title:null,
        answer:""
      },
      {
        title:null,
        answer:""
      }
    ],
    
    surveyingUser: this.auth.currentUser().name,
    surveyingOrganization: this.auth.currentUser().organization
  }

  drawerOptions: any;
  
  constructor(private parseProvider: ParseProvider,
    private auth: AuthProvider,  
    public viewCtrl:ViewController,
    public modalCtrl:ModalController,
    public themeCtrl:UiUxProvider,
    public navParams:NavParams) {

    console.log('Hello customforms');
    this.auth.authenticated();

    this.drawerOptions = {
      handleHeight: 50,
      thresholdFromBottom: 200,
      thresholdFromTop: 200,
      bounceBack: true
    };
  }

  ionViewWillEnter(){
    this.form = this.navParams.get('form');
  }

  ionViewDidEnter(){
    this.populateFields();
  }

  post_n_clear(){
    this.parseProvider.postObjectsToClassWithRelation(this.customForm,'FormResults','SurveyData',this.client.objectID).then(()=> {
      this.customForm.fields[0].answer = ""
      this.customForm.fields[1].answer = ""
      this.customForm.fields[2].answer = ""
      this.client.fname=null; 
      this.client.lname=null;
      this.isenabled=false;
      this.themeCtrl.toasting('Submitted | Entregado', "bottom");
    }, (error) => {
      console.log(error);
      alert('Error Confirming.');
    });
  }

  //Navigation
  close() {
    this.viewCtrl.dismiss();
    this.isenabled=false;
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
    this.isenabled=true;
    this.client.objectID= selectedItem.id; //Retrieve RESERVED Parse-Server Object ID Value
    this.client.fname = selectedItem.get('fname');
    this.client.lname = selectedItem.get('lname');
    //this.contentDrawer.closeDrawer();
    console.log(this.client.objectID);
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

  /*
    * Sets the Value of a key in the evaluationMedical Dictionary
    * 
    * @example
    * set("Greenwood","city")
    * 
    * @param {string} value for dictionary key
    * @param {string} dictionary key
    * @returns 
  */
  set(value,key){
    this.customForm[key]= value;
    console.log(this.customForm[key])
  }

  /*
    * Sets the Values of a list of keys in the evalMedical Dictionary to null
    * 
    * @example
    * clear(['chronic_condition_hypertension','chronic_condition_diabetes','chronic_condition_other'])
    * 
    * @param {array} list of dictionary key
    * @returns 
  */
  clear(list_of_keys){
    for (let i=0; i<list_of_keys.length; i++){
      let x = list_of_keys[i]
      this.customForm[x] = null;      
    }
    
  }

  populateFields(){ 
    /*
      Pulls object from other page and puts the attributes in localObject
    */

    this.customForm.formSpecificationsId = this.form.id;
    
    for (var property in this.form.attributes) {
      if (this.customForm.hasOwnProperty(property)) {
        this.customForm[property] = this.form.attributes[property];
      }
    }


    

    console.log(this.customForm)

    
  }




}
