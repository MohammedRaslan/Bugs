import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LoadingOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingServiceService {
  constructor(public loadingController: LoadingController) { }
  public isLoading = false;
  public isNonRestrictedLoading = false;

  // async present() {
  //   this.isLoading = true;
  //   await this.loadingController
  //     .create({
  //       cssClass: 'loading-content'
  //     })
  //     .then(a => {
  //       a.present().then(() => {
  //         if (!this.isLoading) {
  //           a.dismiss().then(() => console.log('abort presenting'));
  //         }
  //       });
  //     });
  // }

  // async dismiss() {
  //   this.isLoading = false;
  //   await this.loadingController.dismiss();
  // }


  present() {
    this.isLoading = true;
    let options: LoadingOptions = {
      duration: 3000,
      spinner: 'crescent',
      cssClass: 'loading-content',
      showBackdrop:false
 

    };

 

    this.loadingController.create(options).then(createdLoader => {
      createdLoader.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          this.loadingController.dismiss();
        }
      })
    })
  }

  presentNonRestrictedLoading() {
    this.isNonRestrictedLoading = true;
    let options: LoadingOptions = {
      spinner: 'crescent',
      cssClass: 'loading-content',
      showBackdrop:false
    };

 

    this.loadingController.create(options).then(createdLoader => {
      createdLoader.present().then(() => {
        console.log('presented');
        if (!this.isNonRestrictedLoading) {
          this.loadingController.dismiss();
        }
      })
    })
  }

  async dismissNonRestrictedLoading() {
    if (this.isNonRestrictedLoading = true) {
      this.loadingController.dismiss();
      console.log('dismissed');
    }
    this.isNonRestrictedLoading = false;
  }
  async dismiss() {
    if (this.isLoading = true) {
      this.loadingController.dismiss();
      console.log('dismissed');
    }
    this.isLoading = false;
  }
}
