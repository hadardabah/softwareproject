import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { database } from 'firebase';
import { Time } from '@angular/common';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {
  @ViewChild('show') show_field
  @ViewChild('artist') artist_filed
  @ViewChild('whoWatch') show_ex_filed
  @ViewChild('priceShow') prriceS_filed
  @ViewChild('priceDriver') prriceD_filed
  @ViewChild('Provider') Provider_filed

  @ViewChild('phoneProvid') phoneProvider_filed
  @ViewChild('phone2Provid') phone2Provider_filed
  @ViewChild('mailProvid') mailProvider_filed
  @ViewChild('phoneArt') phoneArt_filed
  @ViewChild('mailArt') mailArt_filed

  @ViewChild('numB') numB_filed






  dataFromDatabase = []
  constructor(private router: Router,private db: AngularFirestore) { }
 
  ngOnInit() {
  }
 
  population: string="";
  equipment: string="";
  graphics: string="";
  business: string="";
  time: string="";

  
  addShow(){

    this.db.collection('Show').add({
      population:this.population,
      equipment:this.equipment,
      graphics:this.equipment,
      business:this.business,
      time:this.time,
      show: this.show_field.nativeElement.value,
      artist: this.artist_filed.nativeElement.value,
      whoWatch: this.show_ex_filed.nativeElement.value,
      priceShow: this.prriceS_filed.nativeElement.value,
      priceDriver: this.prriceD_filed.nativeElement.value,
      Provider: this.Provider_filed.nativeElement.value,
      phoneProvid: this.phoneProvider_filed.nativeElement.value,
     phone2Provid: this.phone2Provider_filed.nativeElement.value,
      mailProvid: this.mailProvider_filed.nativeElement.value,
      phoneArt: this.phoneArt_filed.nativeElement.value,
      mailArt: this.mailArt_filed.nativeElement.value,
      numB: this.numB_filed.nativeElement.value


    })
    window.alert("האירוע נוסף")

    
   }

}
