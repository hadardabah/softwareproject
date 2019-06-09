import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { database } from 'firebase';
@Component({
  selector: 'app-catalog-table',
  templateUrl: './catalog-table.page.html',
  styleUrls: ['./catalog-table.page.scss'],
})
export class CatalogTablePage implements OnInit {
  @ViewChild('show') show_field
  @ViewChild('artist') artist_filed
  @ViewChild('whoWatch') whoWatch_filed
  @ViewChild('priceShow') priceShow_filed
  @ViewChild('priceDriver') priceDriver_filed
  @ViewChild('Provider') Provider_filed
  @ViewChild('phoneProvid') phoneProvid_filed
  @ViewChild('phone2Provid') phone2Provid_filed
  @ViewChild('mailProvid') mailProvid_filed
  @ViewChild('phoneArt') phoneArt_filed
  @ViewChild('mailArt') mailArt_filed
  @ViewChild('businessNum') businessNum_filed
  @ViewChild('businessType') businessType_filed
  @ViewChild('graphics') graphics_filed
  @ViewChild('equipment') equipment_filed
  @ViewChild('timeBefore') timeBefore_filed
  @ViewChild('timeAfter') timeAfter_filed
  @ViewChild('timeShow') timeShow_filed

  audience: string="";

  dataFromDatabase = []

  constructor(private router: Router, private db: AngularFirestore,) { }

  onDoubleClick(docParam) {
    var txt;
  if (confirm(" האם להסיר את המופע מהקטלוג?")) {
    this.dataFromDatabase = this.dataFromDatabase.filter(item => docParam.show !== item.show)
    this.db.collection('Show', ref => ref.where('show', '==', docParam.show)).get().subscribe(result => {
      this.db.collection('Show').doc(result.docs[0].id).delete()
    })} 
  else {
  }
    
  }
  onRightClick(docParam){
    this.dataFromDatabase = this.dataFromDatabase.filter(item => docParam.show !== item.show)
    this.db.collection('Show', ref => ref.where('show', '==', docParam.show))
    .get().subscribe(snapshot => {
    snapshot.forEach(doc => {
      window.alert("פרטי המופע:" + "\n" +
                   "שם המופע: " + doc.data().show + "\n"+ 
                   "שם האמן: " + doc.data().artist + "\n"+ 
                   "מי צפה במופע לדוגמא: " + doc.data().whoWatch + "\n"+ 
                   "עלות המופע: " + doc.data().priceShow + "\n"+ 
                   "עלות נסיעות: " + doc.data().priceDriver + "\n"+ 
                   "שם ספק: " + doc.data().Provider + "\n"+ 
                   "טלפון ספק: " + doc.data().phoneProvid + "\n"+ 
                   "טלפון נוסף של ספק: " + doc.data().phone2Provid + "\n"+ 
                   "דואל ספק: " + doc.data().mailProvid + "\n"+ 
                   "טלפון ישיר לאומן: " + doc.data().phoneArt + "\n"+ 
                   "דואל ישיר לאומן: " + doc.data().mailArt + "\n"+ 
                   "מספר עוסק: " + doc.data().businessNum + "\n"+ 
                   "סוג עוסק: " + doc.data().businessType + "\n"+ 
                   "יש גרפיקה למופע?: " + doc.data().graphics + "\n"+ 
                   "ציוד נדרש: " + doc.data().equipment + "\n"+ 
                   "זמן לפני המופע: " + doc.data().timeBefore + "\n"+ 
                   "זמן אחרי המופע: " + doc.data().timeAfter + "\n"+ 
                   "משך זמן המופע: " + doc.data().timeShow
                   );
      //console.log("מופע:" + doc.data().show);
    
    });
  })
  }

  ngOnInit() {
    // this.db.collection('Events').add({...})

      this.db.collection('Show').get().subscribe(result => {
      const docs = result.docs.map(doc => doc.data())
      this.dataFromDatabase = docs
    })
   
  }


  
  

}
