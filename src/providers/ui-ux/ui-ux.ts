import { Injectable } from '@angular/core';
import { ToastController, LoadingController, ModalController } from 'ionic-angular';
import { AnimatedCirclesComponent } from '../../components/animated-circles/animated-circles';

@Injectable()
export class UiUxProvider {

  loader;

  constructor(private toastCtrl:ToastController,
    private loadCtrl: LoadingController,
    private modalCtrl: ModalController) {
    console.log('Hello UiUxProvider Provider');
  }

  coolLoadz = this.modalCtrl.create(AnimatedCirclesComponent);

  /**
  * A Toast is a subtle notification commonly used in modern applications. 
    It can be used to provide feedback about an operation or to display a system message.
    The toast appears on top of the app's content, and can be dismissed 
    by the app to resume user interaction with the app.
  * 
  * @example
  * toasting("Submitted", "top",300)
  * 
  * @param {string} message Message the toast
  * @param {string} position Position of the Toast Either top or bottom
  * @param {number} duration Number of milliseconds
  * @returns nothing
  */
  toasting(message : string, position: string = 'bottom', duration : number = 2000) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  /**
  * Presents Loading notification
  * 
  * @example
  * loading("...","dots")
  * 
  * @param {string} content Loading Content
  * @param {string} spinner Spinner
  * @returns The loader
  */
  loading(content : string = "...", spinner : string = "dots") {
    let loader = this.loadCtrl.create({
        content : content,
        spinner : spinner
    });
    loader.present();
    return loader;
  }

  /**
  * Presents the Custom Loader 
  * 
  * @example
  * presentCustomLoading()
  * 
  * @returns 
  */
  presentCustomLoading(){
    //Not like a normal loader, not asynchronous 
    if(!this.loader){
      this.loader = this.coolLoadz;
      this.loader.present();
    }
  }

  /**
  * Dismiss the Custom Loader
  * 
  * @example
  * dismissCustomLoading()
  * 
  * @returns
  */
  dismissCustomLoading(){
    if(this.loader){
      this.loader.dismiss();
      this.loader = null;
    }
  }



}
