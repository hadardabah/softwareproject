import { Component, OnInit, ViewChild, Input, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import {FormControl, Validators, NgForm} from '@angular/forms';
import { database } from 'firebase'; 
import * as firebase from 'firebase';
import { EventsboardTablePage } from '../eventsboard-table/eventsboard-table.page';

@Component({
  selector: 'app-eventsboard-edit',
  templateUrl: './eventsboard-edit.page.html',
  styleUrls: ['./eventsboard-edit.page.scss'],
})
export class EventsboardEditPage implements OnInit {
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
  @ViewChild('number_of_ushers') number_of_ushersField
  @ViewChild('before_show') before_showField
  @ViewChild('show_time') show_timeField
  @ViewChild('end_of_show') end_of_showField
  @ViewChild('after_show') after_showField
  @ViewChild('release_building') release_buildingField
  @ViewChild('budgets') budgetsField
  @ViewChild('agent') agentField
  @ViewChild('in_charge_of_show') in_charge_of_showField
  @ViewChild('ushers') ushersField
  @ViewChild('equipment') equipmentField
  @ViewChild('event_type') event_typeField
  @ViewChild('repeat_show') repeat_showField
  @ViewChild('target_audience') target_audienceField
  @ViewChild('advertising_status') advertising_statusField
  @ViewChild('order_status_purchase') order_status_purchaseField
  @ViewChild('payment_status') payment_statusField
  @ViewChild('upload') uploadField
  @ViewChild('time') time_field

  dataFromDatabase = []
  buildingsFromDatabase = []
  budgetsFromDatabase = []
  humanFromDatabase = []
  eventsFromDatabase = []

  constructor(private router: Router,private db: AngularFirestore, private ngZone:NgZone) { }

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
          this.ushersField.nativeElement.value = EventsboardTablePage.s_ushersField

    this.db.collection('Events').get().subscribe(result => {
      const Events_docs = result.docs.map(doc => doc.data())
      this.eventsFromDatabase = Events_docs
    })

   
  }

   ngAfterViewChecked()
  {
   if(EventsboardTablePage.s_time!='' && EventsboardTablePage.s_time!= this.time_field.nativeElement.value )
    {
      this.showField.nativeElement.value = EventsboardTablePage.s_showField
      this.seasonField.nativeElement.value = EventsboardTablePage.s_seasonField
      this.hebrew_yearField.nativeElement.value = EventsboardTablePage.s_hebrew_yearField
      this.hebrew_dateField.nativeElement.value = EventsboardTablePage.s_hebrew_dateField
      this.dateField.nativeElement.value = EventsboardTablePage.s_dateField
      this.day_of_weekField.nativeElement.value = EventsboardTablePage.s_day_of_weekField
      this.open_doorsField.nativeElement.value = EventsboardTablePage.s_open_doorsField
      this.buildingField.nativeElement.value = EventsboardTablePage.s_buildingField
      this.building_statusField.nativeElement.value = EventsboardTablePage.s_building_statusField
      this.Actual_show_timeField.nativeElement.value = EventsboardTablePage.s_Actual_show_timeField
      this.quantityField.nativeElement.value = EventsboardTablePage.s_quantityField
      this.costField.nativeElement.value = EventsboardTablePage.s_costField
      this.number_of_ushersField.nativeElement.value = EventsboardTablePage.s_number_of_ushersField
      this.before_showField.nativeElement.value = EventsboardTablePage.s_before_showField
      this.show_timeField.nativeElement.value = EventsboardTablePage.s_show_timeField
      this.end_of_showField.nativeElement.value = EventsboardTablePage.s_end_of_showField
      this.after_showField.nativeElement.value = EventsboardTablePage.s_after_showField
      this.release_buildingField.nativeElement.value = EventsboardTablePage.s_release_buildingField
      this.budgetsField.nativeElement.value = EventsboardTablePage.s_budgetsField
      this.agentField.nativeElement.value = EventsboardTablePage.s_agentField
      this.in_charge_of_showField.nativeElement.value = EventsboardTablePage.s_in_charge_of_showField
      this.ushersField.nativeElement.value = EventsboardTablePage.s_ushersField
      this.equipmentField.nativeElement.value = EventsboardTablePage.s_equipmentField
      this.event_typeField.nativeElement.value = EventsboardTablePage.s_event_typeField
      this.repeat_showField.nativeElement.value = EventsboardTablePage.s_repeat_showField
      this.target_audienceField.nativeElement.value = EventsboardTablePage.s_target_audienceField
      this.advertising_statusField.nativeElement.value = EventsboardTablePage.s_advertising_statusField
      this.order_status_purchaseField.nativeElement.value = EventsboardTablePage.s_order_status_purchaseField
      this.advertising_statusField.nativeElement.value = EventsboardTablePage.s_advertising_statusField
      this.uploadField.nativeElement.value = EventsboardTablePage.s_uploadField
      this.time_field.nativeElement.value = EventsboardTablePage.s_time
   }
  }


  edit_db(form: NgForm) {
    this.db.collection('Events', ref => ref.where('time', '==', EventsboardTablePage.s_time)).get().subscribe(result => {
      this.updateData(result.docs[0].id)
    })
  }

updateData(docid){
  this.db.collection('Events').doc(docid).update({
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
      number_of_ushers: this.number_of_ushersField.nativeElement.value,
      before_show: this.before_showField.nativeElement.value,
      show_time: this.show_timeField.nativeElement.value,
      end_of_show: this.end_of_showField.nativeElement.value,
      after_show: this.after_showField.nativeElement.value,
      release_building: this.release_buildingField.nativeElement.value,
      budgets: this.budgetsField.nativeElement.value,
      agent: this.agentField.nativeElement.value,
      in_charge_of_show: this.in_charge_of_showField.nativeElement.value,
      ushers: this.ushersField.nativeElement.value,
      equipment: this.equipmentField.nativeElement.value,
      event_type: this.event_typeField.nativeElement.value,
      repeat_show: this.repeat_showField.nativeElement.value,
      target_audience: this.target_audienceField.nativeElement.value,
      advertising_status: this.advertising_statusField.nativeElement.value,
      order_status_purchase: this.order_status_purchaseField.nativeElement.value,
      payment_status: this.payment_statusField.nativeElement.value,
      upload: this.uploadField.nativeElement.value,
      time: this.time_field.nativeElement.value,
    }).then(()=>{
      this.ngOnInit()
      alert('הרשומה התעדכנה')
    });
}

}
