import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoadingServiceService } from 'src/app/services/loading-service.service';

@Component({
  selector: 'app-tutorial-slides',
  templateUrl: './tutorial-slides.page.html',
  styleUrls: ['./tutorial-slides.page.scss'],
})
export class TutorialSlidesPage implements OnInit {

  constructor(private router: Router,
    public navCtrl: NavController,
    public loading: LoadingServiceService
  ) { }

  ngOnInit() {
    if (this.loading.isLoading) {
      this.loading.dismiss()

    }
  }
  goToLogin() {
    this.navCtrl.navigateForward('/login')
  }
  goToSignup() {
    this.navCtrl.navigateForward('/signup')

  }
}
