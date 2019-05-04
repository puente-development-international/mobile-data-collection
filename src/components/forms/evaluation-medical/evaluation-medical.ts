import { Component, ViewChild } from '@angular/core';

import { ViewController, ModalController } from 'ionic-angular';


// Providers
import { ParseProvider } from '../../../providers/parse/parse';
import { AuthProvider } from '../../../providers/auth/auth';
import { UiUxProvider} from '../../../providers/ui-ux/ui-ux';

//Components
import { SearchbarObjectIdComponent } from '../../searchbar-object-id/searchbar-object-id';

@Component({
  selector: 'evaluation-medical',
  templateUrl: 'evaluation-medical.html'
})
export class EvaluationMedicalForm {

  isenabled:boolean=false;
  
  client = {
    objectID: null,
    fname: null,
    lname: null
  }

  evaluationMedical = {
    //New
    //abnormal_bleeding:null,
    //difficulty_breathing:null,
    //mental_issues:null,

    //chronic_condition:null,
    chronic_condition_hypertension:null,
    chronic_condition_diabetes:null,
    chronic_condition_other:null,

    seen_doctor:null,

    received_treatment_notes:null,//what did the doctor say
    received_treatment_description:null, //status of health

    part_of_body:null,
    part_of_body_description:null,
    duration:null,
    trauma_induced:null,
    condition_progression:null,
    pain:null,

    //Assessment Section
    notes:null,
    AssessmentandEvaluation: null, //general_health_recommendation
    AssessmentandEvaluation_Surgical: null,
    AssessmentandEvaluation_Surgical_Guess:null,
    planOfAction:null, 
    immediate_follow_up:null,

    needsAssessmentandEvaluation:null,
    
    surveyingUser: this.auth.currentUser().name,
    surveyingOrganization: this.auth.currentUser().organization

  }

  drawerOptions: any;
  
  constructor(private parseProvider: ParseProvider,
    private auth: AuthProvider,  
    public viewCtrl:ViewController,
    public modalCtrl:ModalController,
    public themeCtrl:UiUxProvider) {

    console.log('Hello EvaluationMedicalForm');
    this.auth.authenticated();

    this.drawerOptions = {
      handleHeight: 50,
      thresholdFromBottom: 200,
      thresholdFromTop: 200,
      bounceBack: true
    };
  }


  post_n_clear(){
    this.parseProvider.postObjectsToClassWithRelation(this.evaluationMedical,'EvaluationMedical','SurveyData',this.client.objectID).then(()=> {
      for (var key in this.evaluationMedical){
        this.evaluationMedical[key] = null;
      }
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
    this.evaluationMedical[key]= value;
    console.log(this.evaluationMedical[key])
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
      this.evaluationMedical[x] = null;      
    }
    
  }




}
