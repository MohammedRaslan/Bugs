import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ToastServiceService } from 'src/app/services/toast-service.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { ApiService } from 'src/app/services/api.service';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.page.html',
  styleUrls: ['./my-cart.page.scss'],
})
export class MyCartPage implements OnInit {
  storageData: any = []
  profile: any;
  promoCode = "";
  address = ""
  isPromoCodeValid = false;
  totalProductPrice = 0;
  total = 0;
  isFromApi = false;
  governorate = ""
  state = ""
  stateChecker = false;
  addressChecker = false;
  statesList = [];
  addressDetails: any;
  addressTwoChecker = false;
  governorateList = ['cairo', 'giza', 'newCairo']
  cairoStates = ["عين شمس", "عين شمس – احمد عصمت", "عين شمس- النعام", "عين شمس – الزهراء", "عين شمس – ابراهيم عبد الرازق ", "عين شمس – منشية التحرير", "عين شمس – مصطفى حافظ", "المطرية ", "الرحاب1", "الرحاب2", "القاهرة السد العالي", "مدينة السلام", "السواح", "الزتون", "الزتون- ابن الحكم", "الزتون – ابن سندر", "الزتون – سليم الاول", "الزتون طومان باي", "اميرية", "مدينة بدر", "مدينة بدر المنطقة الصناعية", "بساتين", "بساتين السد العالي", "بساتين بيرام ام سلطان", "بساتين فايدة كامل", "بساتين مزرات البيت", "دار السلام", "دار السلام الجزيرة", "دار السلام الملاءة ", "وسط البلد", "وسط البلد عابدين", "وسط البلد باب اللوق", "وسط البلد الازبكية", "وسط البلد الاسعاف", "وسط البلد التحرير", "وسط البلد عباسيه", "وسط البلد العتبة", "وسط البلد الازهار ", "وسط البلد – الظاهر", "وسط البلد – الموسكي", "وسط البلد – السبتية", "وسط البلد – الشربية", "وسط البلد – الحسين", "وسط البلد – باب الشعرية", "وسط البلد – بولاق ابو العلا", "وسط البلد – كورنيش النيل", "وسط البلد – الدراسة", "وسط البلد – الفجاله", "وسط البلد – الجمالية", "وسط البلد – الاوبرا", "وسط البلد – غمرة", "وسط البلد – ماسبيرو ", "وسط البلد – رمسيس", "المرج – بركة الحاج", "المرج – الكنيسة الجماعية", "المرج – الرشاح", "المرج – كفر الشورفة", "المرج – مؤسسة الزكاة", "الشروق – الحي الثالث", "الشروق – الحي السابع", "الشروق – الحي الثامن", "الشروق – الحي التاسع", "الشروق – الحي الخامس", "الشروق – الحي السادس", "الشروق – الحي الاول", "الشروق – الحي الثاني", "الشروق – الحي إسكان الشباب", "الشروق", "الشروق – مدينة المستقبل", "الشروق  -الحي الرابع", "الشروق – الحي طريق القاهرة السويس الصحراوي", "الشروق – مدينة هليوبوليس الجديدة", "التحرير", "الزاوية الحمرا", "السيدة عيشة", "عزبة النخل", "عزبة الهجانة", "جسر السويس", "جسر السويس مبنى التجاريين", "جسر السويس حديقة بدر", "جسر السويس الحرفيين", "جسر السويس مدينة الزهور ", "جسر السويس جمال عبد الناصر", "جسر السويس – مدينة قباء", "جسر السويس – سوق القنال", "جسر السويس تقسيم عمر بن الخطاب", "حدائق القبة الشيخ بابلي", "حدائق القبة الخليج المصري", "حدائق القبة الشيخ غراب", "حدائق القبة كوبري القبة", "حدائق القبة مصر و السودان", "حدائق القبة ثرايا القبة", "حدائق القبة سكة الوايلي", "حدائق القبة والي الاحد", "حدائق حلوان", "حدائق المعادي", "هيليوبوليس ميدان الاسماعيلية ", "هليوبوليس عبدالحميد بدوي", "هليوبوليس ميدان المحكمة", "هليوبوليس الماظة", "هليوبوليس المتلقي العربي", "هليوبوليس ارض الجولف", "هليوبوليس مطار القاهرة", "هليوبوليس مبنى العبور", "هليوبوليس الكربة", "هليوبوليس ميدان الحجاز", "هليوبوليس شارع الثورة", "هليوبوليس مساكن شيراتون", "هليوبوليس مبنى مصر للطيران", "هليوبوليس مصر للتعمير", "هليوبوليس محمد كامل حسي", "هليوبوليس النزهه الجديده", "هليوبوليس – ميدان روكسي", "هليوبوليس ميدان سانت فاطيما", "هليوبوليس صقر قريش", "هليوبوليس محور طه حسين", "هليوبوليس ميدان تريمف", "حلمية الزيتون", "حلوان", "حلوان ميدان 15 مايو", "حلوان- اطلس", "حلوان مدينة الموظفين", "حلوان – مدينة الشمس", "حلوان – حلوان مشروع الامريكي", "حلوان رائل", "حلوان وادي عوف", "كابلات", "قطامية- مدينة الفرسان", "القطامية – مدينة بارون", "قطامية – برج بافريا", "القطامية – عبدالرحمن قطامية", "القطامية – معادي مدينة جراند", "القطامية – مدينة بالم قطامية ", "القطامية – برج سما ", "القطامية – مدينة تبارك", "كوتسيكا", "معادي – تقسيم لاسيلكي", "معادي – احمد زكي", "معادي", "معادي – ميدان الجزائر", "معادي – حدائق المعادي", "معادي – حسنين دسوقي", "معادي – معادي دجلة", "معاري – معادي صقر قريش", "معادي – معراج العلوي", "معادي – معراج السفلي", "معادي – المعادي الجديده", "معادي- ثكنات المعادي", "معادي – زهراء المعادي", "مدينتي", "منيل – الروضة عبده باشا", "المنيل– الروضة المنيل", "منيل – الروضة الروضة", "منشأة ناصر", "مصر القديمة", "مصر القديمه – عمرو بن العاص", "مصر القديمة – الملك الصالح", "مصر القديمة -فسطاط", "مصر القديمة – زهراء مصر القديمة", "مقطم", "مقطم – هضبة حي الاسمرات", "مقطم – اب تاون كايرو ", "مسطرد", "مدينة نصر – الحي العاشر", "مدينة نصر – المنطقة الاولى", "مدينة نصر – المنطقة السادسة", "مدينة نصر -المنطقة الثامنة", "مدينة نصر – الحي السابع", "مدينة نصر – الحي الثامن", "مدينة نصر – الطوب الرملي", "مدينة نصر – مدينة الوفاء والامل ", "مدينة نصر – مدينة الواحه ", "مدينة نصر – زهراء مدينة نصر", "المرج الجديده", "روض الفرج", "السيدة نفيسة", "السيدة نفيسة زينهم", "السيدة زينب", "السيدة زينب – القلعه", "السيدة زينب – القصر العيني", "السيدة زينب – الحلمية الجديدة", "السيدة زينب – الخضري", "السيدة زينب – النصرية", "جاردن سيتي ", "السيدة زينب – قلعة الكبش", "السيدة زينب – مجلس الشعب", "السبدة زينب – مجلس الأمة", "شبرا الخلفاوي", "شبرا مسرة", "شبرا روض الفرج", "تبين", "طره البلد", "الزمالك"]
  newCairoStates = ["أبوالهول", "أرابيلا", "ارض الجيش", "ارض القوات المسلحه", "أرض المشاريع", "أزار", "أكاديمية الشرطه", "اعمار ميفيدا", "الأمل", "الأمن العام", "الأندلس", "البنفسج1", "البنفسج 10", "البنفسج 11", "البنفسج 12", "البنفسج 2", "البنفسج 3", "البنفسج 4", "البنفسج 5", "البنفسج 6", "البنفسج 7", "البنفسج 8", "البنفسج 9", "البنفسج خدمات ", "البنفسج عمارات", "التجمع الاول – الاحياء", "التجمع الاول- الحي الاول ", "التجمع الاول-الحي التاسع", "التجمع الاول – الحي الثالث", "التجمع الاول – الحي الثامن", "التجمع الاول – الحي الثاني", "التجمع الاول – الحي الخامس ", "التجمع الاول – الحي الرابع", "التجمع الاول – الحي السابع", "التجمع الاول – الحي السادس", "التجمع الاول- الحي العاشر", "التجمع الاول- منطقة الخدمات", "التجمع الخامس- الحي الاول", "التجمع الخامس – الحي الثالث", "التجمع الخامس- الحي الثاني", "التجمع الخامس – الحي الخامس", "التجمع الخامس – الحي الرابع", "الجامعة الألمانية", "الجامعه الامريكيه", "الدبلوماسيين", "الروضه", "الشويفات", "الفرنفل خدمات", "القطاع الاول", "القطاع الثاني", "القاع الثالث", "القطاع الرابع", "القطاميه", "اللوتس", "المراسم", "المستثمرين الجنوبيه", "المستثمرين الشماليه", "المنطقة الصناعيه- القاهرة الجديده ", "النرجس 1", "النرجس 2", "النرجس 3", "النرجس 4", "النرجس 5", "النرجس 6", "النرجس 7", "النرجس 8", "النرجس خدمات", "النرجس عمارات", "الياسمين 1", "الياسمين2", "الياسمين 3", "الياسمين 4", "الياسمين 5", "الياسمين 6", "الياسمين 7", "الياسمين 8", "امتداد الرحاب", "بورتو كايرو", "بيت الوطن-القاهره الجديده", "تمر حنة", "جاليريا مون فالي", "جنوب الاكاديميه", "جنوب الجمعيات", "حي المستثمرين", "دار مصر", "سوان ليك", "سوديك", "سوق الرحاب", "شرق الاكاديميه", "غرب ارابيلا", "غرب الجولف", "فاميلي بارك", "فاونتين بارك", "فيلات الشربتلي", "فيلات القرنفل", "فيلدج جاردنز", "قرية النخيل", "قطامية ريزدنس", "كايرو فيستفال سيتي", "كمبوند أسوار", "كمبوند إيجلز", "كمبوند الديار", "ليان ريزدنس", "ليك فيو ", "ليك فيو ريزدنس", "مارينا سيتي", "ماوتن فيو 2", "مدينة الرحاب- المرحله الاولى", "مدينة الرحاب – المرحله الثالثه", "مدينة الرحاب – المرحله الثانية", "مدينة الرحاب- المرحلة الخامسه", "مدينة الرحاب – المرحلة الرابعه", "مدينتي", "مشروع اسكان وزارة المالية", "منطقة المدارس والجامعات", "منطقة خدمات الياسمين", "ميراج سيتي ", "نادي الرحاب الرياضي", "هيليو بارك ", "مدينة بدر ", "مدينة بدر – اسكان ", "مدينة بدر – الخزان ", "مدينة بدر – الجامعة الروسية ", "مدينة بدر المنطقة الصناعية  ", "الشروق الحي الثالث ", "الشروق الحي السابع ", "الشروق الحي الثامن ", "الشروق الحي التاسع ", "الشروق الحي الخامس ", "الشروق الحي السادس ", "الشروق الحي الاول ", "الشروق الحي الثاني ", "الشروق حي اسكان الشباب ", "الشروق ", "الشروق مدينة المستقبل ", "الشروق الحي الرابع ", "الشروق مدينة هليوبولس الجديدة ", "الشروق طريق القاهرة السويس الصحراوي", "مدينة المستقبل", "العاصمة الادارية"]
  gizaStates = ["السادس من اكتوبر", "ابورواش", "ابو النمرس", "العجوزة ميدان أسوان", "العجوزة ميدان ابو الدهب", "العجوزة ميدان ابو المواهب", "العجوزة مسرح البالون", "العجوزة شارع نوال", "العجوزة ميدان سفنكس", "العياط", "البراجيل", "كوم الاحمر", "المناشي", "النبروه", "الصف", "الوحات", "اوسيم", " بدراشين", "بهرمس", "بولاق الدكرور- ناهيه", "دقي- محور 26 يوليو", "دقي – مباني الاوقاف", " دقي- بحوث", "دقي ميدان عمان", "دقي- ميدان بابل", "دقي- بين السريات", "دقي – ميدان الجلاء", "دقي- ميدان المساحه", "دقي – شارع التحرير", "دقي-نادي الصيد", "دقي- محي الدين ابو العز", "دقي – سليمان جوهر", "دقي – ميدان التحرير", "دقي- وزارة الزراعه", "المنوات", "فيصل", "فيصل- الطلابيه", "فيصل- الكوم الاخضر", "فيصل – الشيشيني", "فيصل اسباتس", "فيصل محور اللبيني", "فيصل- ميدان الرمايه", "فيصل المطبعه", "فيصل- التعاون", "فيصل كفر طهرموس", "فيصل – مدكور", "فيصل – مريوطية", "فيصل- نصر الدين", "جيزة – المنيب", "جيزة – بولاق الدكرور", "جيزة- ميدان الجيزة", "الجيزة شارع المحطة", "الجيزة قسم الجيزة", "الجيزة صفط اللبن", "حدايق الأهرام", "الهرم – التعاون", "الهرم نزلة السمان", "الهرم سهل حمزة", "الهرم المنصوريه", "الهرم شارع العريش", "الهرم كفر الجبل", "الهرم نزلة البطران", " الحرانية", "حوامدية", "امبابه", "كرداسة", "كيت كات", "منيل شيحا", "منصورية", "المهندسين احمد عرابي", "المهندسين جامعة الدول", "المهندسين جزيرة العرب", "المهندسين ميدان لبنان", "المهندسين ميت عقبة", "المهندسين ميدان مصطفى محمود", "المهندسين – شارع شهاب", "نهيا البلد", "عمرانية التلاتيني", "عمرانية الكنيسة", "عمرانية العمرانية الغربيه", "عمرانية العمرانية الشرقية", "العمرانية الشركة الشرقية", "عمرانية – خاتم المرسلين", "عمرانية – ترعة الزمر", "عمرانية- ترسا", "ساقية مكي", "سقارة", "سقيل", "شبرامنت", "الوراق"]
  constructor(private navCtrl: NavController, public alertController: AlertController, private router: Router, public api: ApiService, public loading: LoadingServiceService, public toast: ToastServiceService) {
    console.log(this.storageData);
    console.log('my cart');

  }
  item_number = 1;
  ngOnInit() {

  }

