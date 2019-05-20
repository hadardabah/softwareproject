import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}
  goToOtherPage() {
    this.router.navigateByUrl('/singin')
  }


}

var clickListener = function() {

      alert("Enter your age");
 
  
};
var loadPage = function() {
  document.getElementById("logo").addEventListener("click", clickListener, false);
  
 
 };
