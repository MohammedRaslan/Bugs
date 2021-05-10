import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LearnItemDetailsPage } from './learn-item-details.page';

const routes: Routes = [
  {
    path: '',
    component: LearnItemDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnItemDetailsPageRoutingModule {}
