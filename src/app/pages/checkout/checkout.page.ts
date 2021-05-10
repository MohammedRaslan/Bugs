import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  address: any;
  cartData: any;
  subTotalPrice = 0;
  totalPrice = 0;
  products: any;
  constructor(private router: Router, private navCtrl: NavController, private route: ActivatedRoute, public api: ApiService, public loading: LoadingServiceService, public toast: ToastServiceService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.address = this.router.getCurrentNavigation().extras.state.address;
        this.subTotalPrice = this.router.getCurrentNavigation().extras.state.subTotal;
        console.log(this.subTotalPrice);

        this.totalPrice = this.subTotalPrice + 0

      }
    });
  }

  getCartData() {
    // this.loading.present()
    // this.api.getCartData().then((res: any) => {
    //   console.log(res);
    //   this.cartData = res
    //   this.loading.dismiss()
    //   for (let item of this.cartData) {
    //     this.subTotalPrice += (item.price * item.quantity)
    //   }
    //   this.totalPrice = this.subTotalPrice + 30


    // }, error => {
    //   this.loading.dismiss()
    //   console.log(error);

    //   this.toast.present(error.error)

    // })
  }
  ngOnInit() {
  }
  goToOrder() {
    this.loading.present()
    this.api.checkout().then((res: any) => {
      console.log(res);
      localStorage.removeItem('cartData')
      this.navCtrl.pop()
      this.router.navigateByUrl('tabs/cart/checkout/order-success')
    }, error => {
      this.loading.dismiss()
      console.log(error);

      this.toast.present("There is an error please try again")

    })
  }
  back() {
    this.navCtrl.back()
  }
}
