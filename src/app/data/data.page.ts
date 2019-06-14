import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Window } from 'selenium-webdriver';
import { defineBase } from '@angular/core/src/render3';
import { initDomAdapter } from '@angular/platform-browser/src/browser';
@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
})
export class DataPage implements OnInit {

  @ViewChild('Building_name')Building_nameField
  @ViewChild('type_building') type_buildingField
  @ViewChild('Building_address') Building_addressField
  @ViewChild('capacity')capacityField
  @ViewChild('contact_name') contact_nameField
  @ViewChild('contact_phone')contact_phoneField
  @ViewChild('mailcontact')mailcontactField
  @ViewChild('comma')commaField
 



  dataFromDatabase = []

  constructor(private router: Router, private db: AngularFirestore,) { }

  ngOnInit() {
    // this.db.collection('Events').add({...})

    this.db.collection('Data').get().subscribe(result => {
      debugger
      const docs = result.docs.map(doc => doc.data())
      this.dataFromDatabase = docs


    })
   
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
    this.db.collection('Data').add({
      Building_name: this.Building_nameField.nativeElement.value,
      type_building: this.type_buildingField.nativeElement.value,
      Building_address: this.Building_addressField.nativeElement.value,
      capacity: this.capacityField.nativeElement.value,
      contact_name: this.contact_nameField.nativeElement.value,
      contact_phone: this.contact_phoneField.nativeElement.value,
      mailcontact: this.mailcontactField.nativeElement.value,
      comma: this.commaField.nativeElement.value
    })
  window.alert("הטופס נוסף בהצלחה")
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

onDoubleClick(docParam){
  var txt;
if(confirm("האם להסיר את הרשומה מהטבלה?"))
 this.dataFromDatabase = this.dataFromDatabase.filter(item => docParam.Data !== item.Data)
 this.db.collection('Data' , ref => ref.where('data' , '==' , docParam.Data)).get().subscribe(result => {
    this.db.collection('Data').doc(result.docs[0].id).delete()
 })}

}
