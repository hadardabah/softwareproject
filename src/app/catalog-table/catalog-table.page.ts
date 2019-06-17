import { Component, OnInit, ViewChild, NgZone  } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, AlertController } from '@ionic/angular';
import { database } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { CatalogPageModule } from '../catalog/catalog.module';
//import { fill_fields } from '../catalog/catalog.module';
import { CatalogPage } from '../catalog/catalog.page';
import { Pipe, PipeTransform, Injectable } from '@angular/core';
import {CatalogEditPage} from '../catalog-edit/catalog-edit.page'
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-catalog-table',
  templateUrl: './catalog-table.page.html',
  styleUrls: ['./catalog-table.page.scss'],
})
export class CatalogTablePage implements OnInit {
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

  audience: string="";
  docs=[]
  doc:any
  dataFromDatabase = []
  dataFromDatabaseFiltered = []
  newArray =[]
  time: any;

  static s_show_field:any
  static s_artist_field:any
  static s_whoWatch_field:any
  static s_priceFirstShow_field:any
  static s_priceSecondShow_field:any
  static s_priceDriver_field:any
  static s_Provider_field:any
  static s_phoneProvid_field:any
  static s_phone2Provid_field:any
  static s_mailProvid_field:any
  static s_phoneArt_field:any
  static s_mailArt_field:any
  static s_businessNum_field:any
  static s_businessType_field:any
  static s_graphics_field:any
  static s_equipment_field:any
  static s_timeBefore_field:any
  static s_timeAfter_field:any
  static s_timeShow_field:any
  static s_showType_field:any
  static s_showCharacter_field:any
  static s_limitParticipants_field:any
  static s_nuclearPrice_field:any
  static s_extraParticipants_field:any
  static s_extraPrice_field:any
  static s_bid_field:any
  static s_imgGraphics_field:any
  static s_commants_field:any
  static s_time: any;

  constructor(
    private router: Router,
    private db: AngularFirestore, 
    private alertController: AlertController,
    private ngZone:NgZone,
   // private edit:CatalogEditPage,
    private loadingController: LoadingController,) { }

  ngOnInit() {
    // this.db.collection('Events').add({...})

      this.db.collection('Show').get().subscribe(result => {
      this.docs = result.docs.map(doc => doc.data())
      this.dataFromDatabase = this.docs
      this.dataFromDatabaseFiltered = this.dataFromDatabase
      //console.log (this.dataFromDatabase)
      this.newArray = this.dataFromDatabase.slice();
  //  console.log (this.newArray)
    })
    
    
  }

  
  delete(docParam) {
    //console.log(docParam.show)
    if (confirm(" האם להסיר רשומה זאת?")) {
      this.dataFromDatabase = this.dataFromDatabase.filter(item => docParam.show !== item.show)

      this.db.collection('Show', ref => ref.where('show', '==', docParam.show)).get().subscribe(result => {
        this.db.collection('Show').doc(result.docs[0].id).delete()
      })
      this.dataFromDatabaseFiltered = this.dataFromDatabase
    }
    else {
    }
  }
 



  filter_table(param){
    console.log(param);
    if(param.currentTarget.value== 'כל המופעים')
    {
      this.dataFromDatabaseFiltered = this.dataFromDatabase
      return
    }
    if(param.currentTarget.value== 'הרשימה המלאה')
    {
      this.dataFromDatabaseFiltered = this.dataFromDatabase
      return
    }
    this.dataFromDatabaseFiltered = this.dataFromDatabase.filter(item => param.currentTarget.value == item.show)
  }

  filter_audience(param){
    if(param.currentTarget.value== 'כלל האוכלוסיות')
    {
      this.dataFromDatabaseFiltered = this.dataFromDatabase
      return
    }
    this.dataFromDatabaseFiltered = []
    for(let i = 0; i<this.dataFromDatabase.length;i++){
      for(let j = 0; j<this.dataFromDatabase[i].audience.length;j++){
        
        if(this.dataFromDatabase[i].audience[j] == param.currentTarget.value){    
          this.dataFromDatabaseFiltered = [...this.dataFromDatabaseFiltered, this.dataFromDatabase[i]]
        }
      }
    }
  
    //this.dataFromDatabase = this.docs.filter(item => param.currentTarget.value == item.audience)
    console.log("after filter")
   console.log( this.dataFromDatabase)
  }

  applyFilter(filterBy) {
    if(filterBy === '')
    {
      this.dataFromDatabaseFiltered = this.dataFromDatabase
      return
    }
    this.dataFromDatabaseFiltered = []
    this.dataFromDatabase.forEach(item => {
      if(item.artist === filterBy) {
        this.dataFromDatabaseFiltered = [...this.dataFromDatabaseFiltered, item]
      }
     else if(item.Provider === filterBy) {
        this.dataFromDatabaseFiltered = [...this.dataFromDatabaseFiltered, item]
      }
      else if(item.show === filterBy) {
        this.dataFromDatabaseFiltered = [...this.dataFromDatabaseFiltered, item]
      }
    })
  }

 
  filter_artist(param){
    console.log("before filter")
    console.log( this.dataFromDatabase)
  console.log(  param.currentTarget.value)
    if(param.currentTarget.value== 'כל המופעים')
    {
      this.dataFromDatabase = this.docs
      return
    }
    this.dataFromDatabase = this.docs.filter(item => param.currentTarget.value == item.artist)
    console.log("after filter")
   console.log( this.dataFromDatabase)
  }

