import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public Form: FormGroup;
  emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  mobilePattern = /^(\+2|002|2)?(011|010|012|015)([0-9]{8})$/;
  validation_messages = {

    // 'name': [
    //   { type: 'required', message: 'First name is required.' }
    // ],

    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    // 'mobile': [
    //   { type: 'pattern', message: 'Enter a valid mobile.' },
    //   { type: 'required', message: 'A Mobile number is required' }

    // ],

    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 8 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password fields don\'t match' }
    ]
  };
  constructor(private navCtrl: NavController, public formBuilder: FormBuilder, public toast: ToastServiceService,
    public api: AuthServiceService, public loading: LoadingServiceService) {
    this.Form = formBuilder.group({
      // name: [
      //   '',
      //   Validators.compose([Validators.required])
      // ],
      email: [
        '',
        Validators.compose([Validators.required,
        Validators.pattern(this.emailPattern)])
      ],
      // mobile: [
      //   '',
      //   Validators.compose([Validators.required,
      //   Validators.pattern(this.mobilePattern)])
      // ],
      matching_passwords: new FormGroup({
        password: new FormControl('', Validators.compose([
          Validators.minLength(8),
          Validators.required,
        ])),
        confirm_password: new FormControl('', Validators.required)
      }, (formGroup: FormGroup) => {
        return SignupPage.areEqual(formGroup);
      })
    });



  }
  static areEqual(formGroup: FormGroup) {
    let val;
    let valid = true;

    for (let key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        let control: FormControl = <FormControl>formGroup.controls[key];

        if (val === undefined) {
          val = control.value
        } else {
          if (val !== control.value) {
            valid = false;
            break;
          }
        }
      }
    }

    if (valid) {
      return null;
    }

    return {
      areEqual: true
    };
  }
  ngOnInit() {
  }
  onSubmitSignup() {
    if (!this.Form.valid) {
      this.toast.present('Please check your information', 'bottom')
    }
    else {
      const formData = this.Form.value

      console.log('loading signup');

      this.loading.present()

      this.api.register(formData.email, formData.matching_passwords.password, formData.matching_passwords.confirm_password).then((res: any) => {
        this.loading.dismiss()
        console.log(res.user);

        const user = JSON.stringify(res.user)
        localStorage.setItem('userData', user)
        this.navCtrl.navigateRoot(['tabs/home']);
      }, error => {
        this.loading.dismiss()
        this.toast.present(error)

        // if (error.error.email != null) {
        //   this.toast.present(error.error.email)
        // }
        // else {
        //   this.toast.present(error.error.password)

        // }
      })
    }
  }
  back() {
    this.navCtrl.back()
  }
}
