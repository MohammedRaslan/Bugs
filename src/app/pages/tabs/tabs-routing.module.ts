import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'learn',
        loadChildren: () => import('../learn/learn.module').then(m => m.LearnPageModule)
      },
      {
        path: 'shop',
        loadChildren: () => import('../shop/shop.module').then(m => m.ShopPageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('../my-cart/my-cart.module').then(m => m.MyCartPageModule)
      },
      {
        path: 'more',
        // loadChildren: () => import('../my-cart/my-cart.module').then(m => m.MyCartPageModule)
      },
      {
        path: 'shop/shop-item-details',
        loadChildren: () => import('../shop-item-details/shop-item-details.module').then(m => m.ShopItemDetailsPageModule)
      },
      {
        path: 'learn/learn-item-details',
        loadChildren: () => import('../learn-item-details/learn-item-details.module').then(m => m.LearnItemDetailsPageModule)
      },
      {
        path: 'cart/checkout',
        loadChildren: () => import('../checkout/checkout.module').then(m => m.CheckoutPageModule)
      },
      {
        path: 'cart/checkout/order-success',
        loadChildren: () => import('../order-success/order-success.module').then(m => m.OrderSuccessPageModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('../notification/notification.module').then( m => m.NotificationPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then( m => m.SettingsPageModule)
      },
      {
        path: 'about',
        loadChildren: () => import('../about/about.module').then( m => m.AboutPageModule)
      },
      {
        path: 'privacy',
        loadChildren: () => import('../privacy/privacy.module').then( m => m.PrivacyPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
