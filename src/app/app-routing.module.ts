import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { SinginPage } from './singin/singin.page';
import { LoginGuardGuard } from './guards/login-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [LoginGuardGuard] },
  { path: 'singin', loadChildren: './singin/singin.module#SinginPageModule', canActivate: [LoginGuardGuard] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'catalog-table', loadChildren: './catalog-table/catalog-table.module#CatalogTablePageModule' , canActivate: [LoginGuardGuard]},
  { path: 'catalog-edit', loadChildren: './catalog-edit/catalog-edit.module#CatalogEditPageModule', canActivate: [LoginGuardGuard] },


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
