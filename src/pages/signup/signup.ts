import { Component } from '@angular/core';
import { NavController, LoadingController, ViewController } from 'ionic-angular';

// Providers
import { AuthProvider } from '../../providers/auth/auth';
import { QueryServiceProvider} from '../../providers/query-service/query-service';

// Pages
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  password: string = '';
  firstname: string = '';
  lastname: string = '';
  username: string = '';
  confirm: string = '';
  email: string = '';
  organization: string = '';
  role: string = '';



  organizationsss = []

  constructor(public navCtrl: NavController, 
    public viewCtrl: ViewController,
    private authPvdr: AuthProvider, 
    private loadCtrl: LoadingController,
    private query:QueryServiceProvider) { 
      this.organizationsss = ['Puente', 'OWS', 'WOF']
  }

  ionViewDidLoad() {
    console.log('Initiate Signup');
  }
  
  /*
  Loading Controller
  
  An overlay that can be used to indicate activity while blocking user interaction. 
  The loading indicator appears on top of the app's content, 
  and can be dismissed by the app to resume user interaction with the app.
  */
  public doRegister() {
    let loader = this.loadCtrl.create({
      content: 'Signing up...'
    });
    
    loader.present();

    this.authPvdr.signup(this.firstname, this.lastname, this.username, this.password, this.email, this.organization,this.role).subscribe((success) => {
      this.navCtrl.setRoot(TabsPage);
      loader.dismissAll();
    }, (error) => {
      loader.dismissAll();
    });
  }

  async listOfOrganizations(){
    var users = await this.query.distinctUsers()
    for (let i=0; i<users.length;i++){
      this.organizationsss.push(users[i].get('organization'))
    }
    let unique_orgs = this.organizationsss.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
    console.log(unique_orgs)
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