  async edit(docParam){
    console.log(docParam);
    //this.dataFromDatabase = this.dataFromDatabase.filter(item => docParam.show !== item.show)
    this.db.collection('Show', ref => ref.where('show', '==', docParam.show))
    .get().subscribe(snapshot => {
     var x = snapshot.docs
     CatalogTablePage.s_show_field = docParam.show
     CatalogTablePage.s_artist_field = docParam.artist
     CatalogTablePage.s_whoWatch_field = docParam.whoWatch
     CatalogTablePage.s_priceFirstShow_field = docParam.priceFirstShow
     CatalogTablePage.s_priceSecondShow_field = docParam.priceSecondShow
     CatalogTablePage.s_priceDriver_field = docParam.priceDriver
     CatalogTablePage.s_phoneProvid_field = docParam.phoneProvid
     CatalogTablePage.s_phone2Provid_field = docParam.phone2Provid
     CatalogTablePage.s_Provider_field = docParam.Provider
     CatalogTablePage.s_mailProvid_field = docParam.mailProvid
     CatalogTablePage.s_phoneArt_field = docParam.phoneArt
     CatalogTablePage.s_mailArt_field = docParam.mailArt
     CatalogTablePage.s_businessNum_field = docParam.businessNum
     CatalogTablePage.s_businessType_field = docParam.businessType
     CatalogTablePage.s_graphics_field = docParam.graphics
     CatalogTablePage.s_equipment_field = docParam.equipment
     CatalogTablePage.s_timeAfter_field = docParam.timeAfter
     CatalogTablePage.s_timeBefore_field = docParam.timeBefore
     CatalogTablePage.s_timeShow_field = docParam.timeShow
     CatalogTablePage.s_showType_field = docParam.showType
     CatalogTablePage.s_showCharacter_field = docParam.showCharacter
     CatalogTablePage.s_limitParticipants_field = docParam.limitParticipants
     CatalogTablePage.s_nuclearPrice_field = docParam.nuclearPrice
     CatalogTablePage.s_extraParticipants_field = docParam.extraParticipants
     CatalogTablePage.s_extraPrice_field = docParam.extraPrice
     CatalogTablePage.s_bid_field = docParam.bid
     CatalogTablePage.s_imgGraphics_field = docParam.imgGraphics
     CatalogTablePage.s_commants_field = docParam.commants
this.router.navigateByUrl('/home/catalog-edit')
     /*
     @ViewChild('nuclearPrice') nuclearPrice_filed
  @ViewChild('extraParticipants') extraParticipants_filed
  @ViewChild('extraPrice') extraPrice_filed
  @ViewChild('bid') bid_filed
  @ViewChild('imgGraphics') imgGraphics_filed
  @ViewChild('commants') commants_filed
     
     */
    // snapshot.forEach(async doc => {
//       //this.doc = doc
//       // this.edit.doc =doc
// CatalogTablePage.s_artist_filed='fff'
// CatalogTablePage.s_show_field ='fff'
// CatalogTablePage.s_whoWatch_filed ='fff'
//       const alert = await this.alertController.create({
//         header: 'פרטי המופע:',
//        message:"שם המופע: " + doc.data().show + '<br>'+ 
//         "שם האמן: " + doc.data().artist +'<br>'+ 
//         "מי צפה במופע לדוגמא: " + doc.data().whoWatch + '<br>'+ 
//         "עלות המופע: " + doc.data().priceShow + '<br>'+ 
//         "עלות נסיעות: " + doc.data().priceDriver + '<br>'+ 
//         "שם ספק: " + doc.data().Provider + '<br>'+ 
//         "טלפון ספק: " + doc.data().phoneProvid + '<br>'+ 
//         "טלפון נוסף של ספק: " + doc.data().phone2Provid +'<br>'+ 
//         "דואל ספק: " + doc.data().mailProvid + '<br>'+ 
//         "טלפון ישיר לאומן: " + doc.data().phoneArt + '<br>'+ 
//         "דואל ישיר לאומן: " + doc.data().mailArt + '<br>'+ 
//         "מספר עוסק: " + doc.data().businessNum + '<br>'+ 
//         "סוג עוסק: " + doc.data().businessType + '<br>'+ 
//         "יש גרפיקה למופע?: " + doc.data().graphics + '<br>'+ 
//         "ציוד נדרש: " + doc.data().equipment + '<br>'+ 
//         "זמן לפני המופע: " + doc.data().timeBefore + '<br>'+ 
//         "זמן אחרי המופע: " + doc.data().timeAfter + '<br>'+ 
//         "משך זמן המופע: " + doc.data().timeShow,
        
//         buttons: [
//           {
//            text: 'חזרה לעריכה',
//           handler:  () => {
//             this.router.navigateByUrl('/home/catalog-edit')
          
//             //var func = new CatalogPage(this.router, this.db);
//             //func.fill_fields(doc);
//           }   
//         },
//         {
//           text: 'חזרה לטבלה',
//           }
//       ],
//         cssClass: 'my-alert'
//       });
//       await alert.present();
//     });
  })
  }
  
}


  


