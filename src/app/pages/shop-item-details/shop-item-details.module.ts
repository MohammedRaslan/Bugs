import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopItemDetailsPageRoutingModule } from './shop-item-details-routing.module';

import { ShopItemDetailsPage } from './shop-item-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopItemDetailsPageRoutingModule
  ],
  declarations: [ShopItemDetailsPage]
})
export class ShopItemDetailsPageModule {}
