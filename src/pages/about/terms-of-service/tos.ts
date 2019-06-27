import { Component } from '@angular/core';
import { App, ViewController } from 'ionic-angular';

// Pages

@Component({
  selector: 'page-tos',
  templateUrl: 'tos.html'
})
export class TermsOfServicePage {

  constructor(public viewCtrl: ViewController, private app: App) { }

  closeModal() {
    this.viewCtrl.dismiss();
  }
  

}
