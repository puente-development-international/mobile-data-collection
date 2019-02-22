import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController,ViewController, ModalController } from 'ionic-angular';

//Providers
import { QueryServiceProvider } from "../../../providers/query-service/query-service";

import { MedEvalUpdatePage} from '../../../pages/update-forms/medeval-update/medeval-update';


@Component({
  selector: 'listof-med-eval',
  templateUrl: 'listof-med-eval.html'
})
export class ListofMedEvalComponent {

  medList = [];

  //Object
  patient : any;

  constructor(private querySrvc:QueryServiceProvider,
    public navParams: NavParams,
    private viewCtrl:ViewController,
    private modalCtrl: ModalController) {
    console.log('Hello ListofMedEvalComponent');
    this.patient = navParams.get('patient');
    this.aggregate(this.patient);
  }

  aggregate(patientObject:string) {
    let offset = this.medList.length;
    let limit = 1000;

    console.log(patientObject);
    return this.querySrvc.basicQuery(offset,limit,'EvaluationMedical','client', patientObject).then((result) =>{
      for (let i = 0; i < result.length; i++) {
        let object = result[i];
        this.medList.push(object);
        console.log(object);
      }

    }, (error) => {
      console.log(error);
    });
  }

  openMedEval(med_record){
    let medModal = this.modalCtrl.create(MedEvalUpdatePage,{
      medEval:med_record
    });
    medModal.present();
  }

  //Navigation
  closeModal() {
    this.viewCtrl.dismiss();
  }

}
