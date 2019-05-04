import { Component, ViewChild } from '@angular/core';

import { ViewController,ModalController } from 'ionic-angular';

// Providers
import { ParseProvider } from '../../../providers/parse/parse';
import { AuthProvider } from '../../../providers/auth/auth';
import { UiUxProvider} from '../../../providers/ui-ux/ui-ux';

// Components
import { SearchbarObjectIdComponent } from '../../searchbar-object-id/searchbar-object-id';

@Component({
  selector: 'medicalhistory',
  templateUrl: 'medicalhistory.html'
})
export class MedicalHistoryForm {

  isenabled:boolean=false;
  
  client = {
    objectID: null,
    fname: null,
    lname: null
  }

  medicalHistory = {
    majorEvents: null,
    surgeryWhatKind: null,
    medicalIllnesses:null,
    whenDiagnosed: null,
    whatDoctorDoyousee: null,
    treatment: null,
    familyhistory: null,
    preventativeCare: null,
    allergies:null
    //socialHistory: null,
    //nutritionHistory: null
  };
  
  
  constructor(private parseProvider: ParseProvider,
    private auth: AuthProvider,  
    private viewCtrl: ViewController,
    private modalCtrl:ModalController,
    public themeCtrl:UiUxProvider) {

    console.log('Hello MedicalHistoryForm ');
    this.auth.authenticated();
  }

  post_n_clear(){
    this.parseProvider.postObjectsToClassWithRelation(this.medicalHistory,'HistoryMedical','SurveyData',this.client.objectID).then(()=> {
      for (var key in this.medicalHistory){
        this.medicalHistory[key] = null;
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

  close() {
    this.viewCtrl.dismiss();
    this.isenabled = false;
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




}
