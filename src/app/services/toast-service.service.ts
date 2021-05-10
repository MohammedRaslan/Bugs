import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {

  constructor(public toastController: ToastController) { }
  async present(message: string, position: 'bottom' | 'top' | 'middle' = 'bottom', durationMs = 2000) {
    const toast = await this.toastController.create({
      message,
      position,
      duration: durationMs,
      cssClass: 'toast-message'
    });
    toast.present();
  }
}