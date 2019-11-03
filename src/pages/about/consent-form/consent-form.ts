import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

// Pages

@Component({
  selector: 'page-consent-form',
  templateUrl: 'consent-form.html'
})
export class ConsentFormPage {

  constructor(public viewCtrl: ViewController) { }

  closeModal() {
    this.viewCtrl.dismiss();
  }
  

}
