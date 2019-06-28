import * as core from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@core.Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements core.OnInit {
  @core.ViewChild('email') emailField;
  @core.ViewChild('password') passField;
  constructor( private userAuth: AngularFireAuth,) { 
   // this.try()
  }

  ngOnInit() {
  }

  addUser(){
    const email = this.emailField.value;
    const password = this.passField.value;
    
    this.userAuth.auth.createUserWithEmailAndPassword(email, password).then(_result => {
      window.alert("משתמש חדש נוסף בהצלחה");   
      })
      .catch(() => {
        window.alert("יש להכניס אימייל שלא קיים במערכת וסיסמה עם שישה תווים לפחות");
      });
  }

  deleteUser(){
    const email = this.emailField.value;
    const password = this.passField.value;
    
    const liel = this.userAuth.auth.createUserWithEmailAndPassword(email, password)
    const auth = this.userAuth.auth
    console.log({auth})

  }
}
