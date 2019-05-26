import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-eventsboard',
  templateUrl: './eventsboard.page.html',
  styleUrls: ['./eventsboard.page.scss'],
})
export class EventsboardPage implements OnInit {
  @ViewChild('season') seasonField
  @ViewChild('hebrew_year') hebrew_yearField
  @ViewChild('show') showField
  @ViewChild('workshop') workshopField

  dataFromDatabase = []

  constructor(private router: Router, private db: AngularFirestore,) { }


  ngOnInit() {}

  saveData() {
    this.db.collection('Events').add({
      season: this.seasonField.nativeElement.value,
      hebrew_year: this.hebrew_yearField.nativeElement.value,
      show: this.showField.nativeElement.value,
      workshop: this.workshopField.nativeElement.value
    })

  }
}