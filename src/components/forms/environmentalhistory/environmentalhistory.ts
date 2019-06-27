import { Component, ViewChild } from '@angular/core';
import { ViewController, ModalController } from 'ionic-angular';

// Providers
import { ParseProvider } from '../../../providers/parse/parse';
import { AuthProvider } from '../../../providers/auth/auth';
import { UiUxProvider} from '../../../providers/ui-ux/ui-ux';

//Components
import {  SearchbarObjectIdComponent} from '../../searchbar-object-id/searchbar-object-id';

@Component({
  selector: 'environmentalhistory',
  templateUrl: 'environmentalhistory.html'
})
export class EnvironmentalHistoryForm {

  isenabled:boolean=false;
  
  client = {
    objectID: null,
    fname: null,
    lname: null
  }

  environmentalHealth = {
    yearsLivedinthecommunity: null,
    yearsLivedinThisHouse: null,
    waterAccess: null,
    typeofWaterdoyoudrink: null,
    bathroomAccess:null,
    latrineAccess: null,
    clinicAccess: null,
    conditionoFloorinyourhouse: null,
    conditionoRoofinyourhouse: null,
    stoveType:null,
    medicalproblemswheredoyougo: null,
    dentalproblemswheredoyougo:null,
    biggestproblemofcommunity:null,
    timesperweektrashcollected:null,
    wheretrashleftbetweenpickups:null,
    numberofIndividualsLivingintheHouse:null,
    numberofChildrenLivinginHouseUndertheAgeof5:null,
    houseownership:null

  }

  //Design Element
  accordionItems: any = [];

  //Design Element: Content Drawer
  drawerOptions: any;

  constructor(private auth: AuthProvider,  
    private parseProvider: ParseProvider,
    private viewCtrl: ViewController,
    private modalCtrl:ModalController,
    private themeCtrl:UiUxProvider) {

    console.log('Hello EnvironmentalHistoryForm ');
    this.auth.authenticated();
    
    //Design Element: Accordion
    this.accordionItems = [
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false},
    ];

  }

  post_n_clear(){
    this.parseProvider.postObjectsToClassWithRelation(this.environmentalHealth,'HistoryEnvironmentalHealth','SurveyData',this.client.objectID).then(()=> {
      for (var key in this.environmentalHealth){
        this.environmentalHealth[key] = null;
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
  }

  //Design Element: Accordion
  expandItem(item){
 
    this.accordionItems.map((listItem) => {

        if(item == listItem){
            listItem.expanded = !listItem.expanded;
        } else {
            listItem.expanded = false;
        }

        return listItem;

    });

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

  /*
    * Sets the Values of a list of keys in the environmentalHalth Dictionary to null
    * 
    * @example
    * clear(['latrineAcess','bathroomAccess'])
    * 
    * @param {array} list of dictionary key
    * @returns 
  */
 clear(list_of_keys){
  for (let i=0; i<list_of_keys.length; i++){
    let x = list_of_keys[i]
    this.environmentalHealth[x] = null;      
  }
  
}



}
