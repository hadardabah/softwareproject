import { Component, OnInit, ViewChild  } from '@angular/core';
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
 

  constructor(private router: Router, private db: AngularFirestore,) { }

  onDoubleClick(docParam) {
    var txt;
  if (confirm("האם להסיר את הרשומה?")) {
    this.dataFromDatabase = this.dataFromDatabase.filter(item => docParam.origain_f !== item.origain_f)
    this.db.collection('Budgets', ref => ref.where('origain_f', '==', docParam.origain_f)).get().subscribe(result => {
      this.db.collection('Budgets').doc(result.docs[0].id).delete()
    })} 
  else {
  }
    
  }

  ngOnInit() {
    
        this.db.collection('Budget').get().subscribe(result => {
      debugger
      const docs = result.docs.map(doc => doc.data())
      this.dataFromDatabase = docs

   
  })
  }
  s: string="";

    saveData() {
    this.db.collection('Budget').add({
      origain_f: this. phoneoriginField.nativeElement.value,
      name_f: this.nameField.nativeElement.value,
      sum_f: this.sumField.nativeElement.value,
      buget_stat: this.bugetField.nativeElement.value,
      mimosh: this.mimoshField.nativeElement.value
 
    })
      window.alert("הדוח נוסף בהצלחה")
  }

}
//Budget -name of firebase collaction