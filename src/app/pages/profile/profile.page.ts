import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  segment = 'info';
  profile: any;
  orderHistory: any;
  profileName = "";
  profileNameChecker: boolean = false;

  profileBirthDate: any[];
  profileBirthDateChecker: boolean = false;

  profileEmail = "";
  profileEmailChecker: boolean = false;


  profilePhone = "";
  profilePhoneChecker: boolean = false;

  profilePassword = "";
  profilePasswordChecker: boolean = false;

  profileAddress1 = "";
  profileAddress1Checker: boolean = false;

  profileAddress2 = "";
  profileAddress2Checker: boolean = false;
  constructor(private navCtrl: NavController, public api: ApiService, public loading: LoadingServiceService, public toast: ToastServiceService, public router: Router) {

  }

  ngOnInit() {
    this.getProfile()
  }

  back() {
    this.navCtrl.navigateBack('tabs/home');
  }
  getProfile() {
    this.loading.present()

    this.api.getProfile().then((res: any) => {
      console.log(res);
      this.profile = res
       if (this.profile.birthdate != null)
        this.profile.birthdate = moment(this.profile.birthdate).format('YYYY/MM/DD')
      this.loading.dismiss()


    }, error => {
      this.loading.dismiss()
      this.toast.present(error.error.message)

    })
  }
  getOrderHistory() {
    console.log("in history");

    this.loading.present()

    this.api.getOrderHistory().then((res: any) => {
      console.log(res);
      this.orderHistory = res
      for (let item of this.orderHistory) {
        item.created_at = moment(item.created_at).format('YYYY/MM/DD')
      }

      this.loading.dismiss()


    }, error => {
      this.loading.dismiss()
      this.toast.present(error.error.message)

    })
  }
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);

    console.log('Segment changed', ev.detail.value);
    if (ev.detail.value == "orders") {
      this.getOrderHistory()

    }
    else if (ev.detail.value == "info") {
      this.getProfile()
    }

  }
  openProfileNameForEdit() {
    this.profileNameChecker = true
    if (this.profile.name != null) {
      this.profile.name = ""
    }
  }
  openProfileBirthDateForEdit() {
    this.profileBirthDateChecker = true
    if (this.profile.birthdate != null) {
      this.profile.birthdate = ""
    }
  }
  openProfileEmailForEdit() {
    this.profileEmailChecker = true
    if (this.profile.email != null) {
      this.profile.email = ""
    }
  }
  openProfilePhoneForEdit() {
    this.profilePhoneChecker = true
    if (this.profile.mobile != null) {
      this.profile.mobile = ""
    }
  }
  openProfilePasswordForEdit() {
    this.profilePasswordChecker = true

  }
  openProfileAddress1ForEdit() {
    this.profileAddress1Checker = true
    if (this.profile.address1 != null) {
      this.profile.address1 = ""
    }
  }
  openProfileAddress2ForEdit() {
    this.profileAddress2Checker = true
    if (this.profile.address2 != null) {
      this.profile.address2 = ""
    }
  }
  Save() {
    console.log(this.profileName);
    console.log(this.profileBirthDate);
    console.log('date', moment(this.profileBirthDate).format('YYYY/MM/DD'));
    console.log(this.profilePhone);
    console.log(this.profilePhone);
    console.log(this.profilePassword);
    console.log(this.profileAddress1);
    console.log(this.profileAddress2);
    if(this.profilePassword==""){
      this.toast.present("Please enter your password")

    }
    else{
      this.loading.present()
      if (this.profileEmail == "") {
        this.profileEmail = this.profile.email
      }
      if (this.profilePassword == "") {
        this.profilePassword = null
  
      }
      if (this.profilePhone == "") {
        this.profilePhone = this.profile.mobile
  
      }
      if (this.profileAddress1 == "") {
        this.profileAddress1 = this.profile.address1
  
      }
      if (this.profileAddress2 == "") {
        this.profileAddress2 = this.profile.address2
  
      }
  
      this.api.updateProfile(this.profileName.trim(), "",
        this.profileEmail.trim(), this.profilePhone, this.profilePassword, this.profilePassword, this.profileAddress1, this.profileAddress2).then((res: any) => {
          console.log(res);
          this.loading.dismiss()
          this.toast.present("Account updated successfully")
  
  
        }, error => {
          console.log(error);
  
          this.loading.dismiss()
          const errors = error.mobile[0] ? error.mobile[0] : "There is an error please try again"
          this.toast.present(errors)
  
        })
    }
  
  }
}
