import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage implements OnInit {

  constructor(private navCtrl: NavController, private iab: InAppBrowser) {


  }
  ionViewWillEnter() {
    const browser = this.iab.create('https://bugsnroses.com/privacy', '_self', {
      location: 'no'
    });

    browser.on('loadstop').subscribe(event => {

    });
  }
  ngOnInit() {
  }
  back() {
    this.navCtrl.navigateBack('tabs/home');
  }
}
