
import { Component, OnInit, ViewChild, Input, NgZone } from '@angular/core';

import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import {FormControl, Validators, NgForm} from '@angular/forms';
import { database } from 'firebase'; 
import * as firebase from 'firebase';
import { CatalogTablePage } from '../catalog-table/catalog-table.page';
//import { fill_fields } from './catalog.module';

/*import { database } from 'firebase';
import { Time } from '@angular/common';*/


@Component({
  selector: 'app-catalog-edit',
  templateUrl: './catalog-edit.page.html',
  styleUrls: ['./catalog-edit.page.scss'],
})
export class CatalogEditPage implements OnInit {
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


  dataFromDatabase = []
  constructor(private router: Router,private db: AngularFirestore, private ngZone:NgZone) { }
  doc: any
  time: any;

  ngOnInit() {
    this.db.collection('Show').get().subscribe(result => {
      const docs = result.docs.map(doc => doc.data())
      this.dataFromDatabase = docs
    })
  }

  ngAfterViewChecked()
  {
   if(CatalogTablePage.s_show_field!='' && CatalogTablePage.s_show_field!= this.show_field.nativeElement.value )
    {
       this.show_field.nativeElement.value =CatalogTablePage.s_show_field
      this.artist_field.nativeElement.value = CatalogTablePage.s_artist_field
      this.whoWatch_field.nativeElement.value = CatalogTablePage.s_whoWatch_field
      this.priceFirstShow_field.nativeElement.value =CatalogTablePage.s_priceFirstShow_field
      this.priceSecondShow_field.nativeElement.value =CatalogTablePage.s_priceSecondShow_field
      this.priceDriver_field.nativeElement.value = CatalogTablePage.s_priceDriver_field
      this.Provider_field.nativeElement.value = CatalogTablePage.s_Provider_field
      this.phoneProvid_field.nativeElement.value =CatalogTablePage.s_phoneProvid_field
      this.phone2Provid_field.nativeElement.value = CatalogTablePage.s_phone2Provid_field
      this.mailProvid_field.nativeElement.value = CatalogTablePage.s_mailProvid_field
      this.phoneArt_field.nativeElement.value = CatalogTablePage.s_phoneArt_field
      this.mailArt_field.nativeElement.value = CatalogTablePage.s_mailArt_field
      this.businessNum_field.nativeElement.value = CatalogTablePage.s_businessNum_field
      this.businessType_field.nativeElement.value = CatalogTablePage.s_businessType_field
      this.graphics_field.nativeElement.value = CatalogTablePage.s_graphics_field
      this.equipment_field.nativeElement.value = CatalogTablePage.s_equipment_field
      this.timeBefore_field.nativeElement.value = CatalogTablePage.s_timeBefore_field
      this.timeAfter_field.nativeElement.value = CatalogTablePage.s_timeAfter_field
      this.timeShow_field.nativeElement.value = CatalogTablePage.s_timeShow_field
      this.showType_field.nativeElement.value = CatalogTablePage.s_showType_field
      this.showCharacter_field.nativeElement.value = CatalogTablePage.s_showCharacter_field
      this.limitParticipants_field.nativeElement.value = CatalogTablePage.s_limitParticipants_field
      this.nuclearPrice_field.nativeElement.value = CatalogTablePage.s_nuclearPrice_field
      this.extraParticipants_field.nativeElement.value = CatalogTablePage.s_extraParticipants_field
      this.extraPrice_field.nativeElement.value = CatalogTablePage.s_extraPrice_field
      this.bid_field.nativeElement.value = CatalogTablePage.s_bid_field
      this.imgGraphics_field.nativeElement.value = CatalogTablePage.s_imgGraphics_field
      this.commants_field.nativeElement.value = CatalogTablePage.s_commants_field
      this.time = CatalogTablePage.s_time
   }
  }

  audience: string="";

 
  addShow(form: NgForm){

    this.db.collection('Show').add({
      audience: this.audience,
      //audience: this.audience_filed.nativeElement.value,
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
     

    }).then(()=>{
      this.ngOnInit()
    });
    window.alert("פרטי המופע עודכנו")

    
   }
   
 
   getShowName()
   {
     return this.show_field
   }

    fill_fields(d){
      //var element = document.getElementById('id');
  //window.alert("yesss")
//  let updateNested = this.db.collection('Show').doc(d.id).update({
//     show:"test" ,
//     //'favorites.color': 'Red'
//   });
this.ngZone.run(()=>{
  this.show_field.nativeElement.value = d.data().show
  this.artist_field.nativeElement.value =d.data().artist
  this.whoWatch_field.nativeElement.value ='chen'

})
   /* this.priceShow_filed.nativeElement.value = d.data().priceShow
    this.priceDriver_filed.nativeElement.value = d.data().priceDriver
    this.Provider_filed.nativeElement.value = d.data().Provider
    this.phoneProvid_filed.nativeElement.value = d.data().phoneProvid
    this.phone2Provid_filed.nativeElement.value = d.data().phone2Provid
    this.mailProvid_filed.nativeElement.value = d.data().mailProvid
    this.phoneArt_filed.nativeElement.value = d.data().phoneArt
    this.mailArt_filed.nativeElement.value = d.data().mailArt
    this.businessNum_filed.nativeElement.value = d.data().businessNum
    this.businessType_filed.nativeElement.value = d.data().businessType
    this.graphics_filed.nativeElement.value = d.data().graphics
    this.equipment_filed.nativeElement.value = d.data().equipment
    this.timeBefore_filed.nativeElement.value = d.data().timeBefore
    this.timeAfter_filed.nativeElement.value = d.data().timeAfter
    this.timeShow_filed.nativeElement.value = d.data().timeShow*/
  }

}
