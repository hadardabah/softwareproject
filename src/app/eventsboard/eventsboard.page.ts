import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Window } from 'selenium-webdriver';
import { defineBase } from '@angular/core/src/render3';
import {FormControl, Validators, NgForm} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-eventsboard',
  templateUrl: './eventsboard.page.html',
  styleUrls: ['./eventsboard.page.scss'],
})

export class EventsboardPage implements OnInit {
  @ViewChild('show') showField
  @ViewChild('season') seasonField
  @ViewChild('hebrew_year') hebrew_yearField
  @ViewChild('hebrew_date') hebrew_dateField
  @ViewChild('date') dateField
  @ViewChild('day_of_week') day_of_weekField
  @ViewChild('open_doors') open_doorsField
  @ViewChild('building') buildingField
  @ViewChild('building_status') building_statusField
  @ViewChild('Actual_show_time') Actual_show_timeField
  @ViewChild('quantity') quantityField
  @ViewChild('cost') costField
  //@ViewChild('number_of_ushers') number_of_ushersField
  @ViewChild('before_show') before_showField
  @ViewChild('show_time') show_timeField
  @ViewChild('end_of_show') end_of_showField
  @ViewChild('after_show') after_showField
  @ViewChild('release_building') release_buildingField
  @ViewChild('budgets') budgetsField
  @ViewChild('agent') agentField
  @ViewChild('in_charge_of_show') in_charge_of_showField
  @ViewChild('equipment') equipmentField
  @ViewChild('event_type') event_typeField
  //@ViewChild('repeat_show') repeat_showField
  @ViewChild('target_audience') target_audienceField
  @ViewChild('advertising_status') advertising_statusField
  @ViewChild('order_status_purchase') order_status_purchaseField
  @ViewChild('payment_status') payment_statusField
  @ViewChild('upload') uploadField

  dataFromDatabase = []
  buildingsFromDatabase = []
  budgetsFromDatabase = []
  humanFromDatabase = []
  eventsFromDatabase = []
  time: any;

  constructor(private router: Router, private db: AngularFirestore,) { }

  ngOnInit() {
    this.db.collection('Show').get().subscribe(result => {
      const Show_docs = result.docs.map(doc => doc.data())
      this.dataFromDatabase = Show_docs
    })
    this.db.collection('Data').get().subscribe(result => {
      const Data_docs = result.docs.map(doc => doc.data())
      this.buildingsFromDatabase = Data_docs
    })
    this.db.collection('Budget').get().subscribe(result => {
      const Budget_docs = result.docs.map(doc => doc.data())
      this.budgetsFromDatabase = Budget_docs
    })
    this.db.collection('Human').get().subscribe(result => {
      const Human_docs = result.docs.map(doc => doc.data())
      this.humanFromDatabase = Human_docs
    })
    this.db.collection('Events').get().subscribe(result => {
      const Events_docs = result.docs.map(doc => doc.data())
      this.eventsFromDatabase = Events_docs
    })
  }

  ushers: string="";

  addEvent(form: NgForm) {
   if(this.Collision_structure() == false){return}
    this.db.collection('Events').add({
      show: this.showField.nativeElement.value,
      season: this.seasonField.nativeElement.value,
      hebrew_year: this.hebrew_yearField.nativeElement.value,
      date: this.dateField.nativeElement.value,
      hebrew_date: this.hebrew_dateField.nativeElement.value,
      day_of_week: this.day_of_weekField.nativeElement.value,
      open_doors: this.open_doorsField.nativeElement.value,
      Actual_show_time: this.Actual_show_timeField.nativeElement.value,
      building: this.buildingField.nativeElement.value,
      building_status: this.building_statusField.nativeElement.value,
      quantity: this.quantityField.nativeElement.value,
      cost: this.costField.nativeElement.value,
      //number_of_ushers: this.number_of_ushersField.nativeElement.value,
      before_show: this.before_showField.nativeElement.value,
      show_time: this.show_timeField.nativeElement.value,
      end_of_show: this.end_of_showField.nativeElement.value,
      after_show: this.after_showField.nativeElement.value,
      release_building: this.release_buildingField.nativeElement.value,
      budgets: this.budgetsField.nativeElement.value,
      agent: this.agentField.nativeElement.value,
      in_charge_of_show: this.in_charge_of_showField.nativeElement.value,
      ushers: this.ushers,
      equipment: this.equipmentField.nativeElement.value,
      event_type: this.event_typeField.nativeElement.value,
      //repeat_show: this.repeat_showField.nativeElement.value,
      target_audience: this.target_audienceField.nativeElement.value,
      advertising_status: this.advertising_statusField.nativeElement.value,
      order_status_purchase: this.order_status_purchaseField.nativeElement.value,
      payment_status: this.payment_statusField.nativeElement.value,
      upload: this.uploadField.nativeElement.value,
      time:new Date(),
    })
  window.alert("האירוע נוסף בהצלחה")
  }

  autoFill(d){
  // finding the selected value from the array
  const selectedObj = this.dataFromDatabase.find(i => i.show === d.currentTarget.value)
      
  // setting the appropriate value to each field(s)
  this.target_audienceField.nativeElement.value = selectedObj.audience.join(', ')
  this.equipmentField.nativeElement.value = selectedObj.equipment
  this.before_showField.nativeElement.value = selectedObj.timeBefore
  this.show_timeField.nativeElement.value = selectedObj.timeShow
  this.after_showField.nativeElement.value = selectedObj.timeAfter
 }

 //Check that the structure was not already secured on that date
 Collision_structure() :boolean{
  for(let i = 0; i<this.eventsFromDatabase.length;i++){
      if(this.eventsFromDatabase[i].building ==   this.buildingField.nativeElement.value){   
        if(this.eventsFromDatabase[i].date == this.dateField.nativeElement.value ) {
          const startimeMoment = moment(this.eventsFromDatabase[i].open_doors ,'ms') 
          const endtimeMoment = moment(this.eventsFromDatabase[i].release_building, 'ms')
          const curentStart = moment(this.open_doorsField.nativeElement.value, 'ms')
          const curentEnd = moment(this.release_buildingField.nativeElement.value, 'ms')
          if( curentEnd.isSame(endtimeMoment)|| curentStart.isSame(startimeMoment)||curentStart.isBetween(startimeMoment,endtimeMoment)== true || curentEnd.isBetween(startimeMoment,endtimeMoment)== true
          ){
           window.alert("מבנה זה כבר משוריין לתאריך זה")
           return false
          }
        }
      }
  }
  return true;    
 }

}