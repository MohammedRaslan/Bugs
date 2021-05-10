import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public Form: FormGroup;
  emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  validation_messages = {
    'username': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],

    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 8 characters .' },
    ],

  };


  constructor(private navCtrl: NavController, public formBuilder: FormBuilder, public toast: ToastServiceService,
    public api: AuthServiceService, public loading: LoadingServiceService, private fb: Facebook,
    private googlePlus: GooglePlus
  ) {
    this.Form = formBuilder.group({
      username: [
        '',
        Validators.compose([Validators.required,
        Validators.pattern(this.emailPattern)])
      ],
      password: [
        '',
        Validators.compose([
          Validators.maxLength(30),
          Validators.minLength(8),
          Validators.required
        ])
      ]
    });

  }

  ngOnInit() {
  }
  goToSignup() {
    this.navCtrl.navigateForward('/signup')
  }
  goToResetPassword() {
    this.navCtrl.navigateForward('/reset-password')
  }
  // goToTabs() {
  //   this.navCtrl.navigateForward('/tabs')

  // }
  onSubmitLogin() {
    if (!this.Form.valid) {
      this.toast.present('Please check your information', 'bottom')
    }
    else {
      const formData = this.Form.value
      console.log(formData);
      console.log('login loading');

      this.loading.present()
      this.api.login(formData.username, formData.password).then((res: any) => {
        console.log(res);

        this.loading.dismiss()
        const user = JSON.stringify(res.user)
        localStorage.setItem('userData', user)
        this.navCtrl.navigateRoot(['tabs/home']);

      }, error => {
        console.log(error);
        this.toast.present(error)
        this.loading.dismiss()

      })

    }
  }
  async facebookLogin() {
    try {
      // Log in to Facebook and request user data
      let facebookResponse = await this.fb.login(['public_profile', 'email']);
      let facebookAuthData = {
        id: facebookResponse.authResponse.userID,
        access_token: facebookResponse.authResponse.accessToken,
      };

      // // Request the user from parse
      // let toLinkUser = new Parse.User();
      // let user = await toLinkUser._linkWith('facebook', { authData: facebookAuthData });

      // // If user did not exist, updates its data
      // if (!user.existed()) {
      //   let userData = await this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture)', []);
      //   user.set('username', userData.name);
      //   user.set('name', userData.name);
      //   user.set('email', userData.email);
      //   await user.save();
      // }
      this.loginWithFacebook(facebookResponse.authResponse.accessToken)
    } catch (err) {
      console.log('Error logging in', err);

      this.toast.present(err.message)

    }
  }
  loginWithFacebook(access_token) {


    const formData = this.Form.value
    console.log(formData);
    console.log('login loading');

    this.loading.present()
    this.api.loginWithFacebooke(access_token).then((res: any) => {
      console.log(res);

      this.loading.dismiss()
      const user = JSON.stringify(res.user)
      localStorage.setItem('userData', user)
      this.navCtrl.navigateRoot(['tabs/home']);

    }, error => {
      console.log(error);
      this.toast.present(error)
      this.loading.dismiss()

    })


  }
  loginWithGoogle(access_token) {


    const formData = this.Form.value
    console.log(formData);
    console.log('login loading');

    this.loading.present()
    this.api.loginWithGoogle(access_token).then((res: any) => {
      console.log(res);

      this.loading.dismiss()
      const user = JSON.stringify(res.user)
      localStorage.setItem('userData', user)
      this.navCtrl.navigateRoot(['tabs/home']);

    }, error => {
      console.log(error);
      this.toast.present(error)
      this.loading.dismiss()

    })


  }
  googleLogin() {
    console.log("in");

    this.googlePlus.login({}).then((res) => {
      console.log(res);
      const user = res
      console.log(user.accessToken);
      this.loginWithGoogle(user.accessToken)
    }).catch((error) => {
      this.toast.present("There is an error please try again")
      console.log(error);

    })
  }

}
