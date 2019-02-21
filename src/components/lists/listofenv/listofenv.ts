import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController,ViewController, ModalController } from 'ionic-angular';

//Providers
import { QueryServiceProvider } from "../../../providers/query-service/query-service";

import { EnviroEvalUpdatePage} from '../../../pages/update-forms/env-update/env-update';


@Component({
  selector: 'listofenv',
  templateUrl: 'listofenv.html'
})
export class ListofEnviroComponent {

  envList = [];

  //Object
  patient : any;

  constructor(private querySrvc:QueryServiceProvider,
    public navParams: NavParams,
    private viewCtrl:ViewController,
    private modalCtrl: ModalController) {
    console.log('Hello ListofEnviroComponent');
    this.patient = navParams.get('patient');
    this.aggregate(this.patient);
  }

  aggregate(patientObject:string) {
    let offset = this.envList.length;
    let limit = 1000;

    console.log(patientObject);
    return this.querySrvc.basicQuery(offset,limit,'HistoryEnvironmentalHealth','client', patientObject).then((result) =>{
      for (let i = 0; i < result.length; i++) {
        let object = result[i];
        this.envList.push(object);
        console.log(object);
      }

    }, (error) => {
      console.log(error);
    });
  }

  openEnvHealthetails(envHlth_record){
    let vitalsModal = this.modalCtrl.create(EnviroEvalUpdatePage,{
      envHlth:envHlth_record
    });
    vitalsModal.present();
  }

  //Navigation
  closeModal() {
    this.viewCtrl.dismiss();
  }

}
