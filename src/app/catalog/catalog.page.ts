import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { database } from 'firebase';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {
  dataFromDatabase = []
  constructor(private router: Router,private db: AngularFirestore) { }

  ngOnInit() {
  }
  show: string = "";
  artist: string ="";
//  myVal1: string = "";

  
  addShow(){
  //  this.myVal1 = this.show;
    this.db.collection('Show').add({
      show: this.show,
      artist:this.artist

    })
    window.alert("האירוע נוסף")

    
   }

}
