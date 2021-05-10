import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperMethodsServiceService {


  constructor(
    public modalController: ModalController
  ) { }

  async presentModal(page) {
    const modal = await this.modalController.create({
      component: page
    });
    return await modal.present();
  }
  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  //data will be object with target data you want to pass
  async presentModalWithData(page, data) {
    const modal = await this.modalController.create({
      component: page,
      componentProps: data
    });
    return await modal.present();
  }
}
