import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('name') nameField
  @ViewChild('age') ageField

  dataFromDatabase = []

  constructor(
    private router: Router, 
    private db: AngularFirestore,
    private userAuth: AngularFireAuth,
    private alertController: AlertController,) { }

  ngOnInit() {
    // this.db.collection('Events').add({...})

    this.db.collection('Events').get().subscribe(result => {
      
      const docs = result.docs.map(doc => doc.data())
      this.dataFromDatabase = docs
    })
  }

  saveData() {
    this.db.collection('Events').add({
      name: this.ageField.nativeElement.value,
      age: this.ageField.nativeElement.value
    })

  }
  
  goToOtherPage() {
    this.router.navigateByUrl('/singin')
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'התנתק',
      message: 'האם אתה בטוח שברצונך להתנתק?',
      buttons: [{
        text: 'אישור',
        handler: () => {
          this.userAuth.auth.signOut().then(() => {
            this.router.navigateByUrl('/login');
          }).catch((error) => console.log(error));
        }
      }, {
        text: 'ביטול'
      }],
      cssClass: 'my-alert'
    });
    alert.present();
  }
}
