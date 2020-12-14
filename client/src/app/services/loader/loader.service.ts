import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loader: HTMLIonLoadingElement = null;
  
  constructor(private loadingController: LoadingController) { }

  async show() {
    this.loader = await this.loadingController.create({
      message: 'Please wait...',
      duration: 5000,
      backdropDismiss: false
    });
    this.loader.present();
  }

  remove() {
    if (this.loader) {
      this.loadingController.dismiss();
    } else {
      console.warn('Make sure to show the alert first before removing.');
    }
  }
}
