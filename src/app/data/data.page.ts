import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Window } from 'selenium-webdriver';
import { defineBase } from '@angular/core/src/render3';
import { initDomAdapter } from '@angular/platform-browser/src/browser';
import {FormControl, Validators, NgForm} from '@angular/forms';

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
  time: any;

  constructor(private router: Router, private db: AngularFirestore,) { }

  ngOnInit() {
    this.db.collection('Data').get().subscribe(result => {
      const docs = result.docs.map(doc => doc.data())
      this.dataFromDatabase = docs
    })
  }

  saveData(form: NgForm) {
    this.db.collection('Data').add({
      Building_name: this.Building_nameField.nativeElement.value,
      type_building: this.type_buildingField.nativeElement.value,
      Building_address: this.Building_addressField.nativeElement.value,
      capacity: this.capacityField.nativeElement.value,
      contact_name: this.contact_nameField.nativeElement.value,
      contact_phone: this.contact_phoneField.nativeElement.value,
      mailcontact: this.mailcontactField.nativeElement.value,
      comma: this.commaField.nativeElement.value,
      time:new Date(),
    }).then(()=>{
      this.ngOnInit()
    });
  window.alert("הטופס נוסף בהצלחה")
  }

  edit(d) {
    this.Building_nameField.nativeElement.value = d.Building_name
    this.type_buildingField.nativeElement.value = d.type_building
    this.Building_addressField.nativeElement.value = d.Building_address
    this.capacityField.nativeElement.value = d.capacity
    this.contact_nameField.nativeElement.value = d.contact_name
    this.contact_phoneField.nativeElement.value = d.contact_phone
    this.mailcontactField.nativeElement.value = d.mailcontact
    this.commaField.nativeElement.value = d.comma
    this.time = d.time
  }

  edit_db() {
    this.db.collection('Data', ref => ref.where('time', '==',this.time)).get().subscribe(result => {
      this.updateData(result.docs[0].id)
    })
  }

updateData(docid){
  this.db.collection('Data').doc(docid).update({
    Building_name: this.Building_nameField.nativeElement.value,
      type_building: this.type_buildingField.nativeElement.value,
      Building_address: this.Building_addressField.nativeElement.value,
      capacity: this.capacityField.nativeElement.value,
      contact_name: this.contact_nameField.nativeElement.value,
      contact_phone: this.contact_phoneField.nativeElement.value,
      mailcontact: this.mailcontactField.nativeElement.value,
      comma: this.commaField.nativeElement.value,
    }).then(()=>{
      this.ngOnInit()
      alert('הרשומה התעדכנה')
    });
}

delete(docParam){
if(confirm("האם להסיר את הרשומה מהטבלה?"))
 this.dataFromDatabase = this.dataFromDatabase.filter(item => docParam.time !== item.time)
 this.db.collection('Data' , ref => ref.where('time' , '==' , docParam.time)).get().subscribe(result => {
    this.db.collection('Data').doc(result.docs[0].id).delete()
 })}
}
