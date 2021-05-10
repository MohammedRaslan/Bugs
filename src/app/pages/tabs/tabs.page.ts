import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  cartCount: any = 0;
  constructor(public menuCtrl: MenuController, private navCtrl: NavController
  ) { }
  ionViewWillEnter() {
    let storageData: any = JSON.parse(localStorage.getItem('cartData'));
    if (storageData != null || storageData != []) {
      for (let item of storageData) {
        this.cartCount += item.quantity
      }

    }
  }
  ngOnInit() {


  }
  toggleMenu() {
    this.menuCtrl.toggle(); //Add this method to your button click function
  }
  goToTab(page) {
    this.navCtrl.navigateRoot(['/' + page]);
  }
}
