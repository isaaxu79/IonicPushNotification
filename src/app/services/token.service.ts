import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private dbRef: AngularFirestore
  ) { }

  createToken(tokenPass) {
    this.dbRef.collection('/token').doc(tokenPass).set({
      token: tokenPass
    }).then(() => {
      console.log('saved')
    }).catch(err => console.log(err.message));
  }

  readTokens() {
     return this.dbRef.collection('token').snapshotChanges().pipe(map(tokens => {
      return tokens.map(token => {
        const data = token.payload.doc.data();
        return data;
      });
    }));
  }
}
