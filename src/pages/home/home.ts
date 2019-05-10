import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { ToastController, ModalController, NavController } from 'ionic-angular';


// Providers
import { AuthProvider } from '../../providers/auth/auth';
import { StorageProvider } from '../../providers/storage/storage'

// Pages
import { SigninPage } from '../signin/signin';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfileModalPage } from '../profile-modal/profile-modal';
import { MapPage } from '../map/map';
import { FindRecordsPage } from '../find-records/find-records';

// Form Components
import { PatientIDForm } from '../../components/forms/patientid/patientid';
import { EnvironmentalHistoryForm } from '../../components/forms/environmentalhistory/environmentalhistory';
import { MedicalHistoryForm } from '../../components/forms/medicalhistory/medicalhistory';
import { VitalsForm } from '../../components/forms/vitals/vitals';
import { EvaluationMedicalForm } from '../../components/forms/evaluation-medical/evaluation-medical';
import { EvaluationSurgicalForm } from '../../components/forms/evaluation-surgical/evaluation-surgical';
import { PrescriptionsForm } from '../../components/forms/prescriptions/prescriptions';
import { AllergiesForm} from '../../components/forms/allergies/allergies';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  /*
    Template NG-MODELS
  */
  //Set Default NG-model
  //Design Element: Segment
  viewMode = 'datacollection';
 
  ////Design Element: Content Drawer
  drawerOptions: any;

  constructor(private toastCtrl: ToastController, 
    public modalCtrl: ModalController, 
    private navCtrl: NavController,
    private storagePrvdr:StorageProvider,
    private auth: AuthProvider,  
    private app: App) {
    
    this.auth.authenticated();

    //Design Element: Segment
    this.viewMode;
  }

  ionViewCanEnter(): boolean {
    //Authenticates Page
    return this.auth.authenticated();
  }
  ionViewDidEnter() { 
    this.storeCredentials()
  }
  
  /*
    Functions
  */

  /*
    Navigation
  */

  //Forms
  openProfileModal() {
    //Opens Profile Modal Page
    let myModal = this.modalCtrl.create(ProfileModalPage);

    //.present() shows modal
    myModal.present();
  }

  openPatientID() {
    //this.navCtrl.push(PatientIDForm);
    let myModal = this.modalCtrl.create(PatientIDForm);

    //.present() shows modal
    myModal.present();
  }

  openEnvironmentalHistory() {
    let myModal = this.modalCtrl.create(EnvironmentalHistoryForm);

    myModal.present();
  }

  openMedicalHistory() {
    let myModal = this.modalCtrl.create(MedicalHistoryForm);

    myModal.present();
  }

  openVitals() {
    let myModal = this.modalCtrl.create(VitalsForm);

    myModal.present();
  }

  openMedicalEvaluation() {
    let myModal = this.modalCtrl.create(EvaluationMedicalForm);

    myModal.present();
  }

  openSurgicalEvaluation() {
    let myModal = this.modalCtrl.create(EvaluationSurgicalForm);

    myModal.present();
  }

  openPrescriptions(){
    let myModal = this.modalCtrl.create(PrescriptionsForm);

    myModal.present();
  }

  openAllergies(){
    let myModal = this.modalCtrl.create(AllergiesForm);

    myModal.present();
  }
  //Pages
  openCharts() {
    this.navCtrl.push(DashboardPage);
  }

  openMapPage() {
    this.navCtrl.push(MapPage);
  }

  openFindRecords() {
    this.navCtrl.push(FindRecordsPage);
  }

  /*
    Authentication
  */
  public signout() {
    this.auth.signout().subscribe(() => {
      this.app.getRootNav().setRoot(SigninPage);
    });
  }

  /*
    Controllers
  */
  presentToast() {
    /*
    A Toast is a subtle notification commonly used in modern applications. 
    It can be used to provide feedback about an operation or to display a system message.
    The toast appears on top of the app's content, and can be dismissed 
    by the app to resume user interaction with the app.
    */
    let toast = this.toastCtrl.create({
      message: 'Submitted | Entregado',
      duration: 2500,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  doRefresh(refresher){
    console.log('Begin async operation for refresher', refresher);
    //this.listPoints();
    setTimeout(() => {
      console.log('Async operation for refresher has ended');
      //this.listPoints();
      refresher.complete();
    }, 2000);
  }

  storeCredentials(){
    let name = this.auth.currentUser().name;
    let org = this.auth.currentUser().organization;
    this.storagePrvdr.setUserInfoToStorage(name,org);
  }


  

}
