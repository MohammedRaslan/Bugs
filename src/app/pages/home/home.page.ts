import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  homeData: any;
  blogs: any;
  offer: any;
  products: any;
  img: any
  sliderConfig = {
    slidesPerView: 3
  }
  secondSliderConfig = {
    slidesPerView: 2

  }
  constructor(
    public api: DataService, public loading: LoadingServiceService, public toast: ToastServiceService, public router: Router) {

  }
  ionViewWillEnter() {
    if (this.loading.isLoading) {
      this.loading.dismiss()

    }
    this.getHomeData();
  }

  getHomeData() {
    console.log("home loading");
    if (this.loading.isLoading) {
      this.loading.isLoading = false
      this.loading.dismiss()

    }
    this.loading.present();
    this.api.getHomeData().then((res: any) => {
      console.log(res);
      this.loading.dismiss()

      this.blogs = res.blogs;
      for (let item of this.blogs) {
        item.img = "https://bugsnroses.com/" + item.img.replace('public', 'storage')
      }

      this.offer = res.offer;

      this.products = res.products;

      for (let item of this.products) {
        item.img1 = "https://bugsnroses.com/" + item.img1.replace('public', 'storage')
        item.img2 = "https://bugsnroses.com/" + item.img2.replace('public', 'storage')
        item.img3 = "https://bugsnroses.com/" + item.img3.replace('public', 'storage')
        item.name = JSON.parse(item.name).en;
        item.text = JSON.parse(item.text).en;
        item.category.name = JSON.parse(item.category.name).en;

      }
      console.log(this.products);
      
      this.img = this.products[0].img1
      console.log(this.img);

    }, error => {
      this.loading.dismiss()
      this.toast.present(error.error.message)

    })
  }
  openBlogDetails(item) {
    let navigationExtras: NavigationExtras = { state: { item: item } };
    this.router.navigate(['tabs/learn/learn-item-details'], navigationExtras);

  }
  goToProductDetails(item) {
    let navigationExtras: NavigationExtras = { state: { item: item } };
    this.router.navigate(['tabs/shop/shop-item-details'], navigationExtras);
  }
}
