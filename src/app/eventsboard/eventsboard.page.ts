import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Window } from 'selenium-webdriver';
import { defineBase } from '@angular/core/src/render3';

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
  @ViewChild('ushers') ushersField
  @ViewChild('before_show') before_showField
  @ViewChild('show_time') show_timeField
  @ViewChild('end_of_show') end_of_showField
  @ViewChild('after_show') after_showField
  @ViewChild('release_building') release_buildingField
  @ViewChild('budgets') budgetsField
  @ViewChild('agent') agentField
  @ViewChild('in_charge_of_show') in_charge_of_showField
  @ViewChild('usher1') usher1Field
  @ViewChild('equipment') equipmentField
  @ViewChild('event_type') event_typeField
  @ViewChild('repeat_show') repeat_showField
  @ViewChild('target_audience') target_audienceField
  @ViewChild('advertising_status') advertising_statusField
  @ViewChild('order_status_purchase') order_status_purchaseField
  @ViewChild('payment_status') payment_statusField
  @ViewChild('upload') uploadField



  dataFromDatabase = []

  constructor(private router: Router, private db: AngularFirestore,) { }

  ngOnInit() {
    // this.db.collection('Events').add({...})

    this.db.collection('Show').get().subscribe(result => {
  
      const docs = result.docs.map(doc => doc.data())
      this.dataFromDatabase = docs


    })
   
  }
  s: string="";

  /*
  ngOnInit() {}

  onSelect(countryId) { 
    this.listField = null;
    for (var i = 0; i < this.countries.length; i++)
    {
      if (this.countries[i].id == countryId) {
        this.selectedCountry = this.countries[i];
      }
    }
}
*/
  saveData() {
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
      ushers: this.ushersField.nativeElement.value,
      before_show: this.before_showField.nativeElement.value,
      show_time: this.show_timeField.nativeElement.value,
      end_of_show: this.end_of_showField.nativeElement.value,
      after_show: this.after_showField.nativeElement.value,
      release_building: this.release_buildingField.nativeElement.value,
      budgets: this.budgetsField.nativeElement.value,
      agent: this.agentField.nativeElement.value,
      in_charge_of_show: this.in_charge_of_showField.nativeElement.value,
      usher1: this.usher1Field.nativeElement.value,
      equipment: this.equipmentField.nativeElement.value,
      event_type: this.event_typeField.nativeElement.value,
      repeat_show: this.repeat_showField.nativeElement.value,
      target_audience: this.target_audienceField.nativeElement.value,
      advertising_status: this.advertising_statusField.nativeElement.value,
      order_status_purchase: this.order_status_purchaseField.nativeElement.value,
      payment_status: this.payment_statusField.nativeElement.value,
      upload: this.uploadField.nativeElement.value
     
     
     
     
    })
  window.alert("האירוע נוסף בהצלחה")
  }


  try(d){
    // finding the selected value from the array
    const selectedObj = this.dataFromDatabase.find(i => i.show === d.currentTarget.value)
      
    // setting the appropriate value to each field(s)
    this.target_audienceField.nativeElement.value = selectedObj.audience.join(', ')
    this.equipmentField.nativeElement.value = selectedObj.equipment
    this.before_showField.nativeElement.value = selectedObj.timeBefore
    this.show_timeField.nativeElement.value = selectedObj.timeShow
    this.after_showField.nativeElement.value = selectedObj.timeAfter

 
 }


}