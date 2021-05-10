import { Component } from '@angular/core';

import { Platform, MenuController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  userName = ""
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    private storage: Storage,
    private appVersion: AppVersion,
    private iab: InAppBrowser

  ) {
    this.initializeApp();
  }

  initializeApp() {

    this.platform.ready().then(() => {
      this.appVersion.getAppName().then(value => {
        console.log(value);

      }).catch(err => {
        alert(err);
      });
      this.storage.get('token').then(res => {
        if (res) {
          this.navCtrl.navigateRoot('/tabs');
          this.storage.get('user').then(res => {
            console.log(res);

            this.userName = res.name
          })
          this.splashScreen.hide();


        }
        else {
          this.navCtrl.navigateRoot('/tutorial-slides');
          this.splashScreen.hide();

        }
      })


      this.statusBar.styleDefault();
      this.menuRadius();
    });
  }
  menuRadius() {
    setTimeout(() => {
      document.querySelector('ion-menu').shadowRoot.querySelector('.menu-inner').setAttribute('style', 'border-radius:25px 0px 0px 25px');
    }, 2000);
  }
  goToSideItem(item) {
    console.log(item);
    this.menuCtrl.toggle();
    this.router.navigateByUrl('tabs/' + item)

  }
  openPrivacyPolicy() {
    const browser = this.iab.create('https://bugsnroses.com/privacy', '_self', {
      location: 'no'
    });

    browser.on('loadstop').subscribe(event => {

    });
  }
  openAboutPage() {
    const browser = this.iab.create('https://bugsnroses.com/about', '_self', {
      location: 'no'
    });

    browser.on('loadstop').subscribe(event => {

    });
  }
  logout() {
    this.menuCtrl.toggle();
    this.storage.clear();
    this.navCtrl.navigateRoot(['/login']);

  }
}
