import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//Providers
import { ParseProvider } from '../../../providers/parse/parse';
import { UiUxProvider} from '../../../providers/ui-ux/ui-ux';

@Component({
  selector: 'page-vitals-update',
  templateUrl: 'vitals-update.html',
})
export class VitalsUpdatePage {
  //we need to push vitals into this page and retrieve
  _vital : any;
  
  vitals = {
    id:null,
    height: null,
    weight: null,
    bmi: null,
    temp: null,
    pulse: null,
    respRate:null,
    bloodPressure: null,
    bloodOxygen: null,
    bloodSugar:null,
    painLevels:null,
    hemoglobinLevels:null
  }


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private parsePrvdr:ParseProvider,
    private themeSrvc:UiUxProvider) {
    //this.patient = navParams.get('patient');
    this._vital = navParams.get('vital');
    this.populateFields();
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
    
    for (var property in this._vital.attributes) {
      if (this.vitals.hasOwnProperty(property)) {
        this.vitals[property] = this._vital.attributes[property];
      }

    }

    //Updates Forms!
    //for (var prop in this.patient.attributes) this.patientID[prop] = this.patient.attributes[prop];
  }

  public post_n_update() {
    this.vitals.id = this._vital.id;
    console.log(this.vitals.id);

    this.parsePrvdr.postObjectsToClass(this.vitals,'Vitals').then(() => {
      this.themeSrvc.toasting('Saved | Guardado', 'top');
    }, (error) => {
      console.log(error);
      alert('Error Confirming.');
    });
  }

}
