import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  email: any;
  constructor(private navCtrl: NavController, public api: ApiService, public loading: LoadingServiceService, public toast: ToastServiceService) { }

  ngOnInit() {
  }
  back() {
    this.navCtrl.back()
  }
  reset() {
    if (this.email == "" || this.email == null) {
      this.toast.present("Please enter your mail")
    }
    else {
      this.loading.present()

      this.api.resetPassword(this.email).then((res: any) => {
        console.log(res);

        this.loading.dismiss()
        this.toast.present(res.message)
        this.back()


      }, error => {
        this.loading.dismiss()
        this.toast.present(error.email)

      })
    }

  }
}
