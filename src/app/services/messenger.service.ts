import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  constructor(private http: HttpClient) { }

  sendNotification(tokenDevice) {
    this.http.post(environment.cloudFunctionEndpoint, {
      token: tokenDevice
    }).toPromise()
    .then(() => {
      console.log('Enviado');
    }).catch(err => console.log(err.message));
  }
}
