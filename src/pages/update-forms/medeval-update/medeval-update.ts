import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//Providers
import { ParseProvider } from '../../../providers/parse/parse';
import { UiUxProvider} from '../../../providers/ui-ux/ui-ux';

/**
 * Generated class for the ConsumerEnviroEvalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-medeval-update',
  templateUrl: 'medeval-update.html',
})
export class MedEvalUpdatePage {
  _medEval : any;
  
  evaluationMedical = {
    id:null,
    chronic_condition_hypertension:null,
    chronic_condition_diabetes:null,
    chronic_condition_other:null,
    seen_doctor:null,
    received_treatment_notes:null,
    received_treatment_description:null, //status of health
    part_of_body:null,
    part_of_body_description:null,
    duration:null,
    trauma_induced:null,
    condition_progression:null,
    pain:null,
    notes:null,
    AssessmentandEvaluation: null, 
    AssessmentandEvaluation_Surgical: null,
    AssessmentandEvaluation_Surgical_Guess:null,
    planOfAction:null, 
    immediate_follow_up:null,

    needsAssessmentandEvaluation:null,
  }

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private parsePrvdr:ParseProvider,
    private themeSrvc:UiUxProvider) {
    this._medEval = navParams.get('medEval');
    this.populateFields();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedEvalUpdatePage');
  }

  popView(){
    this.navCtrl.pop();
  }

  populateFields(){ 
    /*
      Pulls object from other page and puts the attributes in localObject
    */
    
    for (var property in this._medEval.attributes) {
      if (this.evaluationMedical.hasOwnProperty(property)) {
        this.evaluationMedical[property] = this._medEval.attributes[property];
      }

    }

    //Updates Forms!
    //for (var prop in this.patient.attributes) this.patientID[prop] = this.patient.attributes[prop];
  }

  public post_n_update() {
    this.evaluationMedical.id = this._medEval.id;
    console.log(this.evaluationMedical.id);

    this.parsePrvdr.postObjectsToClass(this.evaluationMedical,'EvaluationMedical').then(() => {
      this.themeSrvc.toasting('Saved', 'top');
    }, (error) => {
      console.log(error);
      alert('Error Confirming.');
    });
  }

  /*
    * Sets the Value of a key in the environmental Dictionary
    * 
    * @example
    * set("Y","latrineAcess")
    * 
    * @param {string} value for dictionary key
    * @param {string} dictionary key
    * @returns 
  */
  set(value,key){
    this.evaluationMedical[key]= value;
    console.log(this.evaluationMedical[key])
  }

}
