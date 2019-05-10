import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';

/*
  Generated class for the StstorageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StorageProvider {

  constructor(public http: Http,
    private storage:Storage) {
    console.log('Hello Storage Provider');
  }

  getUserInfoFromStorage(){
    return this.storage.ready().then(() => {
      let username = this.storage.get('username');
      let org = this.storage.get('organization');
      console.log(username, org)
      return [username,org]
    });
  }

  setUserInfoToStorage(username:string,organization:string){
    this.storage.set('username', username);
    this.storage.set('organization', organization);
  }
  

}
