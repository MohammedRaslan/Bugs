import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notifications=[];
  profile:any;
  address:any;
  constructor(private navCtrl: NavController, private router: Router, public api: ApiService, public loading: LoadingServiceService, public toast: ToastServiceService) { }
  ionViewWillEnter() {
    this.getProfile();

    this.getNotification()
  }
  getProfile() {

    this.api.getProfile().then((res: any) => {
      console.log(res);
      this.profile = res
      if (this.profile.address1 != "null" && this.profile.address1 != null) {
        this.address = this.profile.address1
      }


    }, error => {
      this.toast.present(error.error.message)

    })
  }
  getNotification() {
    this.loading.present()
    this.api.getNotifications().then((res: any) => {
      this.loading.dismiss()
      console.log(res);
      this.notifications = res
      if(this.notifications.length>0){
        for(let item of this.notifications){
          item.created_at = moment(  item.created_at).format('YYYY/MM/DD')
        }
      }

    }, error => {
      this.loading.dismiss()
      console.log(error);

      this.toast.present(error.error)

    })
  }
  markNotificationAsRead() {
    this.api.makeNotificationsSeen().then((res: any) => {
      console.log(res);

    }, error => {
      console.log(error);


    })
  }
  ngOnInit() {
  }
  back() {
    // this.navCtrl.navigateBack('tabs/home');
    this.navCtrl.back()

  }
  ionViewWillLeave() {
    this.markNotificationAsRead();
  }
}
