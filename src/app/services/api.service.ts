import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(
    public http: HTTP,
    public secondHttp: HttpClient,
    private storage: Storage,
  ) { }
  getHomeData() {
    console.log('home token');

    return new Promise((resolve, reject) => {
      this.storage.get("token").then((token) => {
        if (token) {
          console.log('home token');

          console.log(token);
          // let headers = new HttpHeaders();
          // headers.append("Content-Type", "application/json");
          // headers.append("Authorization", `Bearer ${tokens}`);
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',

            'Authorization': `Bearer ${token}`
          })

          const httpOptions = {
            headers: headers,
          };
          console.log('home token');

          const data = this.http
            .get("https://bugsnroses.com/api/app/home", {}, ({
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Authorization': `Bearer ${token}`
            }))
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

  getBlogsData() {
    return new Promise((resolve, reject) => {
      this.storage.get("token").then((token) => {
        if (token) {

          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
          })
          const httpOptions = {
            headers: headers,
          };

          // headers.append("Content-Type", "application/json");

          // headers.append('Authorization', 'Bearer ' + res)

          // headers.append('Authorization', 'Bearer ' + (JSON.parse(localStorage.getItem("userToken").trim())));
          let url = "https://bugsnroses.com/api/blogs/all";
          const data = this.http.get(url, {}, ({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
          })).then(
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
  getBlogContent(link: string) {
    return new Promise((resolve, reject) => {
      this.storage.get("token").then((token) => {
        if (token) {

          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
          })
          const httpOptions = {
            headers: headers,
          };

          // headers.append("Content-Type", "application/json");

          // headers.append('Authorization', 'Bearer ' + res)

          // headers.append('Authorization', 'Bearer ' + (JSON.parse(localStorage.getItem("userToken").trim())));
          const data = this.http.get(link, {}, ({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
          })).then(
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

  getAllProductsWithCategories() {
    return new Promise((resolve, reject) => {
      this.storage.get("token").then((token) => {
        if (token) {

          const headers = ({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
          })

          let url = "https://bugsnroses.com/api/app/products?page=1";


          const data = this.http.get(url, {}, headers).then(
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
  getProductsByCategory(id) {
    console.log("id" + id);

    return new Promise((resolve, reject) => {
      this.storage.get("token").then((token) => {
        if (token) {

          const headers = ({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
          })

          let url = `https://bugsnroses.com/api/products/cat?category_id=${id}`;


          const data = this.http.get(url, {}, headers).then(
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
  getNextProducts(link: string) {
    return new Promise((resolve, reject) => {
      this.storage.get("token").then((token) => {
        if (token) {

          const headers = ({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
          })



          const data = this.http.get(link, {}, headers).then(
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
  getAllCategories() {
    return new Promise((resolve, reject) => {
      this.storage.get("token").then((token) => {
        if (token) {

          const headers = ({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
          })

          let url = "https://bugsnroses.com/api/categories/all";


          const data = this.http.get(url, {}, headers).then(
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


  getProfile() {
    return new Promise((resolve, reject) => {
      this.storage.get("token").then((token) => {
        if (token) {

          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
          })
          const httpOptions = {
            headers: headers,
          };

          // headers.append("Content-Type", "application/json");

          // headers.append('Authorization', 'Bearer ' + res)

          // headers.append('Authorization', 'Bearer ' + (JSON.parse(localStorage.getItem("userToken").trim())));
          let url = "https://bugsnroses.com/api/auth/get_profile";
          const data = this.http.get(url, {}, ({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
          })).then(
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
  updateProfile(name?, birthdate?, email?, phone?, password?, password_confirm?, address1?, address2?) {
    return new Promise((resolve, reject) => {
      this.storage.get("token").then((token) => {

        if (token) {
          let body: any;

          if (password == null) {
            body = ({ name: name, mobile: phone, email: email, address1: address1, address2: address2 });

          }
          else {
            body = ({ name: name, mobile: phone, email: email, password: password, password_confirmation: password_confirm, address1: address1, address2: address2 });

          }
          console.log(body);
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
          })
          const httpOptions = {
            headers: headers,
          };

          // headers.append("Content-Type", "application/json");

          // headers.append('Authorization', 'Bearer ' + res)

          // headers.append('Authorization', 'Bearer ' + (JSON.parse(localStorage.getItem("userToken").trim())));
          this.http.setDataSerializer("utf8");

          let url = "https://bugsnroses.com/api/auth/update";
          const data = this.http.post(url, JSON.stringify(body), ({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
          })).then(
            (res) => {
              console.log(res);
              console.log(JSON.parse(res.data));

              resolve(JSON.parse(res.data));
            },
            (err) => {
              console.log(err);
              reject(JSON.parse(err.error));
            }
          );
        }
      });
    });
  }
  addToCart(items) {
    return new Promise((resolve, reject) => {
      this.storage.get("token").then((token) => {
        if (token) {
          const body = { items: items };
          let headers = new Headers();
          headers.append("Content-Type", "application/json; charset=utf-8");
          headers.append("Access-Control-Allow-Origin", "*");
          headers.append(
            "Authorization",
            `Bearer ${token}`)
          let options = new HttpHeaders({
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${token}`
          });

          // const headers = new HttpHeaders({
          //   'Content-Type': 'application/json',
          //   'Accept': 'application/json',
          //   'Access-Control-Allow-Origin': '*',
          //   'Authorization': `Bearer ${token}`
          // })
          const httpOptions = {
            headers: options,
          };
          this.http.setDataSerializer("utf8");

          let url = "https://bugsnroses.com/api/cart/add_products";
          const data = this.http.post(url, JSON.stringify(body), ({
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
          })).then(
            (res) => {
              console.log(res);
              // console.log(JSON.parse(res.data));

              resolve(true);
            },
            (err) => {
              console.log(err);
              reject();
            }
          );
        }
      });
    });
  }
  checkPromoCode(code) {
    return new Promise((resolve, reject) => {
      this.storage.get("token").then((token) => {
        if (token) {
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
          })
          const httpOptions = {
            headers: headers,
          };

          // headers.append("Content-Type", "application/json");

          // headers.append('Authorization', 'Bearer ' + res)

          // headers.append('Authorization', 'Bearer ' + (JSON.parse(localStorage.getItem("userToken").trim())));
          let url = `https://bugsnroses.com/api/promo/check?code=${code}`;
          const data = this.http.post(url, {}, ({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
          })).then(
            (res) => {
              console.log(res);
              console.log(JSON.parse(res.data));

              resolve(JSON.parse(res.data));
            },
            (err) => {
              console.log(err);
              reject(JSON.parse(err.error));
            }
          );
        }
      });
    });
  }
  getCartData() {
    return new Promise((resolve, reject) => {
      this.storage.get("token").then((token) => {
        if (token) {
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
          })
          const httpOptions = {
            headers: headers,
          };

          // headers.append("Content-Type", "application/json");

          // headers.append('Authorization', 'Bearer ' + res)

          // headers.append('Authorization', 'Bearer ' + (JSON.parse(localStorage.getItem("userToken").trim())));
          let url = "https://bugsnroses.com/api/cart/get_products";
          const data = this.http.get(url, {}, ({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
          })).then(
            (res) => {
              console.log(res);
              console.log(JSON.parse(res.data));

              resolve(JSON.parse(res.data));
            },
            (err) => {
              console.log(err);
              reject(JSON.parse(err.error));
            }
          );
        }
      });
    });
  }

  resetPassword(email) {
    return new Promise((resolve, reject) => {


      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
      const httpOptions = {
        headers: headers,
      };
      let body = { email: email }
      // headers.append("Content-Type", "application/json");

      // headers.append('Authorization', 'Bearer ' + res)

      // headers.append('Authorization', 'Bearer ' + (JSON.parse(localStorage.getItem("userToken").trim())));
      let url = `https://bugsnroses.com/api/auth/reset_password`;
      const data = this.http.post(url, body, ({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })).then(
        (res) => {
          console.log(res);
          console.log(JSON.parse(res.data));

          resolve(JSON.parse(res.data));
        },
        (err) => {
          console.log(err);
          reject(JSON.parse(err.error));
        }
      );

    });

  }
  checkout() {
    return new Promise((resolve, reject) => {
      this.storage.get("token").then((token) => {
        if (token) {
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
          })
          const httpOptions = {
            headers: headers,
          };

          // headers.append("Content-Type", "application/json");

          // headers.append('Authorization', 'Bearer ' + res)

          // headers.append('Authorization', 'Bearer ' + (JSON.parse(localStorage.getItem("userToken").trim())));
          let url = "https://bugsnroses.com/api/order/check_out";
          this.http.setDataSerializer("utf8");

          const data = this.http.post(url, JSON.stringify({}), ({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          })).then(
            (res) => {
              console.log(res);
              console.log(JSON.parse(res.data));

              resolve(JSON.parse(res.data));
            },
            (err) => {
              console.log(err);
              reject(JSON.parse(err.error));
            }
          );
        }
      });
    });
  }
  getOrderHistory() {
    return new Promise((resolve, reject) => {
      this.storage.get("token").then((token) => {
        if (token) {
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
          })
          const httpOptions = {
            headers: headers,
          };

          // headers.append("Content-Type", "application/json");

          // headers.append('Authorization', 'Bearer ' + res)

          // headers.append('Authorization', 'Bearer ' + (JSON.parse(localStorage.getItem("userToken").trim())));
          let url = "https://bugsnroses.com/api/order/history";
          const data = this.http.get(url, {}, ({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          })).then(
            (res) => {
              console.log(res);
              console.log(JSON.parse(res.data));

              resolve(JSON.parse(res.data));
            },
            (err) => {
              console.log(err);
              reject(JSON.parse(err.error));
            }
          );
        }
      });
    });
  }
  like(blog_id) {
    return new Promise((resolve, reject) => {
      this.storage.get("token").then((token) => {
        if (token) {
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
          })
          const httpOptions = {
            headers: headers,
          };

          // headers.append("Content-Type", "application/json");

          // headers.append('Authorization', 'Bearer ' + res)

          // headers.append('Authorization', 'Bearer ' + (JSON.parse(localStorage.getItem("userToken").trim())));
          let url = "https://bugsnroses.com/api/blogs/like";
          const data = this.http.post(url, {
            blog_id: blog_id
          }, ({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          })).then(
            (res) => {
              console.log(res);
              console.log(JSON.parse(res.data));

              resolve(JSON.parse(res.data));
            },
            (err) => {
              console.log(err);
              reject(JSON.parse(err.error));
            }
          );
        }
      });
    });
  }
  getBolg(blog_id) {
    return new Promise((resolve, reject) => {
      this.storage.get("token").then((token) => {
        if (token) {
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
          })
          const httpOptions = {
            headers: headers,
          };

          // headers.append("Content-Type", "application/json");

          // headers.append('Authorization', 'Bearer ' + res)

          // headers.append('Authorization', 'Bearer ' + (JSON.parse(localStorage.getItem("userToken").trim())));
          let url = "https://bugsnroses.com/api/blogs/get?id=" + blog_id;
          console.log(url);

          const data = this.http.get(url, {}, ({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          })).then(
            (res) => {
              console.log(res);
              console.log(JSON.parse(res.data));

              resolve(JSON.parse(res.data));
            },
            (err) => {
              console.log(err);
              reject(JSON.parse(err.error));
            }
          );
        }
      });
    });
  }
  comment(blog_id, comment) {
    return new Promise((resolve, reject) => {
      this.storage.get("token").then((token) => {
        if (token) {
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
          })
          const httpOptions = {
            headers: headers,
          };
          const body = {
            blog_id: blog_id,
            comment: comment
          }

          // headers.append("Content-Type", "application/json");

          // headers.append('Authorization', 'Bearer ' + res)

          // headers.append('Authorization', 'Bearer ' + (JSON.parse(localStorage.getItem("userToken").trim())));
          let url = "https://bugsnroses.com/api/blogs/comment";
          const data = this.http.post(url, body, ({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          })).then(
            (res) => {
              console.log(res);
              console.log(JSON.parse(res.data));

              resolve(JSON.parse(res.data));
            },
            (err) => {
              console.log(err);
              reject(JSON.parse(err.error));
            }
          );
        }
      });
    });
  }
  getNotifications() {
    return new Promise((resolve, reject) => {
      this.storage.get("token").then((token) => {
        if (token) {
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
          })
          const httpOptions = {
            headers: headers,
          };

          // headers.append("Content-Type", "application/json");

          // headers.append('Authorization', 'Bearer ' + res)

          // headers.append('Authorization', 'Bearer ' + (JSON.parse(localStorage.getItem("userToken").trim())));
          let url = "https://bugsnroses.com/api/notifications/all";
          const data = this.http.get(url, {}, ({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          })).then(
            (res) => {
              console.log(res);
              console.log(JSON.parse(res.data));

              resolve(JSON.parse(res.data));
            },
            (err) => {
              console.log(err);
              reject(JSON.parse(err.error));
            }
          );
        }
      });
    });
  }
  makeNotificationsSeen() {
    return new Promise((resolve, reject) => {
      this.storage.get("token").then((token) => {
        if (token) {
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
          })
          const httpOptions = {
            headers: headers,
          };

          // headers.append("Content-Type", "application/json");

          // headers.append('Authorization', 'Bearer ' + res)

          // headers.append('Authorization', 'Bearer ' + (JSON.parse(localStorage.getItem("userToken").trim())));
          let url = "https://bugsnroses.com/api/notifications/seen";
          const data = this.http.post(url, {}, ({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          })).then(
            (res) => {
              console.log(res);
              console.log(JSON.parse(res.data));

              resolve(JSON.parse(res.data));
            },
            (err) => {
              console.log(err);
              reject(JSON.parse(err.error));
            }
          );
        }
      });
    });
  }
  deleteComment(item) {
    return new Promise((resolve, reject) => {
      this.storage.get("token").then((token) => {
        if (token) {
          const body = { comment_id: item };
          let headers = new Headers();
          headers.append("Content-Type", "application/json; charset=utf-8");
          headers.append("Access-Control-Allow-Origin", "*");
          headers.append(
            "Authorization",
            `Bearer ${token}`)
          let options = new HttpHeaders({
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${token}`
          });

          // const headers = new HttpHeaders({
          //   'Content-Type': 'application/json',
          //   'Accept': 'application/json',
          //   'Access-Control-Allow-Origin': '*',
          //   'Authorization': `Bearer ${token}`
          // })
          const httpOptions = {
            headers: options,
          };
          // this.http.setDataSerializer("utf8");

          let url = "https://bugsnroses.com/api/blogs/delete_comment";
          const data = this.http.post(url, (body), ({
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
          })).then(
            (res) => {
              console.log(res);
              // console.log(JSON.parse(res.data));

              resolve(true);
            },
            (err) => {
              console.log(err);
              reject(JSON.parse(err.error));
            }
          );
        }
      });
    });
  }
}
