import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { GenericButtonComponent } from '../components/generic-button/generic-button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(
      [
      {
        path: '',
        component: HomePage,
        children: [
          { path: 'events', loadChildren: '../eventsboard/eventsboard.module#EventsboardPageModule' },
          { path: 'catalog', loadChildren: '../catalog/catalog.module#CatalogPageModule' },
        ]
      }
    ]
    )
  ],
  declarations: [HomePage, GenericButtonComponent],
  providers: []
})
export class HomePageModule {    
}
