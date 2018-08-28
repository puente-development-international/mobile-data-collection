import { Component, ViewChild } from '@angular/core';

import { ViewController } from 'ionic-angular';


// Providers
import { ParseProvider } from '../../../providers/parse/parse';
import { AuthProvider } from '../../../providers/auth/auth';
import { UiUxProvider} from '../../../providers/ui-ux/ui-ux';

//Components
import { ContentDrawerComponent } from '../../content-drawer/content-drawer';

@Component({
  selector: 'evaluation-medical',
  templateUrl: 'evaluation-medical.html'
})
export class EvaluationMedicalForm {
  @ViewChild("ContentDrawerComponent") contentDrawer: ContentDrawerComponent;

  isenabled:boolean=false;
  
  client = {
    objectID: null,
    fname: null,
    lname: null
  }

  evaluationMedical = {
    AssessmentandEvaluation: null,
    planOfAction: null,
    notes: null,
    
    surveyingUser: this.auth.currentUser().name,
    surveyingOrganization: this.auth.currentUser().organization

  }

  drawerOptions: any;
  
  constructor(private parseProvider: ParseProvider,
    private auth: AuthProvider,  
    public viewCtrl:ViewController,
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

  inputObjectIDfromComponent(selectedItem) {
    this.isenabled=true;
    this.client.objectID= selectedItem.id; //Retrieve RESERVED Parse-Server Object ID Value
    this.client.fname = selectedItem.get('fname');
    this.client.lname = selectedItem.get('lname');
    this.contentDrawer.closeDrawer();
    console.log(this.client.objectID);
  }




}
