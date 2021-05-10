import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopItemDetailsPage } from './shop-item-details.page';

const routes: Routes = [
  {
    path: '',
    component: ShopItemDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopItemDetailsPageRoutingModule {}
