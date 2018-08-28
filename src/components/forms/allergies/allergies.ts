import { Component,ViewChild } from '@angular/core';
import { ViewController } from 'ionic-angular';

// Providers
import { ParseProvider } from '../../../providers/parse/parse';
import { AuthProvider } from '../../../providers/auth/auth';
import { UiUxProvider} from '../../../providers/ui-ux/ui-ux';

//Components
import {ContentDrawerComponent } from '../../content-drawer/content-drawer';

@Component({
  selector: 'allergies',
  templateUrl: 'allergies.html'
})
export class AllergiesForm {
  @ViewChild("ContentDrawerComponent") contentDrawer: ContentDrawerComponent;

  isenabled:boolean=false;
  
  client = {
    objectID: null,
    fname: null,
    lname: null
  }

  allergies = {
    substance:null,
    reaction: null,
    category: null,
    severity: null,
    informationsource: null,
    onset: null,
    comments:null
    
  }

  //Design Element: Content Drawer
  drawerOptions: any;
  
  constructor(private parseProvider: ParseProvider,
    private auth: AuthProvider,  
    public viewCtrl:ViewController,
    public themeCtrl:UiUxProvider) {

    console.log('Hello AllergiesForm');
    this.auth.authenticated();

    //Design Element: Content Drawer
    this.drawerOptions = {
      handleHeight: 50,
      thresholdFromBottom: 200,
      thresholdFromTop: 200,
      bounceBack: true
    };
  }


  post_n_clear(){
    this.parseProvider.postObjectsToClassWithRelation(this.allergies,'Allergies','SurveyData',this.client.objectID).then(()=> {
      for (var key in this.allergies){
        this.allergies[key] = null;
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

  inputObjectIDfromComponent(selectedItem) {
    this.isenabled=true;
    this.client.objectID= selectedItem.id; //Retrieve RESERVED Parse-Server Object ID Value
    this.client.fname = selectedItem.get('fname');
    this.client.lname = selectedItem.get('lname');
    console.log(this.client.objectID);
  }

  set(value:string){
    this.allergies.severity = value;
  }


}
