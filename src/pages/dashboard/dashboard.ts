import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { ToastController, ModalController, NavController } from 'ionic-angular';


// Providers
import { AuthProvider } from '../../providers/auth/auth';
import { StorageProvider } from '../../providers/storage/storage'

// Pages
import { MapPage } from '../map/map';
import { FindRecordsPage } from '../find-records/find-records';


/**
 * Generated class for the VisualChartsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-dashboard',
    templateUrl: 'dashboard.html',
})
export class DashboardPage {


    constructor(private toastCtrl: ToastController, 
        public modalCtrl: ModalController, 
        private navCtrl: NavController,
        private storagePrvdr:StorageProvider,
        private auth: AuthProvider) {
        
        this.auth.authenticated();
    }

    ionViewCanEnter(): boolean {
        //Authenticates Page
        return this.auth.authenticated();
      }
      ionViewDidEnter() { 
        this.storeCredentials()
      }

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
