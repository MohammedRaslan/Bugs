import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-shop-item-details',
  templateUrl: './shop-item-details.page.html',
  styleUrls: ['./shop-item-details.page.scss'],
})
export class ShopItemDetailsPage implements OnInit {
  item: any;
  item_number = 1;

  constructor(private navCtrl: NavController, private router: Router, private route: ActivatedRoute, public toast: ToastServiceService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.item = this.router.getCurrentNavigation().extras.state.item;
        console.log(this.item);
        
      }
    });
  }
  ngOnInit() {
  }
  back() {
    this.navCtrl.back()
  }
  minus() {
    if (this.item_number == 1) {

    }
    else {
      this.item_number--;
    }
  }
  add() {
    this.item_number++;
  }
  addTodCart(product) {
    product['quantity'] = this.item_number
    console.log(product);
    // Get Storage Data
    let storageData: any = JSON.parse(localStorage.getItem('cartData'));
    console.log(storageData);

    // Check is storage data is null or empty,
    // Then add first item in cart and store data in local storage 
    if (storageData === null || storageData === []) {
      storageData = [];
      storageData.push(product);
      console.log(storageData);

      localStorage.setItem('cartData', JSON.stringify(storageData));
      this.toast.present('Item added successfully')

    }
    //  Update existing storage
    else {
      const isExist = storageData.find(x => x.id === product.id);
      if (isExist) {
        console.log('exist');

        storageData = storageData.map((item, index) => {
          console.log(item);

          if (item.id === product.id) {
            storageData[index].quantity += product.quantity;
          }
          return item
        });
        console.log(storageData);

        localStorage.setItem('cartData', JSON.stringify(storageData));
        this.toast.present('Item added successfully')


      } else {
        storageData.push(product);
        console.log(storageData);

        localStorage.setItem('cartData', JSON.stringify(storageData));
        this.toast.present('Item added successfully')

      }
    }

  }
  ionViewWillLeave() {
    this.item_number = 1
  }
}
