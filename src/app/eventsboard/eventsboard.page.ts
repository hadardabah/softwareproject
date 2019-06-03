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
  @ViewChild('season') seasonField
  @ViewChild('hebrew_year') hebrew_yearField
  @ViewChild('date') dateField
  @ViewChild('time') timeField
  @ViewChild('Actual_show_time') Actual_show_timeField
  @ViewChild('quantity') quantityField
  @ViewChild('cost') costField
  @ViewChild('ushers') ushersField
  @ViewChild('upload') uploadField
  @ViewChild('event_type') event_typeField
  @ViewChild('repeat_show') repeat_showField
  @ViewChild('target_audience') target_audienceField
  @ViewChild('advertising_status') advertising_statusField
  @ViewChild('order_status_purchase') order_status_purchaseField
  @ViewChild('payment_status') payment_statusField
  @ViewChild('show') nameField
  @ViewChild('doc.id') idField



  dataFromDatabase = []

  constructor(private router: Router, private db: AngularFirestore,) { }

  ngOnInit() {
    // this.db.collection('Events').add({...})

    this.db.collection('Show').get().subscribe(result => {
      debugger
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
      season: this.seasonField.nativeElement.value,
      hebrew_year: this.hebrew_yearField.nativeElement.value,
      event_type: this.event_typeField.nativeElement.value,
      repeat_show: this.repeat_showField.nativeElement.value,
      date: this.dateField.nativeElement.value,
      time: this.timeField.nativeElement.value,
      Actual_show_time: this.Actual_show_timeField.nativeElement.value,
      quantity: this.quantityField.nativeElement.value,
      cost: this.costField.nativeElement.value,
      ushers: this.ushersField.nativeElement.value,
      upload: this.uploadField.nativeElement.value,
      target_audience: this.target_audienceField.nativeElement.value,
      advertising_status: this.advertising_statusField.nativeElement.value,
      order_status_purchase: this.order_status_purchaseField.nativeElement.value,
      payment_status: this.payment_statusField.nativeElement.value
    })
  window.alert("האירוע נוסף בהצלחה")
  }

  try(d){
   

   console.log(this.target_audienceField.nativeElement.value)
    var a=this.db.collection('Events').doc(d).get().subscribe
    (result => {
      const data = result.data().season
      const data1 = result.data().hebrew_year
      console.log(data);
      this.hebrew_yearField.nativeElement.value=data1

    })


 
 }


}