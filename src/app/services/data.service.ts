import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Storage } from "@ionic/storage";
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HTTP,
    private storage: Storage,) { }
  getHomeData() {
    return new Promise((resolve, reject) => {
      const tokens: string =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjJkNDAzZjUyODdmZjNjNjAyNmE4MzQxMzgzYjA0MDRhMTdjZTRmM2Y1OTczMmUwOWU4ODdkOWQ4NGE5MDhmZjdkZTNlYzEzMTk1ZmNmMGM5In0.eyJhdWQiOiIxIiwianRpIjoiMmQ0MDNmNTI4N2ZmM2M2MDI2YTgzNDEzODNiMDQwNGExN2NlNGYzZjU5NzMyZTA5ZTg4N2Q5ZDg0YTkwOGZmN2RlM2VjMTMxOTVmY2YwYzkiLCJpYXQiOjE2MDAyMTc4OTgsIm5iZiI6MTYwMDIxNzg5OCwiZXhwIjoxNjMxNzUzODk4LCJzdWIiOiIxOSIsInNjb3BlcyI6W119.ZCGuRQztCGoNG65mTaP95eIArewhaZO8qN3AiLAlbkF15e9vdJx9LiXhscRnefp74L-MNbSK6zblvuUbf5If4535WhXuI6PpVf_qzGjCmyDG_gvXJSMvMHjIEOYw5kUL0KOt_zlZqo0R57FZgk2X6d3w5aVzmWK6Kpr1WIHzKptK3i-t24m9frtjbmtX9gEvZJkmUeYYYf6_Ieo-sPqwLUD27fmSrSkE7nZ3pwSOn0qC9biP8DhJaFvNE9lCagxDjT0C2PlgnozmSRyT1KRtwSyxsaz4w891eKnfoAO6hZpRmoD9YUCuRGtJ8Zs2DOIDXGY95_oGDkaktXxmljKgBEo4qmCeIs48XV7z2P84WCIj7Pp6B-PtT-l-B2M_x7h7a2Y7ULNTavK5OJZv6urR5wh574CY1ccwYec4o01MXqeuWhpOivbwc9mlX3LH0GowXoEdXoEBssEMhrobwbHt1jODM4OyI6Uev2v20JW4S678rCEhvMmAMG0AYZbeTHFWU6QcCzolupWY-PYYsBU8RF1cFP_raEWU3HPCw70JQu5WSgN13eqhjsAVhb4iemUx0_kD7jTMKMW7_PuR1ICq47TtlWq9Jr-FQdV5zwzVhRgkYTlyE0hkT-5OQMdW8ycTeOv_gDIFXDE4_taa82exxHj9Z4ZCTz8h6f7imYRh3ME";
      this.storage.get("token").then((token) => {
        if (token) {
          console.log(token);
          // let headers = new HttpHeaders();
          // headers.append("Content-Type", "application/json");
          // headers.append("Authorization", "Bearer " + tokens);
          const headers = ({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          })



          const data = this.http
            .get("https://bugsnroses.com/api/app/home",{}, headers)
            .then(
              (res) => {
                console.log(res);
                console.log(JSON.parse(res.data));
  
                resolve(JSON.parse(res.data));
              },
              (err) => {
                console.log(err);
                reject(JSON.parse(err.error).error);
              }
            );
        }
      });
    });
  }
}
