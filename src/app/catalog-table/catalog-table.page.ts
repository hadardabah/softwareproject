import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-catalog-table',
  templateUrl: './catalog-table.page.html',
  styleUrls: ['./catalog-table.page.scss'],
})
export class CatalogTablePage implements OnInit {



  dataFromDatabase = []

  constructor(private router: Router, private db: AngularFirestore,) { }

  ngOnInit() {
    // this.db.collection('Events').add({...})

    this.db.collection('Show').get().subscribe(result => {
      debugger
      const docs = result.docs.map(doc => doc.data())
      this.dataFromDatabase = docs


    })
   
  }
  

}
