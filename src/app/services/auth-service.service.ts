import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http/ngx';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  apiBaseUrl = 'https://bugsnroses.com/api/auth/'




  constructor(
    public http: HTTP, private storage: Storage,
  ) {

  }

  // login
  login(email: string, password: string) {


    return new Promise((resolve, reject) => {
      // let headers = new HttpHeaders();
      // headers.append("Content-Type", "application/json");
      // headers.append("Access-Control-Allow-Origin", "*");
      const body = JSON.stringify({
        email: email,
        password: password,
      })
      this.http.setDataSerializer("utf8");

      let url = "https://bugsnroses.com/api/auth/login";
      const data = this.http
        .post(url, body, { "Content-Type": "application/json" })

      from(data).subscribe(
        (res: any) => {
          console.log(JSON.parse(res.data).token);
          console.log(JSON.parse(res.data).user);
          this.storage.set('token', JSON.parse(res.data).token)
          this.storage.set('user', JSON.parse(res.data).user)

          resolve(JSON.parse(res.data).token);
        },
        (err) => {
          console.log(err);
          console.log(JSON.parse(err.error));
          console.log(JSON.parse(err.error).error);
          reject(JSON.parse(err.error).error);
        }
      );
    });


  }

  // login
  loginWithFacebooke(accessToken) {

    return new Promise((resolve, reject) => {
      // let headers = new HttpHeaders();
      // headers.append("Content-Type", "application/json");
      // headers.append("Access-Control-Allow-Origin", "*");
      const body = {
        provider: 'facebook',
        access_token: accessToken,
      }
      let url = "https://bugsnroses.com/api/auth/social";
      const data = this.http
        .post(url, body, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Accept': 'application/json',
        })

      from(data).subscribe(
        (res: any) => {
          console.log(JSON.parse(res.data).token);
          console.log(JSON.parse(res.data).user);
          this.storage.set('token', JSON.parse(res.data).token)
          this.storage.set('user', JSON.parse(res.data).user)

          resolve(JSON.parse(res.data).token);
        },
        (err) => {
          console.log(err);
          console.log(JSON.parse(err.error));
          console.log(JSON.parse(err.error).error);
          reject(JSON.parse(err.error).error);
        }
      );
    });


  }


  loginWithGoogle(accessToken) {

    return new Promise((resolve, reject) => {
      // let headers = new HttpHeaders();
      // headers.append("Content-Type", "application/json");
      // headers.append("Access-Control-Allow-Origin", "*");
      const body = {
        provider: 'google',
        access_token: accessToken,
      }
      let url = "https://bugsnroses.com/api/auth/social";
      const data = this.http
        .post(url, body, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Accept': 'application/json',
        })

      from(data).subscribe(
        (res: any) => {
          console.log(JSON.parse(res.data).token);
          console.log(JSON.parse(res.data).user);
          this.storage.set('token', JSON.parse(res.data).token)
          this.storage.set('user', JSON.parse(res.data).user)

          resolve(JSON.parse(res.data).token);
        },
        (err) => {
          console.log(err);
          console.log(JSON.parse(err.error));
          console.log(JSON.parse(err.error).error);
          reject(JSON.parse(err.error).error);
        }
      );
    });


  }
  register(email: string, password: string, password_confirm: string) {
    console.log('email' + email);
    console.log('password' + password);
    console.log('password_confirm' + password_confirm);

    this.http.setDataSerializer("utf8");

    return new Promise((resolve, reject) => {
      const headers = ({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })

      const body = JSON.stringify({ email: email, password: password, password_confirmation: password_confirm });
      console.log(body);

      let url = "https://bugsnroses.com/api/auth/register";
      const data = this.http
        .post(url, body, headers)
        .then(
          (res: any) => {
            console.log(res);

            console.log(JSON.parse(res.data).token);
            console.log(JSON.parse(res.data).user);
            this.storage.set('token', JSON.parse(res.data).token)
            this.storage.set('user', JSON.parse(res.data).user)

            resolve(JSON.parse(res.data).token);
          },
          (err) => {
            console.log(err);
            console.log(JSON.parse(err.error));
            if (JSON.parse(err.error).password != null) {
              reject(JSON.parse(err.error).password);

            }
            else {
              reject(JSON.parse(err.error).email);

            }
            console.log(JSON.parse(err.error).password);
          }
        );
    });

  }

  // async change_password(current_password: string, password: string, password_confirmation: string) {
  //   const body = JSON.stringify({ current_password: current_password, password: password, password_confirmation: password_confirmation });

  //   try {
  //     const res = await this.http.post(this.apiBaseUrl + "change_password", body).toPromise();
  //   } catch (error) {

  //     if (error.status === 400) {
  //       throw new Error('errorInUsernameOrPassword');
  //     }
  //   }

  //   return Promise.resolve(true);
  // }

  // pushNotification(uid, title, text) {
  //   return new Promise((resolve, reject) => {
  //     let headers = new Headers();
  //     headers.append("Content-Type", "application/json; charset=utf-8");
  //     let options = new RequestOptions({ headers: headers });
  //     const body = JSON.stringify({
  //       uid,
  //       title,
  //       text,
  //     });
  //     let url = "https:/";
  //     const data = this.http
  //       .post(url, body, options)
  //       .pipe(map((res) => res.json()))
  //       .subscribe(
  //         (res) => {
  //           console.log(res);
  //           resolve(true);
  //         },
  //         (err) => {
  //           console.log(err);
  //           reject(err);
  //         }
  //       );
  //   });
  // }
}
