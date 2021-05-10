import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  profile: any;

  constructor(private navCtrl: NavController, private iab: InAppBrowser, public api: ApiService, public loading: LoadingServiceService, public toast: ToastServiceService, public router: Router) { }

  ngOnInit() {
    this.getProfile();
  }
  back() {
    this.navCtrl.navigateBack('tabs/home');
  }
  openPrivacyPolicy() {
    const browser = this.iab.create('https://bugsnroses.com/privacy', '_self', {
      location: 'no'
    });

    browser.on('loadstop').subscribe(event => {

    });
  }
  getProfile() {
    this.loading.present()

    this.api.getProfile().then((res: any) => {
      console.log(res);
      this.profile = res
      this.loading.dismiss()


    }, error => {
      this.loading.dismiss()
      this.toast.present(error.error.message)

    })
  }
  onPaymentClick() {
    this.toast.present("The payment method is Cash on delivery for now");
  }

  onShippingAddressClick() {
    this.navCtrl.navigateForward('change-address');
  }
}
