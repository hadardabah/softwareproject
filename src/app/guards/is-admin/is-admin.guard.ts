import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate  {

  constructor(private userAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {    
    if(this.userAuth.auth.currentUser == null) {
        this.router.navigateByUrl('login')
    }
    return this.firestore.collection('users').doc(this.userAuth.auth.currentUser.uid).get().toPromise()
    .then(result => {
      if(result == null || result.data() == null) {
        this.router.navigateByUrl('login')
        return false
      }
      else if(result.data().rule === 'admin') return true
      else {
        this.router.navigateByUrl('login')
        return false
      }
    }).catch(() => {
      this.router.navigateByUrl('login')
      return false
    })
  }
  
}