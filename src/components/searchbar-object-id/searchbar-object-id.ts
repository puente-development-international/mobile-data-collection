import { Component, Output, EventEmitter } from '@angular/core';
import { NavController, ViewController} from 'ionic-angular';
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
  allItems = [];
  filteredItems:any[] = [];
  selectedItem:any;
  searching: any = false;

  constructor(
    public navCtrl: NavController,
    private querySrvc:QueryServiceProvider,
    private auth:AuthProvider,
    private viewCtrl:ViewController) {

      this.auth.authenticated();

      this.searching = true;
      this.listItems().then(()=>{
        this.searching = false;
        this.filteredItems = this.allItems; 
      })
  }

  ngOnInit() {
    this.setFilteredItems();
  }

  setItem(item){
    /*
    Sets item selected from list to selectedItem to be emitted.
    For List of Buttons
    */
    this.selectedItem = item;

    //Emits selectedItem to the parent class
    //this.emitObjectIDfromComponent.emit(this.selectedItem);
    //console.log(this.selectedItem.get('fname'));
    console.log(this.selectedItem)
    this.dismiss(this.selectedItem)
  }

  //old
  filterItems(){
    /*
    For Searchbar
    

    this.filteredItems = this.allItems.filter((result) => {
      return result.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    }); */

    this.filteredItems = this.allItems.filter((result) => {
      let result_comb = result.get('fname') + ' ' + result.get('lname') 
      if (result.get('fname')){
        var name =  result_comb.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      }
      return name;
    });

  }

  //1
  listItems(): Promise<any> {
    //Retrieves list of records from server

    //Creates a natural "skip" of certain results based on surveyPoints length
    //let offset = this.allItems.length;
    //let offset = 0;

    //Limits the length of the searched results
    let limit = 1000;

    //Returns the query then displays those "result" by pushing into surveyPoints object
    //Based on Parse surveyingOrganization Column and name of organization for the User
    return this.querySrvc.basicQuery(0, limit, 'SurveyData', 'surveyingOrganization', String(this.auth.currentUser().organization)).then((result) => {
      for (let i = 0; i < result.length; i++) {
        let object = result[i];
        this.allItems.push(object);
      }
      console.log("Done with Query")
    }, (error) => {
      console.log(error);
    });
  }

  //2
  filterItems_new(searchTerm){
    return this.allItems.filter((item) => {
      let result_comb = item.get('fname') + ' ' + item.get('lname') 
      return result_comb.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      
      //return fname || lname;
    });
  }
  //3
  setFilteredItems() {
    this.filteredItems = this.filterItems_new(this.searchTerm);
  }

  dismiss(item) {
    this.viewCtrl.dismiss(item);
  }

  close(){
    let item = null
    this.dismiss(item)
  }

  

}
