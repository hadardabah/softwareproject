import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import {FormControl, Validators} from '@angular/forms';

/*import { database } from 'firebase';
import { Time } from '@angular/common';*/


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})

export class CatalogPage implements OnInit {
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
  @ViewChild('timeAfter') timeAfter_filed
  @ViewChild('timeBefore') timeBefore_filed
  @ViewChild('timeShow') timeShow_filed


  dataFromDatabase = []
  constructor(private router: Router,private db: AngularFirestore) { }
 
  ngOnInit() {
  }
 
  audience: string="";

  
  addShow(){

    this.db.collection('Show').add({
      audience: this.audience,
      show: this.show_field.nativeElement.value,
      artist: this.artist_filed.nativeElement.value,
      whoWatch: this.whoWatch_filed.nativeElement.value,
      priceShow: this.priceShow_filed.nativeElement.value,
      priceDriver: this.priceDriver_filed.nativeElement.value,
      Provider: this.Provider_filed.nativeElement.value,
      phoneProvid: this.phoneProvid_filed.nativeElement.value,
      phone2Provid: this.phone2Provid_filed.nativeElement.value,
      mailProvid: this.mailProvid_filed.nativeElement.value,
      phoneArt: this.phoneArt_filed.nativeElement.value,
      mailArt: this.mailArt_filed.nativeElement.value,
      businessNum: this.businessNum_filed.nativeElement.value,
      businessType: this.businessType_filed.nativeElement.value,
      graphics: this.graphics_filed.nativeElement.value,
      equipment: this.equipment_filed.nativeElement.value,
      timeAfter: this.timeAfter_filed.nativeElement.value,
      timeBefore: this.timeBefore_filed.nativeElement.value,
      timeShow: this.timeShow_filed.nativeElement.value,

    })
    window.alert("האירוע נוסף")

    
   }

}
