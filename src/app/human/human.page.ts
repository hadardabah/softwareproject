import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Window } from 'selenium-webdriver';
import { FormControl, Validators, NgForm } from '@angular/forms';

import { defineBase } from '@angular/core/src/render3';
import { database } from 'firebase';
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
  @ViewChild('email') emailField
  @ViewChild('comma') commaField
  // @ViewChild('show') nameField
  //@ViewChild('doc.id') idField
  //hi i am liel
  // hi i am chen

  dataFromDatabase = []
  old_id: any;
  time: any;
  
  constructor(private router: Router, private db: AngularFirestore,private ngZone:NgZone ) { }


  ngOnInit() {
    // this.db.collection('Events').add({...})
    this.db.collection('Human').get().subscribe(result => {
      const docs = result.docs.map(doc => doc.data())
      this.dataFromDatabase = docs
    })

  }


  /*
  ngAfterViewChecked()
    {
      console.log("in")
      if(this.idField!='' && this.idField != this.idField.nativeElement.value )
      { this.first_nameField.nativeElement.value = this.first_nameField
        this.last_nameField.nativeElement.value = this.last_nameField
        this.emailField.nativeElement.value = this.emailField
        this.idField.nativeElement.value = this.idField
        this.phoneField.nativeElement.value = this.phoneField
        this.phone2Field.nativeElement.value =  this.phone2Field
        this.commaField.nativeElement.value = this.commaField
      }
    }
  */


  saveData(form: NgForm) {
    this.db.collection('Human').add({
      first_name: this.first_nameField.nativeElement.value,
      last_name: this.last_nameField.nativeElement.value,
      email: this.emailField.nativeElement.value,
      id: this.idField.nativeElement.value,
      phone: this.phoneField.nativeElement.value,
      phone2: this.phone2Field.nativeElement.value,
      comma: this.commaField.nativeElement.value,
      time:new Date(),
      
    }).then(()=>{
      this.ngOnInit()
    });
    window.alert("הדוח נוסף בהצלחה")
  }
  edit(d) {
    //console.log(d.first_name)
    // window.alert("yasssss")
    this.first_nameField.nativeElement.value = d.first_name
    this.last_nameField.nativeElement.value = d.last_name
    this.emailField.nativeElement.value = d.email
    this.idField.nativeElement.value = d.id
    this.phoneField.nativeElement.value = d.phone
    this.phone2Field.nativeElement.value = d.phone2
    this.commaField.nativeElement.value = d.comma
    this.old_id=d.id
    this.time = d.time

    //console.log(d)
    // if(d == MouseEvent){
    // this.db.collection('Human', ref => ref.where('id', '==', d.id)).get().subscribe(result => {
    //   this.db.collection('Human').doc(result.docs[0].id).update({
    //     first_name: 'Helen' ,
    //   }); })
    // }

    // this.artist_filed.nativeElement.value =d.data().artist
    // this.whoWatch_filed.nativeElement.value ='chen'
  }
  edit_db() {
    //if ( this.time== undefined || this.time == '')
     // return
     // debugger
    // window.alert("in edit_db")
    console.log(this.time)
    this.db.collection('Human', ref => ref.where('time', '==',this.time)).get().subscribe(result => {
      this.updateData(result.docs[0].id)
    })
  
  
  }

updateData(docid)
{
  this.db.collection('Human').doc(docid).update({
    first_name: this.first_nameField.nativeElement.value,
    last_name: this.last_nameField.nativeElement.value,
    email: this.emailField.nativeElement.value,
    id: this.idField.nativeElement.value,
    phone: this.phoneField.nativeElement.value,
    phone2: this.phone2Field.nativeElement.value,
    comma: this.commaField.nativeElement.value,

    }).then(()=>{
      this.ngOnInit()
      alert('הרשומה התעדכנה')
    });


}



  delete(docParam) {

    if (confirm(" האם להסיר רשומה זאת?")) {
      this.dataFromDatabase = this.dataFromDatabase.filter(item => docParam.id !== item.id)

      this.db.collection('Human', ref => ref.where('id', '==', docParam.id)).get().subscribe(result => {
        this.db.collection('Human').doc(result.docs[0].id).delete()
      })
    }
    else {
    }
  }
}