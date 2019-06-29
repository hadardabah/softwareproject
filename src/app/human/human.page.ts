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
  @ViewChild('name') nameField
  @ViewChild('id') idField
  @ViewChild('email') emailField
  @ViewChild('comma') commaField

  dataFromDatabase = []
  dataFromDatabaseFiltered = []
  old_id: any;
  time: any;
  
  constructor(private router: Router, private db: AngularFirestore,private ngZone:NgZone ) { }


  ngOnInit() {
    // this.db.collection('Events').add({...})
    this.db.collection('Human').get().subscribe(result => {
      const docs = result.docs.map(doc => doc.data())
      this.dataFromDatabase = docs
      this.dataFromDatabaseFiltered = this.dataFromDatabase
    })

  }

 LegalTz(id) {

  console.log(id);
  var tot = 0;
  var tz = new String(id);
      
  var y=id;
  y = y.toString;

  for (var i=0; i<8; i++)
  {
    var x; 
    x = (((i%2)+1)*(<any>tz.charAt(i)));
    if (x > 9) 
    {
      x = x.toString();
      x = parseInt(x.charAt(0))+parseInt(x.charAt(1))
    }
      tot += x;
  }
       
  if ((tot+parseInt(tz.charAt(8)))%10 == 0) {
       return true;
  } 
  else {
       return false;
  }
}



  saveData(form: NgForm) {
    for(let i = 0; i < this.dataFromDatabase.length; i++){
      if(this.dataFromDatabase[i].name == this.nameField.nativeElement.value){
        window.alert("קיים אדם בשם זה במאגר")
        return;
      }
      if(this.dataFromDatabase[i].id == this.idField.nativeElement.value){
        window.alert("תעודת זהות קיימת במאגר")
        return;
      }
    }

    if(this.LegalTz(this.idField.nativeElement.value)==false){
      alert('תעודת זהות לא תקינה, נא הכנס מספר עם 9 ספרות')
    }
      else{

    this.db.collection('Human').add({
      name: this.nameField.nativeElement.value,
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
 }

  edit(d) {
    this.nameField.nativeElement.value = d.name
    this.emailField.nativeElement.value = d.email
    this.idField.nativeElement.value = d.id
    this.phoneField.nativeElement.value = d.phone
    this.phone2Field.nativeElement.value = d.phone2
    this.commaField.nativeElement.value = d.comma
    this.old_id=d.id
    this.time = d.time
  }

  edit_db() {
    console.log(this.time)
    this.db.collection('Human', ref => ref.where('time', '==',this.time)).get().subscribe(result => {
      this.updateData(result.docs[0].id)
    })
  }

updateData(docid)
{
  if(this.LegalTz(this.idField.nativeElement.value)==false){
    alert('תעודת זהות לא תקינה, נא הכנס מספר עם 9 ספרות')
  }
    else{

  
  this.db.collection('Human').doc(docid).update({
    name: this.nameField.nativeElement.value,
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
}


applyNameFilter(filterBy) {
  if(filterBy === '')
  {
    this.dataFromDatabaseFiltered = this.dataFromDatabase
    return
  }
  this.dataFromDatabaseFiltered = []
  this.dataFromDatabase.forEach(item => {
    if(item.name === filterBy) {
      this.dataFromDatabaseFiltered = [...this.dataFromDatabaseFiltered, item]
    }
  })
}

applyIdFilter(filterBy) {
  if(filterBy === '')
  {
    this.dataFromDatabaseFiltered = this.dataFromDatabase
    return
  }
  this.dataFromDatabaseFiltered = []
  this.dataFromDatabase.forEach(item => {
    if(item.id === filterBy) {
      this.dataFromDatabaseFiltered = [...this.dataFromDatabaseFiltered, item]
    }
  })
}


  delete(docParam) {

    if (confirm(" האם להסיר רשומה זאת?")) {
      this.dataFromDatabase = this.dataFromDatabase.filter(item => docParam.id !== item.id)

      this.db.collection('Human', ref => ref.where('id', '==', docParam.id)).get().subscribe(result => {
        this.db.collection('Human').doc(result.docs[0].id).delete()
      })
      this.dataFromDatabaseFiltered = this.dataFromDatabase
    }
    else {
    }
  }
}