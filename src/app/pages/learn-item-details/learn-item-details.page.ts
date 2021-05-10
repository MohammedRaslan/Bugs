import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-learn-item-details',
  templateUrl: './learn-item-details.page.html',
  styleUrls: ['./learn-item-details.page.scss'],
})
export class LearnItemDetailsPage implements OnInit {
  item: any;
  comment = ""
  comments = [];
  Like="Like";
  constructor(private navCtrl: NavController, public alertController: AlertController, private router: Router, private route: ActivatedRoute,
    public api: ApiService,
    public loading: LoadingServiceService,
    private socialSharing: SocialSharing
    , public toast: ToastServiceService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.item = this.router.getCurrentNavigation().extras.state.item;
        this.comments = this.item.comments
        console.log(this.item);
        if(this.item.is_liked){
          this.Like = 'UnLike';

        }
        else{
          this.Like = 'Like';

        }
      }
    });
  }

  ngOnInit() {
    this.getBolgData();
  }
  back() {
    this.navCtrl.back()
  }
  doComment() {
    if (this.comment == "") {
      this.toast.present("Please enter comment")
    }
    else {
      this.loading.present()
      console.log(this.item.id);
      console.log(this.comment);


      this.api.comment(this.item.id, this.comment).then((res: any) => {
        console.log(res);
        this.loading.dismiss()
        this.getBolgData();
        this.toast.present("Comment send successfully")
      }, error => {
        this.loading.dismiss()
        console.log(error);

        this.toast.present("There is an error please try again")

      })
    }
  }
  like() {

    this.loading.present()
    this.api.like(this.item.id).then((res: any) => {
      console.log(res);
      this.loading.dismiss()
      if (!res[0]) {
        this.toast.present("UnLike")
        this.Like = 'Like';

      }
      else {
        this.toast.present("Liked")
        this.Like = 'UnLike';

      }

    }, error => {
      this.loading.dismiss()
      console.log(error);

      this.toast.present("There is an error please try again")

    })

  }
  share() {
    this.socialSharing.share("http://bugsnroses.com/blog/" + this.item.id)
  }
  async deleteComment(item, index) {

    const alert = await this.alertController.create({
      header: 'Delete item',
      message: 'Do you want to delete this comment',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log("in yes");
            this.removeComment(item, index);





          }
        }
      ]
    });

    await alert.present();
  }
  removeComment(item, index) {

    console.log(item);

    this.api.deleteComment(item.id).then((res: any) => {
      console.log(res);
      this.loading.dismissNonRestrictedLoading()
      // this.total = this.total - (item.finalPrice);
      this.comments.splice(index, 1)
      this.getBolgData();

    }, error => {
      this.loading.dismissNonRestrictedLoading()
      // this.toast.present(error.error)
      if (error.error == "") {
        this.toast.present("There is an error please try again")

      }
      else {
        if (error.comment_id) {
          this.toast.present("There is an error please try again");

        }
        else if (error.message) {
          this.toast.present("Comment deleted");

          this.comments.splice(index, 1)
          this.getBolgData();
        }
        else {
          this.toast.present(error.error)
        }
      }

    })


  }
  getBolgData() {
    this.api.getBolg(this.item.id).then((res: any) => {
      console.log(res);
      res.img = "https://bugsnroses.com/" + res.img.replace('public', 'storage')
      this.item = res
      this.comments = this.item.comments


    }, error => {
      if (error.error == "") {
        this.toast.present("There is an error please try again")

      }
      else {
        this.toast.present(error.error)
      }

    })

  }
}
