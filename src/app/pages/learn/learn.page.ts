import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.page.html',
  styleUrls: ['./learn.page.scss'],
})
export class LearnPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  data = [];
  pageNumber = 0;
  nextPageLink = null;

  constructor(private router: Router, private navCtrl: NavController
    , public api: ApiService, public loading: LoadingServiceService, public toast: ToastServiceService) {
  }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.getBlogsData();

  }
  goToItemDetails(article) {
    let navigationExtras: NavigationExtras = { state: { item: article } };
    this.router.navigateByUrl('tabs/learn/learn-item-details', navigationExtras);
  }
  back() {
    this.navCtrl.back()
  }
  getBlogsData() {
    this.loading.present();
    console.log('blog loading');

    this.api.getBlogsData().then((res: any) => {
      console.log(res);
      this.data = res.data
      for (let item of this.data) {
        item.img = "https://bugsnroses.com/" + item.img.replace('public', 'storage')
      }
      this.nextPageLink = res.next_page_url
      console.log("next page" + res.next_page_url);

      this.loading.dismiss()
      this.loading.dismiss()
    }, error => {
      this.loading.dismiss()
      this.loading.dismiss()
      this.toast.present(error.error.message)

    })


  }
  loadBlogsData(infiniteScrollEvent = null) {
    if (this.nextPageLink == null) {
      this.infiniteScroll.disabled = true;

    }
    else {
      this.api.getBlogContent(this.nextPageLink).then(
        (res: any) => {
          console.log(res);

          if (res.length === 0) {
            this.infiniteScroll.disabled = true;
          }

          for (const item of res) {
            item.img = "https://bugsnroses.com/" + item.img.replace('public', 'storage')

            this.data.push(item);
          }

          if (infiniteScrollEvent) {
            infiniteScrollEvent.target.complete();
          }

          if (this.loading.isLoading) {
            this.loading.dismiss();
          }
        },
        (error) => {
          console.log(error);

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
    this.loadBlogsData(event);
  }
}
