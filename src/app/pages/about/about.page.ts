import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(private navCtrl: NavController, private iab: InAppBrowser) {


    // browser.close();
  }
  ionViewWillEnter() {
    const browser = this.iab.create('http://bugsnroses.com/about', '_self', {
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
