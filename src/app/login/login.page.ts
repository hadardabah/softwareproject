
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  @ViewChild('email') emailField;
  @ViewChild('password') passField;
  
  constructor(
    // firebase.auth() in Firebase documentation is userAuth
    private userAuth: AngularFireAuth,
    private loadingController: LoadingController,
    private router: Router,
    private alertController: AlertController,
  ) { }

  login(){
    const email = this.emailField.value;
    const password = this.passField.value;

      // ! check if email and password aren't 'undefined'
      this.userAuth.auth.signInWithEmailAndPassword(email, password)
      .then(result => {
        this.router.navigateByUrl('/home');
       })
        .catch((error) => {
          window.alert("פרטי התחברות שגויים");
        });}
        ////////////////////////////// 
          
  async forgotPassword() {
    const alert = await this.alertController.create({
      header: 'איפוס סיסמה',
      message: 'הזן דוא"ל לקבלת הודעה על שינוי סיסמה',
      inputs: [{
        name: 'email',
        placeholder: 'email'
      }],
      buttons: [{
        text: 'שלח',
        handler: data => {
          console.log(data);
          this.userAuth.auth.sendPasswordResetEmail(data.email).then(() => {
          }).catch((error) => {
            console.log(error);
          });
        }
      }]
    });

    await alert.present();
  }

        //////////////////////////////////////////// 

  }

