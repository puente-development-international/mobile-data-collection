import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController,ModalController } from 'ionic-angular';

//Providers
import { ParseProvider } from '../../providers/parse/parse';
import { QueryServiceProvider } from '../../providers/query-service/query-service';
import { AuthProvider } from '../../providers/auth/auth';
import { UiUxProvider } from '../../providers/ui-ux/ui-ux';

//Pages
import { CustomForm } from '../../components/forms/custom-form/custom-form';


@Component({
  selector: 'page-manage-custom-forms',
  templateUrl: 'manage-custom-forms.html',
})
export class ManageCustomFormsPage {
  searchTerm: string = '';
  customForms: any[] = [];

  
  filteredCustomForms: any[] = [];

  constructor(public navCtrl: NavController, 
    public auth: AuthProvider,
    public navParams: NavParams,
    private parseSrvc: ParseProvider,
    private querySrvc: QueryServiceProvider,
    public actionSheetCtrl: ActionSheetController,
    private modalCtrl:ModalController,
    private themeCtrl: UiUxProvider) {
      console.log('ionViewDidLoad ManageCustomFormsPage');

      this.themeCtrl.presentCustomLoading();

      this.aggregateRecords().then(()=>{
        this.filteredCustomForms = this.customForms;
        this.themeCtrl.dismissCustomLoading();  
    })
  }

  //Function that constructs an Array of Community Records
  public aggregateRecords(){
    let offset = this.customForms.length;
    let limit = 2000;

    return this.querySrvc.basicQuery(offset,limit,'FormSpecifications','organizations',String(this.auth.currentUser().organization)).then((result) =>{
      for (let i = 0; i < result.length; i++) {
        let object = result[i];
        this.customForms.push(object);
      }
    }, (error) => {
      console.log(error);
    }); 
  }

  //Navigation

  openCustomForm(form){
    let customFormsModal = this.modalCtrl.create(CustomForm,{
      form:form
    });

    customFormsModal.present()
  }

  //Searchbar
  filterItems(){
    this.filteredCustomForms = this.customForms.filter((result) => {/*
      if (result.get('fname')){
        var fname =  result.get('fname').toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      }
      if (result.get('lname')){
        var lname =  result.get('lname').toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      }
      if (result.get('surveyingUser')){
        var dataCollector =  result.get('surveyingUser').toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      }
      
      return fname || lname || dataCollector;*/
    });
  }

  back(){
    this.navCtrl.pop()
  }


}
