import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Window } from 'selenium-webdriver';
import { defineBase } from '@angular/core/src/render3';
@Component({
  selector: 'app-human',
  templateUrl: './human.page.html',
  styleUrls: ['./human.page.scss'],
})
export class HumanPage implements OnInit {

  @ViewChild('phone') phoneField
  @ViewChild('phone2') phone2Field
  @ViewChild('first_name') first_nameField
  @ViewChild('last_name') last_nameField
  @ViewChild('id') idField
  @ViewChild('email')emailField
  @ViewChild('comma')commaField
 // @ViewChild('show') nameField
  //@ViewChild('doc.id') idField



  dataFromDatabase = []

  constructor(private router: Router, private db: AngularFirestore,) { }

  ngOnInit() {
    // this.db.collection('Events').add({...})
/*
    this.db.collection('Show').get().subscribe(result => {
      debugger
      const docs = result.docs.map(doc => doc.data())
      this.dataFromDatabase = docs


    })
   */
  }
  s: string="";

  /*
  ngOnInit() {}

  onSelect(countryId) { 
    this.listField = null;
    for (var i = 0; i < this.countries.length; i++)
    {
      if (this.countries[i].id == countryId) {
        this.selectedCountry = this.countries[i];
      }
    }
}
*/
  saveData() {
    this.db.collection('Human').add({
      first_name: this.first_nameField.nativeElement.value,
      last_name: this.last_nameField.nativeElement.value,
      email: this.emailField.nativeElement.value,
      id: this.idField.nativeElement.value,
      phone: this.phoneField.nativeElement.value,
      phone2: this.phone2Field.nativeElement.value,
      comma: this.commaField.nativeElement.value
    })
  window.alert("הדוח נוסף בהצלחה")
  }

 /* try(d){
   

   //console.log(this.target_audienceField.nativeElement.value)
    var a=this.db.collection('Events').doc(d).get().subscribe
    (result => {
      const data = result.data().season
      const data1 = result.data().hebrew_year
      console.log(data);
      this.hebrew_yearField.nativeElement.value=data1

    })


 
 }
*/

}