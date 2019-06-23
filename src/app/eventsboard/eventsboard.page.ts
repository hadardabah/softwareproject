import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Window } from 'selenium-webdriver';
import { defineBase } from '@angular/core/src/render3';
import {FormControl, Validators, NgForm} from '@angular/forms';

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

  dataFromDatabase = []
  buildingsFromDatabase = []
  budgetsFromDatabase = []
  humanFromDatabase = []
  eventsFromDatabase = []
  time: any;

  constructor(private router: Router, private db: AngularFirestore,) { }

  ngOnInit() {
    // this.db.collection('Events').add({...})

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
  s: string="";


  checkOverlappingEvents(startime, endtime, openDoors, currentDate){
    for(let i = 0; i<this.eventsFromDatabase.length;i++){
      //console.log(this.eventsFromDatabase[i].date)
      //console.log(currentDate) 
      if(this.eventsFromDatabase[i].date == currentDate){ 
        console.log('this is same date');
        var newStartime = startime.substring(0,2);
        var newOpenDoors = openDoors.substring(0,2);
        var newStart = newOpenDoors-newStartime
        var newendtime= endtime.substring(0,2) 
        

        for(let j = 0; j<this.eventsFromDatabase.length;j++){
         var tempStart= (this.eventsFromDatabase[j].before_show).substring(0,2);
         var tempopendor= (this.eventsFromDatabase[j].open_doors).substring(0,2);
         var tempnewstart=tempopendor-tempStart
         var tempReleaseBuilding=this.eventsFromDatabase[j].release_building.substring(0,2);
         console.log(tempnewstart)
         console.log(newStart)
         console.log(newendtime)
         if(tempnewstart<newStart&&newStart< newendtime)
         alert('יש חפיפה באירועים')

       //  if(tempStart< newReleaseBulding< newReleaseBulding)
         //alert('יש חפיפה באירועים')
        }
        //console.log(newStr);
        //console.log(newStr-6)
        //var num = parseInt(newStr);
        //console.log(num)
          if(startime>endtime){
            console.log(endtime-startime)
          }
          return true;
        }
      }
      return false;
    
   // if(date ==)
  //  if(התחלה של כל אירוע<startime>סיום של כל אירוע||)
  }
  

  addEvent(form: NgForm) {
    if(this.checkOverlappingEvents(this.before_showField.nativeElement.value,this.release_buildingField.nativeElement.value,this.open_doorsField.nativeElement.value, this.dateField.nativeElement.value)==true){
      console.log('this is same date2') ;
    }
    
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
      time:new Date(),
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