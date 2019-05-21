import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { SinginPage } from './singin/singin.page';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'singin', loadChildren: './singin/singin.module#SinginPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'eventsboard', loadChildren: './eventsboard/eventsboard.module#EventsboardPageModule' },
 //{ path: 'home', component: HomePage },
 //{ path: 'singin', component: SinginPage },
 //{ path: 'singup', component: SingupPage },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
