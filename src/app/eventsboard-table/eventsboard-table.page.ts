import { Component, OnInit, ViewChild, NgZone  } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-eventsboard-table',
  templateUrl: './eventsboard-table.page.html',
  styleUrls: ['./eventsboard-table.page.scss'],
})
export class EventsboardTablePage implements OnInit {
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

  docs=[]
  doc:any
  dataFromDatabase = []
  dataFromDatabaseFiltered = []
  newArray =[]
  time: any;
  buildingsFromDatabase = []

  static s_showField:any
  static s_seasonField:any
  static s_hebrew_yearField:any
  static s_hebrew_dateField:any
  static s_dateField:any
  static s_day_of_weekField:any
  static s_open_doorsField:any
  static s_buildingField:any
  static s_building_statusField:any
  static s_Actual_show_timeField:any
  static s_quantityField:any
  static s_costField:any
  static s_number_of_ushersField:any
  static s_before_showField:any
  static s_show_timeField:any
  static s_end_of_showField:any
  static s_after_showField:any
  static s_release_buildingField:any
  static s_budgetsField:any
  static s_agentField:any
  static s_in_charge_of_showField:any
  static s_ushersField:any
  static s_equipmentField:any
  static s_event_typeField:any
  static s_repeat_showField:any
  static s_target_audienceField:any
  static s_advertising_statusField:any
  static s_order_status_purchaseField:any
  static s_payment_statusField:any
  static s_uploadField:any
  static s_time: any
  static s_target_ushers :any;
  
  constructor(
    private router: Router,
    private db: AngularFirestore, 
    private alertController: AlertController,
    private ngZone:NgZone,
   // private edit:CatalogEditPage,
    private loadingController: LoadingController,) { }

  ngOnInit() {
  
    this.db.collection('Events').get().subscribe(result => {
      this.docs = result.docs.map(doc => doc.data())
      this.dataFromDatabase = this.docs
      this.dataFromDatabaseFiltered = this.dataFromDatabase
      //console.log (this.dataFromDatabase)
      this.newArray = this.dataFromDatabase.slice();
  //  console.log (this.newArray)
    })

    this.db.collection('Data').get().subscribe(result => {
      const Data_docs = result.docs.map(doc => doc.data())
      this.buildingsFromDatabase = Data_docs
    })
  }

  delete(docParam) {
    //console.log(docParam.show)
    if (confirm(" האם להסיר רשומה זאת?")) {
      this.dataFromDatabase = this.dataFromDatabase.filter(item => docParam.time !== item.time)

      this.db.collection('Events', ref => ref.where('time', '==', docParam.time)).get().subscribe(result => {
        this.db.collection('Events').doc(result.docs[0].id).delete()
      })
      this.dataFromDatabaseFiltered = this.dataFromDatabase
    }
    else {
    }
  }


  async edit(docParam){
    console.log(docParam);
    //this.dataFromDatabase = this.dataFromDatabase.filter(item => docParam.show !== item.show)
    this.db.collection('Events', ref => ref.where('show', '==', docParam.show))
    .get().subscribe(snapshot => {
     var x = snapshot.docs
     EventsboardTablePage.s_showField = docParam.show
     EventsboardTablePage.s_seasonField = docParam.season
     EventsboardTablePage.s_hebrew_yearField = docParam.hebrew_year
     EventsboardTablePage.s_hebrew_dateField = docParam.hebrew_date
     EventsboardTablePage.s_dateField = docParam.date
     EventsboardTablePage.s_day_of_weekField = docParam.day_of_week
     EventsboardTablePage.s_open_doorsField = docParam.open_doors
     EventsboardTablePage.s_buildingField = docParam.building
     EventsboardTablePage.s_building_statusField = docParam.building_status
     EventsboardTablePage.s_Actual_show_timeField = docParam.Actual_show_time
     EventsboardTablePage.s_quantityField = docParam.quantity
     EventsboardTablePage.s_costField = docParam.cost
     EventsboardTablePage.s_number_of_ushersField = docParam.number_of_ushers
     EventsboardTablePage.s_before_showField = docParam.before_show
     EventsboardTablePage.s_show_timeField = docParam.show_time
     EventsboardTablePage.s_end_of_showField = docParam.end_of_show
     EventsboardTablePage.s_after_showField = docParam.after_show
     EventsboardTablePage.s_release_buildingField = docParam.release_building
     EventsboardTablePage.s_budgetsField = docParam.budgets
     EventsboardTablePage.s_agentField = docParam.agent
     EventsboardTablePage.s_in_charge_of_showField = docParam.in_charge_of_show
    // EventsboardTablePage.s_ushersField = docParam.ushers
     EventsboardTablePage.s_equipmentField = docParam.equipment
     EventsboardTablePage.s_event_typeField = docParam.event_type
     EventsboardTablePage.s_repeat_showField = docParam.repeat_show
     EventsboardTablePage.s_target_audienceField = docParam.target_audience
     EventsboardTablePage.s_advertising_statusField = docParam.advertising_status
     EventsboardTablePage.s_order_status_purchaseField = docParam.order_status_purchase
     EventsboardTablePage.s_payment_statusField = docParam.payment_status
     EventsboardTablePage.s_uploadField = docParam.upload
     EventsboardTablePage.s_time = docParam.time
     EventsboardTablePage.s_target_ushers = docParam.ushers
  this.router.navigateByUrl('/home/eventsboard-edit')
  })
  }

  filter_table_hebrew_year(param){
    if(param.currentTarget.value== 'הרשימה המלאה')
    {
      this.dataFromDatabaseFiltered = this.dataFromDatabase
      return
    }
    this.dataFromDatabaseFiltered = this.dataFromDatabase.filter(item => param.currentTarget.value == item.hebrew_year)
  }

  filter_table_building(param){
    if(param.currentTarget.value== 'הרשימה המלאה')
    {
      this.dataFromDatabaseFiltered = this.dataFromDatabase
      return
    }
    this.dataFromDatabaseFiltered = this.dataFromDatabase.filter(item => param.currentTarget.value == item.building)
  }
  filter_table_event_type(param){
    if(param.currentTarget.value== 'הרשימה המלאה')
    {
      this.dataFromDatabaseFiltered = this.dataFromDatabase
      return
    }
    this.dataFromDatabaseFiltered = this.dataFromDatabase.filter(item => param.currentTarget.value == item.event_type)
  }

  filter_table_audience(param){
    if(param.currentTarget.value== 'כלל הקהלים')
    {
      this.dataFromDatabaseFiltered = this.dataFromDatabase
      return
    }
    this.dataFromDatabaseFiltered = []
    for(let i = 0; i<this.dataFromDatabase.length;i++){
      for(let j = 0; j<this.dataFromDatabase[i].target_audience.length;j++){
        
        if(this.dataFromDatabase[i].target_audience[j] == param.currentTarget.value){    
          this.dataFromDatabaseFiltered = [...this.dataFromDatabaseFiltered, this.dataFromDatabase[i]]
        }
      }
    }
}
}