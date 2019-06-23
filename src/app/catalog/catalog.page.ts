import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import {FormControl, Validators, NgForm} from '@angular/forms';
import { database } from 'firebase'; 
import * as firebase from 'firebase';
//import { fill_fields } from './catalog.module';

/*import { database } from 'firebase';
import { Time } from '@angular/common';*/


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})

export class CatalogPage implements OnInit {
  @ViewChild('show') show_field
  @ViewChild('artist') artist_field
  @ViewChild('whoWatch') whoWatch_field
  @ViewChild('priceFirstShow') priceFirstShow_field
  @ViewChild('priceSecondShow') priceSecondShow_field
  @ViewChild('priceDriver') priceDriver_field
  @ViewChild('Provider') Provider_field
  @ViewChild('phoneProvid') phoneProvid_field
  @ViewChild('phone2Provid') phone2Provid_field
  @ViewChild('mailProvid') mailProvid_field
  @ViewChild('phoneArt') phoneArt_field
  @ViewChild('mailArt') mailArt_field
  @ViewChild('businessNum') businessNum_field
  @ViewChild('businessType') businessType_field
  @ViewChild('graphics') graphics_field
  @ViewChild('equipment') equipment_field
  @ViewChild('timeAfter') timeAfter_field
  @ViewChild('timeBefore') timeBefore_field
  @ViewChild('timeShow') timeShow_field
  @ViewChild('showType') showType_field
  @ViewChild('showCharacter') showCharacter_field
  @ViewChild('limitParticipants') limitParticipants_field
  @ViewChild('nuclearPrice') nuclearPrice_field
  @ViewChild('extraParticipants') extraParticipants_field
  @ViewChild('extraPrice') extraPrice_field
  @ViewChild('bid') bid_field
  @ViewChild('imgGraphics') imgGraphics_field
  @ViewChild('commants') commants_field
  
  
 // @ViewChild('audience') audience_field


  dataFromDatabase = []
  time: any;

  constructor(private router: Router,private db: AngularFirestore) { }
 
  ngOnInit() {
    this.db.collection('Show').get().subscribe(result => {
      const docs = result.docs.map(doc => doc.data())
      this.dataFromDatabase = docs
    })
  }
  audience: string="";
  
  addShow(form: NgForm){
    this.db.collection('Show').add({
      audience: this.audience,
      //audience: this.audience_field.nativeElement.value,
      show: this.show_field.nativeElement.value,
      artist: this.artist_field.nativeElement.value,
      whoWatch: this.whoWatch_field.nativeElement.value,
      priceFirstShow: this.priceFirstShow_field.nativeElement.value,
      priceSecondShow: this.priceSecondShow_field.nativeElement.value,
      priceDriver: this.priceDriver_field.nativeElement.value,
      Provider: this.Provider_field.nativeElement.value,
      phoneProvid: this.phoneProvid_field.nativeElement.value,
      phone2Provid: this.phone2Provid_field.nativeElement.value,
      mailProvid: this.mailProvid_field.nativeElement.value,
      phoneArt: this.phoneArt_field.nativeElement.value,
      mailArt: this.mailArt_field.nativeElement.value,
      businessNum: this.businessNum_field.nativeElement.value,
      businessType: this.businessType_field.nativeElement.value,
      graphics: this.graphics_field.nativeElement.value,
      equipment: this.equipment_field.nativeElement.value,
      timeAfter: this.timeAfter_field.nativeElement.value,
      timeBefore: this.timeBefore_field.nativeElement.value,
      timeShow: this.timeShow_field.nativeElement.value,
      showType: this.showType_field.nativeElement.value,
      showCharacter: this.showCharacter_field.nativeElement.value,
      limitParticipants: this.limitParticipants_field.nativeElement.value,
      nuclearPrice: this.nuclearPrice_field.nativeElement.value,
      extraParticipants: this.extraParticipants_field.nativeElement.value,
      extraPrice: this.extraPrice_field.nativeElement.value,
      bid: this.bid_field.nativeElement.value,
      imgGraphics: this.imgGraphics_field.nativeElement.value,
      commants: this.commants_field.nativeElement.value,
      time:new Date(),
    })
    window.alert("האירוע נוסף")

    
   }

}
