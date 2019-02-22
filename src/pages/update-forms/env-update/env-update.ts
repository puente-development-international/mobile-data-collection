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
  selector: 'page-env-update',
  templateUrl: 'env-update.html',
})
export class EnviroEvalUpdatePage {
  _environmentalHealth : any;
  
  environmentalHealth = {
    id:null,
    yearsLivedinthecommunity: null,
    yearsLivedinThisHouse: null,
    waterAccess: null,
    typeofWaterdoyoudrink: null,
    latrineAccess: null,
    clinicAccess: null,
    conditionoFloorinyourhouse: null,
    conditionoRoofinyourhouse: null,
    medicalproblemswheredoyougo: null,
    dentalproblemswheredoyougo:null,
    biggestproblemofcommunity:null,
    timesperweektrashcollected:null,
    wheretrashleftbetweenpickups:null,
    numberofIndividualsLivingintheHouse:null,
    numberofChildrenLivinginHouseUndertheAgeof5:null,
    houseownership:null
  }

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private parsePrvdr:ParseProvider,
    private themeSrvc:UiUxProvider) {
    this._environmentalHealth = navParams.get('envHlth');
    this.populateFields();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsumerEnviroEvalPage');
  }

  popView(){
    this.navCtrl.pop();
  }

  populateFields(){ 
    /*
      Pulls object from other page and puts the attributes in localObject
    */
    
    for (var property in this._environmentalHealth.attributes) {
      if (this.environmentalHealth.hasOwnProperty(property)) {
        this.environmentalHealth[property] = this._environmentalHealth.attributes[property];
      }

    }

    //Updates Forms!
    //for (var prop in this.patient.attributes) this.patientID[prop] = this.patient.attributes[prop];
  }

  public post_n_update() {
    this.environmentalHealth.id = this._environmentalHealth.id;
    console.log(this.environmentalHealth.id);

    this.parsePrvdr.postObjectsToClass(this.environmentalHealth,'HistoryEnvironmentalHealth').then(() => {
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
  this.environmentalHealth[key]= value;
  console.log(this.environmentalHealth[key])
  }

}
