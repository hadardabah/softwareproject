import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Window } from 'selenium-webdriver';
import { defineBase } from '@angular/core/src/render3';
import {FormControl, Validators, NgForm} from '@angular/forms';


@Component({

  selector: 'app-budgets',
  templateUrl: './budgets.page.html',
  styleUrls: ['./budgets.page.scss'],
})
export class BudgetsPage implements OnInit {
  
  @ViewChild('finance_source') finance_sourceField
  @ViewChild('budget_name') budget_nameField
  @ViewChild('amount') amountField
  @ViewChild('budget_status') budget_statusField
  @ViewChild('execute_status') execute_statusField

  dataFromDatabase = []
  dataFromDatabaseFiltered = []
  time: any;
  
  constructor(private router: Router, private db: AngularFirestore,private ngZone:NgZone ) { }

  ngOnInit() { 
      this.db.collection('Budget').get().subscribe(result => {
      const docs = result.docs.map(doc => doc.data())
      this.dataFromDatabase = docs
      this.dataFromDatabaseFiltered = this.dataFromDatabase
  })
  }
 
    saveData(form: NgForm) {
    this.db.collection('Budget').add({
      finance_source: this. finance_sourceField.nativeElement.value,
      budget_name: this.budget_nameField.nativeElement.value,
      amount: this.amountField.nativeElement.value,
      budget_status: this.budget_statusField.nativeElement.value,
      execute_status: this.execute_statusField.nativeElement.value,
      time:new Date(),

    }).then(()=>{
      this.ngOnInit()
    });
    window.alert("הדוח נוסף בהצלחה")
  }

  edit(d) {
 
    this.finance_sourceField.nativeElement.value = d.finance_source
    this.budget_nameField.nativeElement.value = d.budget_name
    this.amountField.nativeElement.value = d.amount
    this.budget_statusField.nativeElement.value = d.budget_status
    this.execute_statusField.nativeElement.value = d.execute_status
    this.time = d.time
}

edit_db() {
  this.db.collection('Budget', ref => ref.where('time', '==',this.time)).get().subscribe(result => {
    this.updateData(result.docs[0].id)
  })
}

updateData(docid){
this.db.collection('Budget').doc(docid).update({
  finance_source: this. finance_sourceField.nativeElement.value,
  budget_name: this.budget_nameField.nativeElement.value,
  amount: this.amountField.nativeElement.value,
  budget_status: this.budget_statusField.nativeElement.value,
  execute_status: this.execute_statusField.nativeElement.value,
  }).then(()=>{
    this.ngOnInit()
    alert('הרשומה התעדכנה')
  });
}

filter_table(param){
  if(param.currentTarget.value== 'כל הסטטוסים')
  {
    this.dataFromDatabaseFiltered = this.dataFromDatabase
    return
  }
  this.dataFromDatabaseFiltered = this.dataFromDatabase.filter(item => param.currentTarget.value == item.budget_status)
}

applyFilter(filterBy) {
  if(filterBy === '')
  {
    this.dataFromDatabaseFiltered = this.dataFromDatabase
    return
  }
  this.dataFromDatabaseFiltered = []
  this.dataFromDatabase.forEach(item => {
    if(item.finance_source === filterBy) {
      this.dataFromDatabaseFiltered = [...this.dataFromDatabaseFiltered, item]
    }
  })
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
