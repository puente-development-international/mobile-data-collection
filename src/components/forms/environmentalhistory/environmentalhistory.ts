import { Component, ViewChild } from '@angular/core';
import { ViewController } from 'ionic-angular';

// Providers
import { ParseProvider } from '../../../providers/parse/parse';
import { AuthProvider } from '../../../providers/auth/auth';
import { UiUxProvider} from '../../../providers/ui-ux/ui-ux';

//Components
import {  ContentDrawerComponent} from '../../content-drawer/content-drawer';

@Component({
  selector: 'environmentalhistory',
  templateUrl: 'environmentalhistory.html'
})
export class EnvironmentalHistoryForm {
  @ViewChild("ContentDrawerComponent") contentDrawer: ContentDrawerComponent;

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
    latrineAccess: null,
    clinicAccess: null,
    conditionoFloorinyourhouse: null,
    conditionoRoofinyourhouse: null,
    medicalproblemswheredoyougo: null,
    dentalproblemswheredoyougo:null,
    biggestproblemofcommunity:null,
    timesperweektrashcollected:null,
    wheretrashleftbetweenpickups:null
  }

  //Design Element
  accordionItems: any = [];

  //Design Element: Content Drawer
  drawerOptions: any;

  constructor(private auth: AuthProvider,  
    private parseProvider: ParseProvider,
    private viewCtrl: ViewController,
    private themeCtrl:UiUxProvider) {

    console.log('Hello EnvironmentalHistoryForm ');
    this.auth.authenticated();
    
    //Design Element: Accordion
    this.accordionItems = [
      {expanded: false},
      {expanded: false},
      {expanded: false},
    ];

    //Design Element: Content Drawer
    this.drawerOptions = {
      handleHeight: 50,
      thresholdFromBottom: 200,
      thresholdFromTop: 200,
      bounceBack: true
    };
  }

  post_n_clear(){
    this.parseProvider.postObjectsToClassWithRelation(this.environmentalHealth,'HistoryEnvironmentalHealth','SurveyData',this.client.objectID).then(()=> {
      for (var key in this.environmentalHealth){
        this.environmentalHealth[key] = null;
      }
      this.client.fname=null; 
      this.client.lname=null;
      this.isenabled=false;
      this.themeCtrl.toasting('Submitted| Entregado', "bottom");
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

  inputObjectIDfromComponent(selectedItem) {
    this.isenabled=true;
    this.client.objectID= selectedItem.id; //Retrieve RESERVED Parse-Server Object ID Value
    this.client.fname = selectedItem.get('fname');
    this.client.lname = selectedItem.get('lname');
    console.log(this.client.objectID);
  }



}
