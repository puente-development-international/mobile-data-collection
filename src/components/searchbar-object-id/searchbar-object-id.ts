import { Component, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/debounceTime';

import { QueryServiceProvider } from '../../providers/query-service/query-service';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'searchbar-object-id',
  templateUrl: 'searchbar-object-id.html'
})

export class SearchbarObjectIdComponent {
  @Output() emitObjectIDfromComponent = new EventEmitter();

  searchTerm: string = '';
  //allItems: any;
  allItems = [];
  filteredItems:any;
  selectedItem:any;

  constructor(public navCtrl: NavController,
    private querySrvc:QueryServiceProvider,
    private auth:AuthProvider) {

      this.auth.authenticated();
      this.listItems().then(()=>{
        this.filteredItems = this.allItems; 
      })
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter(){
  }

  setItem(item){
    /*
    Sets item selected from list to selectedItem to be emitted.
    For List of Buttons
    */
    this.selectedItem = item;

    //Emits selectedItem to the parent class
    this.emitObjectIDfromComponent.emit(this.selectedItem);
    //console.log(this.selectedItem.get('fname'));
  }

  filterItems(){
    /*
    For Searchbar
    

    this.filteredItems = this.allItems.filter((result) => {
      return result.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    }); */

    this.filteredItems = this.allItems.filter((result) => {
      return result.get('fname').toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });

  }

  filterItems1(){
    this.filteredItems = this.allItems.filter((result) => {
      if (result.get('fname')){
        var fname =  result.get('fname').toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      }
      if (result.get('lname')){
        var lname =  result.get('lname').toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      }
      return fname || lname;
    });
  }

  listItems(): Promise<any> {
    //Retrieves list of records from server

    //Creates a natural "skip" of certain results based on surveyPoints length
    //let offset = this.allItems.length;
    //let offset = 0;

    //Limits the length of the searched results
    let limit = 3000;

    //Returns the query then displays those "result" by pushing into surveyPoints object
    //Based on Parse surveyingOrganization Column and name of organization for the User
    return this.querySrvc.basicQuery(0, limit, 'SurveyData', 'surveyingOrganization', String(this.auth.currentUser().organization)).then((result) => {
      for (let i = 0; i < result.length; i++) {
        let object = result[i];
        this.allItems.push(object);
      }
    }, (error) => {
      console.log(error);
    });
  }

}
