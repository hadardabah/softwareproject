
import { Component, OnInit, ViewChild, Input, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import {FormControl, Validators, NgForm} from '@angular/forms';
import { database } from 'firebase'; 
import * as firebase from 'firebase';
import { CatalogTablePage } from '../catalog-table/catalog-table.page';

@Component({
  selector: 'app-catalog-edit',
  templateUrl: './catalog-edit.page.html',
  styleUrls: ['./catalog-edit.page.scss'],
})

export class CatalogEditPage {
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
  @ViewChild('time') time_field

  categories = {
    boys_children: false,
    girls_children: false,
    youth: false,
    boys: false,
    women: false,
    fathers_and_sons: false,
    golden_age: false,
    elementary_girls: false
  }

  dataFromDatabase = []
  constructor(private router: Router,private db: AngularFirestore, private ngZone:NgZone) { }

  ionViewDidEnter() {
    this.db.collection('Show').get().subscribe(result => {
      const docs = result.docs.map(doc => doc.data())
      this.dataFromDatabase = docs
    })
  }
  
  onChange(data) {
    const selectedOptions = Array.from(data.target.selectedOptions).map(i => i['value'])
    if(selectedOptions.includes('ילדים')) this.categories.boys_children = true
    if(selectedOptions.includes('ילדות')) this.categories.girls_children = true
    if(selectedOptions.includes('נערות')) this.categories.youth = true
    if(selectedOptions.includes('בנים')) this.categories.boys = true
    if(selectedOptions.includes('נשים')) this.categories.women = true
    if(selectedOptions.includes('אבות ובנים')) this.categories.fathers_and_sons = true
    if(selectedOptions.includes('גיל הזהב - נשים')) this.categories.golden_age = true
    if(selectedOptions.includes('בנות היסודי')) this.categories.elementary_girls = true
  }

  ngAfterViewChecked()
  {
   if(CatalogTablePage.s_time!='' && CatalogTablePage.s_time!= this.time_field.nativeElement.value )
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
      this.time_field.nativeElement.value = CatalogTablePage.s_time
      CatalogTablePage.s_audience.split('|').forEach(item => {
        if(item === 'ילדים') this.categories.boys_children = true
        if(item === 'ילדות') this.categories.girls_children = true
        if(item === 'נערות') this.categories.youth = true
        if(item === 'בנים') this.categories.boys = true
        if(item === 'נשים') this.categories.women = true
        if(item === 'אבות ובנים') this.categories.fathers_and_sons = true
        if(item === 'גיל הזהב - נשים') this.categories.golden_age = true
        if(item === 'בנות היסודי') this.categories.elementary_girls = true
      })
   }
  }

edit_db(form: NgForm) {
  this.db.collection('Show', ref => ref.where('time', '==', CatalogTablePage.s_time)).get().subscribe(result => {
    this.updateData(result.docs[0].id)
  })
}

updateData(docid){
  this.db.collection('Show').doc(docid).update({
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
      time: this.time_field.nativeElement.value,
      categories: this.getCategoriesAsString()
    }).then(()=>{
      this.ionViewDidEnter()
      alert('הרשומה התעדכנה')
    });
}

getCategoriesAsString() {
  let options = []
    if(this.categories.boys_children) options.push('ילדים')
    if(this.categories.girls_children) options.push('ילדות')
    if(this.categories.youth) options.push('נערות')
    if(this.categories.boys) options.push('בנים')
    if(this.categories.women) options.push('נשים')
    if(this.categories.fathers_and_sons) options.push('אבות ובנים')
    if(this.categories.golden_age) options.push('גיל הזהב - נשים')
    if(this.categories.elementary_girls) options.push('בנות היסודי')
  return options
}
   
}
