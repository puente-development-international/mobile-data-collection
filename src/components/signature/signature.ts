import { Component, ViewChild } from '@angular/core';
import { NavController, ViewController, ModalController} from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ConsentFormPage } from '../../pages/about/consent-form/consent-form';


/**
 * Generated class for the SignaturePadComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'signature',
  templateUrl: 'signature.html'
})
export class SignaturePadComponent {
  @ViewChild(SignaturePad) public signaturePad : SignaturePad;

  selectedItem:any;

  public signaturePadOptions : Object = {
    'minWidth': 2,
    'canvasWidth': 340,
    'canvasHeight': 200
  };
  public signatureImage : string;

  constructor(
    public navCtrl: NavController,
    private viewCtrl:ViewController,
    public modalCtrl: ModalController) {
    console.log('Hello SignaturePadComponent Component');
  }

  drawCancel() {
  //this.navCtrl.push(HomePage);
    this.close();
  }

  drawComplete() {
    this.signatureImage = this.signaturePad.toDataURL();
    //this.navCtrl.push(HomePage, {signatureImage: this.signatureImage});
    this.dismiss(this.signatureImage);
  }

  drawClear() {
    this.signaturePad.clear();
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

  dismiss(item) {
    this.viewCtrl.dismiss(item);
  }

  close(){
    let item = null
    this.dismiss(item)
  }

  presentConsentForm(){
    //Opens Profile Modal Page
    let myModal = this.modalCtrl.create(ConsentFormPage);

    //.present() shows modal
    myModal.present();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
