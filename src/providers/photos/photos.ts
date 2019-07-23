import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Injectable()
export class PhotosProvider {

  constructor(private camera:Camera) {
    console.log('Hello PhotosProvider');
  }

  /**
  * Returns Photo
  * 
  * @example
  * getPhoto()
  * 
  * @returns latitude and longitude coordinates
  */
  async getPhoto() {
    const options: CameraOptions = {
      quality: 100,
      //targetWidth: 900,
      //targetHeight: 600,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      
    }      
    
    let imageData =  'data:image/jpeg;base64,' + this.camera.getPicture(options);

    return imageData
  }
 

}
