import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

// Initial page
import { SigninPage } from '../pages/signin/signin';

import { Splash } from '../pages/splash/splash';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = SigninPage;

  constructor(platform: Platform, statusBar: StatusBar, modalCtrl: ModalController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      //Below hides splashScreen
      //splashScreen.hide();

      //Creates Splashscreen
      let splash = modalCtrl.create(Splash);
      splash.present();

    });
  }

}
