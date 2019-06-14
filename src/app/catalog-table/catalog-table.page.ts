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
  docs=[]
   doc:any
  dataFromDatabase = []
  newArray =[]

  static s_show_field:any
  static s_artist_filed:any
  static s_whoWatch_filed:any
  static s_priceShow_filed:any
  static s_priceDriver_filed:any
  static s_Provider_filed:any
  static s_phoneProvid_field:any
  static s_phone2Provid_filed:any
  static s_mailProvid_filed:any
  static s_phoneArt_field:any
  static s_mailArt_filed:any
  static s_businessNum_filed:any
  static s_businessType_field:any
  static s_graphics_filed:any
  static s_equipment_filed:any
  static s_timeBefore_field:any
  static s_timeAfter_filed:any
  static s_timeShow_filed:any


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
      //console.log (this.dataFromDatabase)
      this.newArray = this.dataFromDatabase.slice();
  //  console.log (this.newArray)
    })
    
    
  }

  onDoubleClick(docParam) {
    var txt;
   // this.filter_table('try')
  if (confirm(" האם להסיר את המופע מהקטלוג?")) {
    this.dataFromDatabase = this.dataFromDatabase.filter(item => docParam.show !== item.show)
   
    this.db.collection('Show', ref => ref.where('show', '==', docParam.show)).get().subscribe(result => {
      this.db.collection('Show').doc(result.docs[0].id).delete()
    })} 
  else {
  }
  }



  filter_table(param){
    console.log(param);
    //console.log("before filter")
   // console.log( this.dataFromDatabase)
  //console.log(  param.currentTarget.value)
    if(param.currentTarget.value== 'כל המופעים')
    {
      this.dataFromDatabase = this.docs
      return
    }
    this.dataFromDatabase = this.docs.filter(item => param.currentTarget.value == item.show)
   // console.log("after filter")
  // console.log( this.dataFromDatabase)
  }

  filter_audience(param){
    console.log("before filter")
    console.log( this.dataFromDatabase)
    //console.log(  param.currentTarget.value)
    if(param.currentTarget.value== 'כלל האוכלוסיות')
    {
      this.dataFromDatabase = this.docs
      return
    }
    for(let i = 0; i<this.dataFromDatabase.length;i++){
      for(let j = 0; j<this.dataFromDatabase[i].audience.length;j++){
        
        if(this.dataFromDatabase[i].audience[j] == param.currentTarget.value){    
          console.log( this.dataFromDatabase[i].audience )
          //this.dataFromDatabase[i].audience == item.audience
          this.dataFromDatabase = this.docs.filter(item =>  this.dataFromDatabase[i].audience == item.audience )
        }
      }
    }
  
    //this.dataFromDatabase = this.docs.filter(item => param.currentTarget.value == item.audience)
    console.log("after filter")
   console.log( this.dataFromDatabase)
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
/*
  applyFilter(filterValue: string) {
    this.dataFromDatabase.filter = filterValue.trim().toLowerCase();
  }
*/
  async onRightClick(docParam){
    console.log(docParam);
    //this.dataFromDatabase = this.dataFromDatabase.filter(item => docParam.show !== item.show)
    this.db.collection('Show', ref => ref.where('show', '==', docParam.show))
    .get().subscribe(snapshot => {
     var x = snapshot.docs
     CatalogTablePage.s_show_field = docParam.show
     CatalogTablePage.s_artist_filed = docParam.artist
     CatalogTablePage.s_whoWatch_filed = docParam.whoWatch
     CatalogTablePage.s_priceShow_filed = docParam.priceShow
     CatalogTablePage.s_priceDriver_filed = docParam.priceDriver
     CatalogTablePage.s_phoneProvid_field = docParam.phoneProvid
     CatalogTablePage.s_phone2Provid_filed = docParam.phone2Provid
     CatalogTablePage.s_Provider_filed = docParam.Provider
     CatalogTablePage.s_mailProvid_filed = docParam.mailProvid
     CatalogTablePage.s_phoneArt_field = docParam.phoneArt
     CatalogTablePage.s_mailArt_filed = docParam.mailArt
     CatalogTablePage.s_businessNum_filed = docParam.businessNum
     CatalogTablePage.s_businessType_field = docParam.businessType
     CatalogTablePage.s_graphics_filed = docParam.graphics
     CatalogTablePage.s_equipment_filed = docParam.equipment
     CatalogTablePage.s_timeAfter_filed = docParam.timeAfter
     CatalogTablePage.s_timeBefore_field = docParam.timeBefore
     CatalogTablePage.s_timeShow_filed = docParam.timeShow
this.router.navigateByUrl('/home/catalog-edit')
     
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


  


