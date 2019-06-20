import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { GenericButtonComponent } from '../components/generic-button/generic-button.component';
import { IsAdminGuard } from '../guards/is-admin/is-admin.guard';

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
          { path: 'human', loadChildren: '../human/human.module#HumanPageModule' },
          { path: 'reports', loadChildren: '../reports/reports.module#ReportsPageModule', canActivate: [IsAdminGuard] },
          { path: 'budgets', loadChildren: '../budgets/budgets.module#BudgetsPageModule' },
          { path: 'data', loadChildren: '../data/data.module#DataPageModule' },
          { path: 'catalog-table', loadChildren: '../catalog-table/catalog-table.module#CatalogTablePageModule'},
          { path: 'catalog-edit', loadChildren: '../catalog-edit/catalog-edit.module#CatalogEditPageModule'},
          { path: 'eventsboard-table', loadChildren: '../eventsboard-table/eventsboard-table.module#EventsboardTablePageModule'},
          { path: 'eventsboard-edit', loadChildren: '../eventsboard-edit/eventsboard-edit.module#EventsboardEditPageModule'}
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
