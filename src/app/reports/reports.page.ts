import { Component, OnInit , ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  @ViewChild('email') emailField;
  @ViewChild('password') passField;
  constructor( private userAuth: AngularFireAuth,) { 
   // this.try()
  }

  ngOnInit() {
  }
  try(){
    const email = this.emailField.value;
    const password = this.passField.value;
    
    this.userAuth.auth.createUserWithEmailAndPassword(email, password).then(result => {
      window.alert("משתמש חדש נוסף בהצלחה!");   
      })
      .catch((error) => {
        window.alert("שם המשתמש חייב להיות מייל שלא קיים במערכת, וסיסמה עם שישה תווים לפחות");
      });
  
  
  }
}


   //
  
   // .then(result => {
      
    //})
   // .catch(error => {
      
   // })
