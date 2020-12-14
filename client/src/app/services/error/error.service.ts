import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private router: Router, private alertController: AlertController) { }

  async generateError(message?: string, redirectRoute?: string) {
    const alertMenu = await this.alertController.create({
      header: 'Oops!',
      cssClass: 'error-alert-dialog',
      message: (
        message ||
        `
        There was an error getting the information necessary to play.
        We are sorry for the inconvenience, and please try again later.
        `
      ),
      buttons: ['OK']
    });
    alertMenu.present();
    alertMenu.onDidDismiss().then(() => {
      this.router.navigateByUrl(redirectRoute || '/play');
    })
  }
}
