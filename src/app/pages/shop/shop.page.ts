import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  lazyImage='https://proofmart.com/wp-content/uploads/2020/09/loading-icon-2-product.png'
  category = {
    "id": 0,
    "name": "all",
    "created_at": "2020-08-16 13:21:19",
    "offer_id": null,
    "status": 1,
    "updated_at": "2020-08-17 15:24:52"
  };
  categories = [{
    "id": 0,
    "name": "all",
    "created_at": "2020-08-16 13:21:19",
    "offer_id": null,
    "status": 1,
    "updated_at": "2020-08-17 15:24:52"
  }]

  products: any;
  nextPageLink = null;
  data = [];

  constructor(private router: Router, private navCtrl: NavController
    , public api: ApiService, public loading: LoadingServiceService, public toast: ToastServiceService) {
  }

  ngOnInit() {

  }
  ionViewWillEnter() {
    console.log('loading shop');

    this.getAllProducts();

  }
  goToItemDetails(item) {
    let navigationExtras: NavigationExtras = { state: { item: item } };
    this.navCtrl.navigateRoot(['shop-item-details'], navigationExtras);
  }
  back() {
    this.navCtrl.back()
  }
  getAllProducts() {
    this.category.name = 'all';
    console.log('shope loading');

    if (this.loading.isLoading) {
      this.loading.isLoading = false
      this.loading.dismiss()

    }
    this.loading.present();
    this.api.getAllProductsWithCategories().then((res: any) => {
      console.log(res);
      this.data = res.products.data
      this.loading.dismiss()

      this.nextPageLink = res.products.next_page_url
      console.log("next page" + res.next_page_url);
      console.log("next page" + this.nextPageLink);

      console.log("cat" + this.categories[0]);
      console.log("cat" + this.categories.length);
      for (let item of this.data) {
        item.img1 = "https://bugsnroses.com/" + item.img1.replace('public', 'storage')
        item.img2 = "https://bugsnroses.com/" + item.img2.replace('public', 'storage')
        item.img3 = "https://bugsnroses.com/" + item.img3.replace('public', 'storage')
        item.name = JSON.parse(item.name).en;
        item.text = JSON.parse(item.text).en;
        item.category.name = JSON.parse(item.category.name).en;
      }
      if (this.categories.length == 1) {
        for (let item of res.categories) {
          item.name = JSON.parse(item.name).en
          this.categories.push(item)

        }
      }

      console.log(this.categories);

      console.log("next page" + res.next_page_url);

    }, error => {
      this.loading.dismiss()
      this.toast.present(error.error.message)

    })

  }

  getAllProductsByCategory(id) {
    console.log('shop loading');

    this.loading.present();
    this.api.getProductsByCategory(id).then((res: any) => {
      console.log(res);
      this.loading.dismiss()
      this.data = []
      for (let item of res.data) {
        item.img1 = "https://bugsnroses.com/" + item.img1.replace('public', 'storage')
        item.img2 = "https://bugsnroses.com/" + item.img2.replace('public', 'storage')
        item.img3 = "https://bugsnroses.com/" + item.img3.replace('public', 'storage')
        item.name = JSON.parse(item.name).en;
        item.text = JSON.parse(item.text).en;
        item.category.name = JSON.parse(item.category.name).en;
      }
      this.data = res.data
  
      this.nextPageLink = res.next_page_url
      console.log("next page" + res.next_page_url);
      console.log("next page" + this.nextPageLink);

    }, error => {
      this.loading.dismiss()
      this.toast.present(error.error.message)

    })

  }
  loadNewProductsData(infiniteScrollEvent) {
    if (this.nextPageLink == null || this.nextPageLink == undefined) {
      this.infiniteScroll.disabled = true;
      infiniteScrollEvent.target.complete();

    }
    else {
      this.api.getNextProducts(this.nextPageLink).then(
        (res: any) => {
          console.log("next page result ");
        
          console.log(res);


          this.infiniteScroll.disabled = true;


          for (const item of res.products.data) {
            item.name = JSON.parse(item.name).en;
            item.text = JSON.parse(item.text).en;
            item.category.name = JSON.parse(item.category.name).en;
            item.img1 = "https://bugsnroses.com/" + item.img1.replace('public', 'storage')
            item.img2 = "https://bugsnroses.com/" + item.img2.replace('public', 'storage')
            item.img3 = "https://bugsnroses.com/" + item.img3.replace('public', 'storage')
            this.data.push(item);
          }
          this.nextPageLink = res.products.next_page_url;


          if (infiniteScrollEvent) {
            infiniteScrollEvent.target.complete();
          }

          if (this.loading.isLoading) {
            this.loading.dismiss();
          }
        },
        (error) => {
          console.log(error);
          this.infiniteScroll.disabled = true;

          if (infiniteScrollEvent) {
            infiniteScrollEvent.target.complete();
          }

          if (this.loading.isLoading) {
            this.loading.dismiss();
          }
        }
      );
    }

  }
  infiniteScrollLoadMore(event) {
    this.loadNewProductsData(event);
  }
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);

    console.log('Segment changed', ev.detail.value);

    if (ev.detail.value == 0) {
      this.category.name = 'all';
      this.data = []
      this.getAllProducts();
    }
    else {
      for (let cat of this.categories) {
        if (cat.id === ev.detail.value) {

          this.category.name = cat.name;
          break;

        }
      }
      this.data = []
      this.getAllProductsByCategory(ev.detail.value);
    }
  }
}
