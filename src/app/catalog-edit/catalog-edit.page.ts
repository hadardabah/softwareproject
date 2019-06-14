
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
 // @ViewChild('audience') audience_filed


  dataFromDatabase = []
  constructor(private router: Router,private db: AngularFirestore, private ngZone:NgZone) { }
  doc: any

  // static s_priceShow_filed
  // static s_priceDriver_filed
  // static s_Provider_filed
  // static s_phoneProvid_filed
  // static s_phone2Provid_filed
  // static s_mailProvid_filed
  // static s_phoneArt_filed
  // static s_mailArt_filed
  // static s_businessNum_filed
  // static s_businessType_filed
  // static s_graphics_filed
  // static s_equipment_filed
  // static s_timeAfter_filed
  // static s_timeBefore_filed
  // static s_timeShow_filed



  ngOnInit() {
    // this.db.collection('Events').add({...})
    
    // if(this.doc !=null)
    // {
    //   alert('in');
    // }


    


    // this.db.collection('Show').get().subscribe(result => {
  
    //   const docs = result.docs.map(doc => doc.data())
    //   this.dataFromDatabase = docs


    // })
   
  }

  ngAfterViewChecked()
  {
    console.log("in catalog")

    if(CatalogTablePage.s_show_field!='' && CatalogTablePage.s_show_field!= this.show_field.nativeElement.value )
    { this.show_field.nativeElement.value =CatalogTablePage.s_show_field
      this.artist_filed.nativeElement.value = CatalogTablePage.s_artist_filed
      this.whoWatch_filed.nativeElement.value = CatalogTablePage.s_whoWatch_filed
      this.priceShow_filed.nativeElement.value =CatalogTablePage.s_priceShow_filed
      this.priceDriver_filed.nativeElement.value = CatalogTablePage.s_priceDriver_filed
      this.Provider_filed.nativeElement.value = CatalogTablePage.s_Provider_filed
      this.phoneProvid_filed.nativeElement.value =CatalogTablePage.s_phoneProvid_field
      this.phone2Provid_filed.nativeElement.value = CatalogTablePage.s_phone2Provid_filed
      this.mailProvid_filed.nativeElement.value = CatalogTablePage.s_mailProvid_filed
      this.phoneArt_filed.nativeElement.value = CatalogTablePage.s_phoneArt_field
      this.mailArt_filed.nativeElement.value = CatalogTablePage.s_mailArt_filed
      this.businessNum_filed.nativeElement.value = CatalogTablePage.s_businessNum_filed
      this.businessType_filed.nativeElement.value = CatalogTablePage.s_businessType_field
      this.graphics_filed.nativeElement.value = CatalogTablePage.s_graphics_filed
      this.equipment_filed.nativeElement.value = CatalogTablePage.s_equipment_filed
      this.timeBefore_filed.nativeElement.value = CatalogTablePage.s_timeBefore_field
      this.timeAfter_filed.nativeElement.value = CatalogTablePage.s_timeAfter_filed
      this.timeShow_filed.nativeElement.value = CatalogTablePage.s_timeShow_filed
    }
  }



  audience: string="";

 
  addShow(form: NgForm){

    this.db.collection('Show').add({
      audience: this.audience,
      //audience: this.audience_filed.nativeElement.value,
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
  this.artist_filed.nativeElement.value =d.data().artist
  this.whoWatch_filed.nativeElement.value ='chen'

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
