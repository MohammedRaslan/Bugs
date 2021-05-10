import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LearnItemDetailsPageRoutingModule } from './learn-item-details-routing.module';

import { LearnItemDetailsPage } from './learn-item-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LearnItemDetailsPageRoutingModule
  ],
  declarations: [LearnItemDetailsPage]
})
export class LearnItemDetailsPageModule {}
