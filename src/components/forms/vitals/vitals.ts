import { Component, ViewChild } from '@angular/core';
import { ViewController, Modal, ModalController } from 'ionic-angular';

// Providers
import { ParseProvider } from '../../../providers/parse/parse';
import { AuthProvider } from '../../../providers/auth/auth';
import { UiUxProvider} from '../../../providers/ui-ux/ui-ux';

//Component
import { SearchbarObjectIdComponent } from '../../searchbar-object-id/searchbar-object-id';

@Component({
  selector: 'vitals',
  templateUrl: 'vitals.html'
})
export class VitalsForm {

  isenabled:boolean=false;
  
  client = {
    objectID: null,
    fname: null,
    lname: null
  }

  vitals = {
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

  bloodPressure = {
    systolic: null,
    diastolic:null
  }

  //Design Element: Content Drawer
  drawerOptions: any;
  
  constructor(private parseProvider: ParseProvider,
    private auth: AuthProvider,  
    public viewCtrl:ViewController,
    private modalCtrl:ModalController,
    public themeCtrl:UiUxProvider) {

    console.log('Hello VitalsForm');
    this.auth.authenticated();

    //Design Element: Content Drawer
    this.drawerOptions = {
      handleHeight: 50,
      thresholdFromBottom: 200,
      thresholdFromTop: 200,
      bounceBack: true
    };
  }

  async fixBloodPressure(){
    for (let key in this.bloodPressure){
      if (this.bloodPressure[key] == null){
        this.bloodPressure[key] = 0;  
      }

    }
    this.vitals.bloodPressure = await String(this.bloodPressure.systolic+'/'+ this.bloodPressure.diastolic)
    console.log(this.vitals.bloodPressure)
  }

  async post_n_clear(){
    await this.fixBloodPressure() //combine fields
    this.parseProvider.postObjectsToClassWithRelation(this.vitals,'Vitals','SurveyData',this.client.objectID).then(()=> {
      for (var key in this.vitals){
        this.vitals[key] = null;
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

  formatNumber(e: any, separator: string = '.', decimals: number = 2) {
    let a:any = e.value.split('');
    let ns:string = '';
    a.forEach((c:any) => { if (!isNaN(c)) ns = ns + c; });
    ns = parseInt(ns).toString();
    if (ns.length < (decimals+1)) { ns = ('0'.repeat(decimals+1) + ns); ns = ns.slice((decimals+1)*-1); }
    let ans = ns.split('');
    let r = '';
    for (let i=0; i < ans.length; i++) if (i == ans.length - decimals) r = r + separator + ans[i]; else r = r + ans[i];
    e.value = r;
  }


}
