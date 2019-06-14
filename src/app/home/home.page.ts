import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('name') nameField
  @ViewChild('age') ageField

  dataFromDatabase = []

  constructor(private router: Router, private db: AngularFirestore,) { }

  ngOnInit() {
    // this.db.collection('Events').add({...})

    this.db.collection('Events').get().subscribe(result => {
      
      const docs = result.docs.map(doc => doc.data())
      this.dataFromDatabase = docs
    })
  }

  saveData() {
    this.db.collection('Events').add({
      name: this.ageField.nativeElement.value,
      age: this.ageField.nativeElement.value
    })

  }


  goToOtherPage() {
    this.router.navigateByUrl('/singin')
  }


}

var clickListener = function () {

  alert("Enter your age");


};
var loadPage = function () {
  document.getElementById("logo").addEventListener("click", clickListener, false);


};
