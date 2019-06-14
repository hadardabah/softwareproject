import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Window } from 'selenium-webdriver';
import { defineBase } from '@angular/core/src/render3';


@Component({

  selector: 'app-budgets',
  templateUrl: './budgets.page.html',
  styleUrls: ['./budgets.page.scss'],
})
export class BudgetsPage implements OnInit {
  
  @ViewChild('origain_f') phoneoriginField
  @ViewChild('name_f') nameField
  @ViewChild('sum_f') sumField
  @ViewChild('buget_stat') bugetField
  @ViewChild('mimosh') mimoshField




  //constructor() { }


  dataFromDatabase = []
  old_id: any;
  time: any;
  

  constructor(private router: Router, private db: AngularFirestore,private ngZone:NgZone ) { }

 

  ngOnInit() {
    
        this.db.collection('Budget').get().subscribe(result => {
      debugger
      const docs = result.docs.map(doc => doc.data())
      this.dataFromDatabase = docs

   
  })
  }
 
    saveData() {
    this.db.collection('Budget').add({
      origain_f: this. phoneoriginField.nativeElement.value,
      name_f: this.nameField.nativeElement.value,
      sum_f: this.sumField.nativeElement.value,
      buget_stat: this.bugetField.nativeElement.value,
      mimosh: this.mimoshField.nativeElement.value,
      time:new Date(),

    }).then(()=>{
      this.ngOnInit()
    });
    window.alert("הדוח נוסף בהצלחה")
  }

  edit(d) {
 
    this.phoneoriginField.nativeElement.value = d.origain_f
    this.nameField.nativeElement.value = d.name_f
    this.sumField.nativeElement.value = d.sum_f
    this.bugetField.nativeElement.value = d.budgets
    this.mimoshField.nativeElement.value = d.mimosh
    this.time = d.time
}

edit_db() {
  //if ( this.time== undefined || this.time == '')
   // return
   // debugger
  // window.alert("in edit_db")
  console.log(this.time)
  this.db.collection('Budget', ref => ref.where('time', '==',this.time)).get().subscribe(result => {
    this.updateData(result.docs[0].id)
  })


}

updateData(docid)
{
this.db.collection('Budget').doc(docid).update({
  origain_f: this. phoneoriginField.nativeElement.value,
  name_f: this.nameField.nativeElement.value,
  sum_f: this.sumField.nativeElement.value,
  buget_stat: this.bugetField.nativeElement.value,
  mimosh: this.mimoshField.nativeElement.value,

  }).then(()=>{
    this.ngOnInit()
    alert('הרשומה התעדכנה')
  });


}

delete(docParam) {

  if (confirm(" האם להסיר רשומה זאת?")) {
    this.dataFromDatabase = this.dataFromDatabase.filter(item => docParam.time !== item.time)

    this.db.collection('Budget', ref => ref.where('time', '==', docParam.time)).get().subscribe(result => {
      this.db.collection('Budget').doc(result.docs[0].id).delete()
    })
  }
  else {
  }
}
}
