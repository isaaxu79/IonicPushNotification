import { Component } from '@angular/core';
import { Plugins, PushNotificationToken, PushNotification } from '@capacitor/core';
import { TokenService } from '../services/token.service';
import { MessengerService } from '../services/messenger.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tokenP = '';
  tokens: any = [];

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {
    this.viewToken();
    Plugins.PushNotifications.addListener('registration', (token: PushNotificationToken)=>{
      console.log('token: ' + JSON.stringify(token));
      console.log('------token' + token.value);
      this.tokenP = token.value;
      this.saveToken();
    });
    Plugins.PushNotifications.addListener('pushNotificationReceived', async (notification: PushNotification) => {
      const toast = await this.toastController.create({
        message: notification.title,
        duration: 3000
      });
      toast.present();
    });
  }

  constructor(
    private tokenService: TokenService,
    private messengerService: MessengerService,
    private toastController: ToastController
  ) {}

  requestPermissions() {
    Plugins.PushNotifications.register().then(() => {});
  }

  saveToken() {
    this.tokenService.createToken(this.tokenP);
  }

  viewToken() {
    this.tokenService.readTokens().subscribe(tokens => {
      this.tokens = tokens;
    });
  }

  sendNotification(token) {
    this.messengerService.sendNotification(token);
  }
}
