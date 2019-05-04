import { Component, ViewChild } from '@angular/core';

import { ViewController,ModalController } from 'ionic-angular';

// Providers
import { ParseProvider } from '../../../providers/parse/parse';
import { AuthProvider } from '../../../providers/auth/auth';
import { UiUxProvider} from '../../../providers/ui-ux/ui-ux';

// Components
import { SearchbarObjectIdComponent } from '../../searchbar-object-id/searchbar-object-id';

@Component({
  selector: 'evaluation-surgical',
  templateUrl: 'evaluation-surgical.html'
})
export class EvaluationSurgicalForm {

  isenabled:boolean=false;
  
  client = {
    objectID: null,
    fname: null,
    lname: null
  }

  evaluationSurgical = {
    /*abnormal_bleeding:null,
    difficulty_breathing:null,
    mental_issues:null,
    description:null,
    duration:null,
    seen_doctor:null,
    diagnosis:null,
    suggested_treatment:null,
    received_treatment:null,
    received_treatment_description:null,*/

    //Old and not used
    AssessmentandEvaluationSurgical: null,
    planOfActionSurgical: null,
    notesSurgical: null,
    
    surveyingUser: this.auth.currentUser().name,
    surveyingOrganization: this.auth.currentUser().organization

  }

  //Design Element: Content Drawer
  drawerOptions: any;
  
  constructor(private parseProvider: ParseProvider,
    private auth: AuthProvider,  
    public viewCtrl:ViewController,
    public modalCtrl:ModalController,
    public themeCtrl:UiUxProvider) {

    console.log('Hello EvaluationSurgicalForm');
    this.auth.authenticated();

    this.drawerOptions = {
      handleHeight: 50,
      thresholdFromBottom: 200,
      thresholdFromTop: 200,
      bounceBack: true
    };
  }


  post_n_clear(){
    this.parseProvider.postObjectsToClassWithRelation(this.evaluationSurgical,'EvaluationSurgical','SurveyData',this.client.objectID).then(()=> {
      for (var key in this.evaluationSurgical){
        this.evaluationSurgical[key] = null;
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
    * Sets the Value of a key in the evaluationSurgical Dictionary
    * 
    * @example
    * set("Y","latrineAcess")
    * 
    * @param {string} value for dictionary key
    * @param {string} dictionary key
    * @returns 
  */
  set(value,key){
    this.evaluationSurgical[key]= value;
    console.log(this.evaluationSurgical[key])
  }



}
