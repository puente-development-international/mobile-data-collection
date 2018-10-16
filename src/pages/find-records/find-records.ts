import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController,ModalController } from 'ionic-angular';

//Providers
import { ParseProvider } from '../../providers/parse/parse';
import { QueryServiceProvider } from '../../providers/query-service/query-service';
import { AuthProvider } from '../../providers/auth/auth';
import { UiUxProvider } from '../../providers/ui-ux/ui-ux';

//Pages
import { ConsumerEnviroEvalPage } from "../consumer/consumer-enviro-eval/consumer-enviro-eval";
import { ConsumerMedicalEvalPage } from '../consumer/consumer-medical-eval/consumer-medical-eval';

//Components
import { ListofvitalsComponent } from '../../components/lists/listofvitals/listofvitals';
import { ListofEnviroComponent } from '../../components/lists/listofenv/listofenv';

@Component({
  selector: 'page-find-records',
  templateUrl: 'find-records.html',
})
export class FindRecordsPage {
  searchTerm: string = '';
  communityRecords: any[] = [];

  
  filteredCommunityRecords:any;

  constructor(public navCtrl: NavController, 
    public auth: AuthProvider,
    public navParams: NavParams,
    private parseSrvc: ParseProvider,
    private querySrvc: QueryServiceProvider,
    public actionSheetCtrl: ActionSheetController,
    private modalCtrl:ModalController,
    private themeCtrl: UiUxProvider) {
      console.log('ionViewDidLoad FindRecordsPage');
      this.themeCtrl.presentCustomLoading();
      this.aggregateRecords().then(()=>{
        this.filteredCommunityRecords = this.communityRecords;
        this.themeCtrl.dismissCustomLoading();  
    })
  }

  //Function that constructs an Array of Community Records
  public aggregateRecords(){
    let offset = this.communityRecords.length;
    let limit = 10000;

    /*
      return this.querySrvc.basicQuery(offset,limit,'SurveyData','surveyingOrganization',String(this.auth.currentUser().organization)).then((result) =>{
        for (let i = 0; i < result.length; i++) {
          let object = result[i];
          this.communityRecords.push(object);
        }

      }, (error) => {
        console.log(error);
      }); 
    */

    return this.querySrvc.cloudBasicQuery(offset,limit,'surveyingOrganization',String(this.auth.currentUser().organization)).then((result) =>{
      this.communityRecords = result;
    })

  }

  //Navigation
  openConsumerEnviroEval(){
    this.navCtrl.push(ConsumerEnviroEvalPage)
  }

  openConsumerDemographicsEval(patient){
    let demographicsModal = this.modalCtrl.create(ConsumerMedicalEvalPage,{
      patient:patient
    });

    demographicsModal.present()
  }

  openConsumerVitalsList(patient){
    let vitalsModal = this.modalCtrl.create(ListofvitalsComponent,{
      patient:patient
    });
    vitalsModal.present();
  }

  openConsumerEnvHistoryList(patient){
    let envModal = this.modalCtrl.create(ListofEnviroComponent,{
      patient:patient
    });
    envModal.present();
  }

  //Searchbar
  filterItems(){
    this.filteredCommunityRecords = this.communityRecords.filter((result) => {
      if (result.get('fname')){
        var fname =  result.get('fname').toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      }
      if (result.get('lname')){
        var lname =  result.get('lname').toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      }
      if (result.get('surveyingUser')){
        var dataCollector =  result.get('surveyingUser').toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      }
      
      return fname || lname || dataCollector;
    });
  }

  presentActionSheet(objectID) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Are you sure?',
      subTitle:'This action is unreversible',
      buttons: [
        {
          text: 'Destroy',
          role: 'destructive',
          handler: () => {
            this.parseSrvc.removeObjectsinClass(objectID,'SurveyData');
            this.communityRecords = [];
            this.aggregateRecords().then(()=>{
              this.filteredCommunityRecords = this.communityRecords;
            })
            this.themeCtrl.toasting("Deleted",'bottom');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }


}
