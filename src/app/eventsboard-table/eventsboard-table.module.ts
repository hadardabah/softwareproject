import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventsboardTablePage } from './eventsboard-table.page';

const routes: Routes = [
  {
    path: '',
    component: EventsboardTablePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EventsboardTablePage]
})
export class EventsboardTablePageModule {}