  ionViewWillEnter() {

    this.getProfile();
    this.getCartData()
    this.updateTotalPrice();
  }
  updateTotalPrice() {
    this.totalProductPrice = 0
    this.total = 0
    if (this.isFromApi) {
      for (let item of this.storageData) {
        this.totalProductPrice += (item.quantity * item.product.price)
      }
    }
    else {
      let data = JSON.parse(localStorage.getItem('cartData'));

      if (data == [] || data == "" || data == null) {
        this.totalProductPrice = 0
      }
      else {
        for (let item of data) {
          this.totalProductPrice += (item.quantity * item.price)
        }
      }

    }

    this.total = this.totalProductPrice + 0
  }
  back() {
    this.navCtrl.back()
  }
  minus(item) {
    if (item.quantity == 1) {

    }
    else {
      item.quantity--;
      this.storageData = this.storageData.map((item, index) => {
        console.log(item);

        if (item.id === item.id) {
          this.storageData[index].quantity == item.quantity;
        }
        return item
      });
      localStorage.setItem('cartData', JSON.stringify(this.storageData));
      this.updateTotalPrice();
    }
  }
  add(item) {
    item.quantity++;
    this.storageData = this.storageData.map((item, index) => {
      console.log(item);

      if (item.id === item.id) {
        this.storageData[index].quantity == item.quantity;
      }
      return item
    });
    localStorage.setItem('cartData', JSON.stringify(this.storageData));
    this.updateTotalPrice();

  }
  getCartData() {
    this.loading.present()
    this.api.getCartData().then((res: any) => {
      console.log(res);
      if (res == [] || res == null || res.length == 0) {
        this.storageData = JSON.parse(localStorage.getItem('cartData'));
        if (this.storageData != null && this.storageData != [] && this.storageData != "") {


          for (let item of this.storageData) {
            item.product.img1 = "https://bugsnroses.com/" + item.product.img1.replace('public', 'storage')

          }

          console.log(this.storageData);
          this.isFromApi = false;

        }
      }
      else {
        this.storageData = res
        for (let item of this.storageData) {
          item.product.img1 = "https://bugsnroses.com/" + item.product.img1.replace('public', 'storage')
        }
        this.isFromApi = true;
      }
      this.loading.dismiss()



    }, error => {
      this.loading.dismiss()
      console.log(error);

      this.toast.present(error.error)

    })
  }
  getProfile() {

    this.api.getProfile().then((res: any) => {
      console.log(res);
      this.profile = res
      console.log(this.profile);

      if (this.profile.address1 != "null" && this.profile.address1 != null) {
        this.address = this.profile.address1
      }


    }, error => {
      this.toast.present(error.error.message)

    })
  }
  checkPromoCodeValidity() {
    console.log(this.promoCode);

    if (this.promoCode == "") {
      // this.toast.present("Please enter promocode to check it")
      this.loading.presentNonRestrictedLoading();
      this.addToCart();
    }
    else {
      this.loading.presentNonRestrictedLoading();

      this.api.checkPromoCode(this.promoCode).then((res: any) => {
        console.log(res);
        this.addToCart()


      }, error => {
        this.loading.dismissNonRestrictedLoading()
        this.toast.present(error.error)

      })
    }
  }
  goToCheckout() {
    if (this.address == "" || this.address == null) {
      this.toast.present("Please enter your address")
    }
    else {
      this.checkPromoCodeValidity()
    }
    // this.navCtrl.navigateRoot(['/checkout'])
  }
  addToCart() {
    let items = []
    if (this.isFromApi) {
      for (let product of this.storageData) {
        items.push({
          product_id: product.id,
          count: product.quantity
        })
      }
    }
    else {
      for (let product of this.storageData) {
        items.push({
          product_id: product.id,
          count: product.quantity
        })
      }
    }
    if (this.isFromApi) {
      let navigationExtras: NavigationExtras = { state: { address: this.address, subTotal: this.totalProductPrice } };
      this.loading.dismissNonRestrictedLoading()
      this.navCtrl.pop()
      this.navCtrl.navigateRoot(['/checkout'], navigationExtras)
    }
    else {
      console.log(items);
      this.api.addToCart(items).then((res: any) => {
        console.log(res);
        this.loading.dismissNonRestrictedLoading()
        let navigationExtras: NavigationExtras = { state: { address: this.address, products: items, subTotal: this.totalProductPrice } };
        this.navCtrl.pop()
        this.navCtrl.navigateRoot(['/checkout'], navigationExtras)


      }, error => {
        this.loading.dismissNonRestrictedLoading()
        // this.toast.present(error.error)
        this.toast.present("There is an error please try again")

      })
    }

  }
  removeItemFromCart(item, index) {
    let items = []
    if (this.isFromApi) {
      for (let product of this.storageData) {
        items.push({
          product_id: product.id,
          count: product.quantity
        })
      }
    }
    else {
      for (let product of this.storageData) {
        items.push({
          product_id: product.id,
          count: product.quantity
        })
      }
    }


    console.log(items);
    this.api.addToCart(items).then((res: any) => {
      console.log(res);
      this.loading.dismissNonRestrictedLoading()
      this.storageData.splice(index, 1);
      localStorage.setItem("cartData", JSON.stringify(this.storageData));
      // this.total = this.total - (item.finalPrice);
      this.totalProductPrice = this.totalProductPrice - (item.quantity * item.price);
      this.total = this.total - (item.quantity * item.price);

    }, error => {
      this.loading.dismissNonRestrictedLoading()
      // this.toast.present(error.error)
      this.toast.present("There is an error please try again")

    })


  }
  async delete(item, index) {

    const alert = await this.alertController.create({
      header: 'Delete item',
      message: 'Do you want to delete this item from your cart',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log("in yes");
            console.log(this.isFromApi);

            if (this.isFromApi) {
              this.removeItemFromCart(item, index)

            }
            else {
              this.storageData.splice(index, 1);
              localStorage.setItem("cartData", JSON.stringify(this.storageData));
              // this.total = this.total - (item.finalPrice);
              this.totalProductPrice = this.totalProductPrice - (item.quantity * item.price);
              this.total = this.total - (item.quantity * item.price);
            }


          }
        }
      ]
    });

    await alert.present();

  }
  changeGovernorateSelect(value) {
    console.log(this.governorate);
    this.stateChecker = true
    console.log(this.stateChecker);
    console.log(value.target.value);

    this.governorate = value.target.value;
    if (value.target.value == "cairo") {
      this.statesList = this.cairoStates
    }
    else if (value.target.value == "giza") {

      this.statesList = this.gizaStates

    }
    else {
      this.statesList = this.cairoStates

    }
    console.log(this.statesList);

  }
  changeStateSelect(value) {
    this.addressChecker = true
    this.state = value.target.value;
    console.log(value.target.value);


  }
  saveAdress() {
    if (this.addressDetails == "" || this.addressDetails == null) {
      this.toast.present("Please enter your detailed address")

    }
    else {
      this.loading.present()
      this.api.updateProfile(this.profile.name, "",
        this.profile.email, this.profile.mobile, null, null, (this.governorate + " - " + this.state + " - " + this.addressDetails + " "), this.profile.address2).then((res: any) => {
          console.log(res);
          this.profile = res
          this.address = res.address1
          this.loading.dismiss()
          this.toast.present("Address updated successfully")
          this.addressChecker = false
          this.addressTwoChecker = false


        }, error => {
          console.log(error);

          this.loading.dismiss()
          const errors = error.mobile[0] ? error.mobile[0] : "There is an error please try again"
          this.toast.present(errors)

        })
    }

  }
  saveAdress2() {
    if (this.addressDetails == "" || this.addressDetails == null) {
      this.toast.present("Please enter your detailed address")

    }
    else {

      this.loading.present()
      this.api.updateProfile(this.profile.name, "",
        this.profile.email, this.profile.mobile, null, null, this.profile.address1, (this.governorate + " - " + this.state + " - " + this.addressDetails + " ")).then((res: any) => {
          console.log(res);
          this.loading.dismiss()
          this.toast.present("Address updated successfully")
          this.profile = res.user
          this.address = res.user.address2
          this.addressTwoChecker = false
          this.addressChecker = false
        }, error => {
          console.log(error);

          this.loading.dismiss()
          const errors = error.mobile[0] ? error.mobile[0] : "There is an error please try again"
          this.toast.present(errors)

        })
    }
  }
  openAdressForEdit() {
    if (!this.addressTwoChecker && this.address != null && this.address != "") {
      this.addressTwoChecker = true;
    }
  }
}

