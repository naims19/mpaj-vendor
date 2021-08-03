import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit{

  spinner: boolean = false;
  disabled: boolean = false;

  warga = [
    'Warganegara',
    'Bukan Warganegara'
  ];

  kedai = [
    'Kedai runcit',
    'Restoran'
  ];

  negeri = [
    'Selangor',
    'Kuala Lumpur',
    'Negeri Sembilan',
    'Johor',
    'Kedah',
    'Kelantan',
    'Melaka',
    'Pahang',
    'Perak',
    'Perlis',
    'Terengganu',
    'Pulau Pinang',
    'Sabah',
    'Sarawak',
    'Labuan',
    ];

  validationMessages = {
    email: [
      { type: "required", message: "Please enter your email address" },
      { type: "pattern", message: "Email is incorrect. Try again" }
    ],
    name: [{ type: "required", message: "Name Is Required" }],
    perniagaan: [{ type: "required", message: "Jenis perniagaan is required"}],
    shopname: [{ type: "required", message: "Shop name Is Required" }],
    phone : [{ type: "required", message: "Phone number Is Required" }],
    alamat : [{ type: "required", message: "Street Is Required" }],
    poskod : [{ type: "required", message: "Poscode Is Required" }],
    state : [{ type: "required", message: "State Is Required" }],
    warganegara : [{ type: "required", message: "Warganegara Is Required" }],
    password : [
      { type: "required", message: "Password is required here" },
      { type: "minlength", message: "Password must be atleast 6 characters" }
    ]     
  }

  ValidationFormUser: FormGroup;

  passwords: any;
  confirms: boolean= true;

  constructor(private formBuilder: FormBuilder,
              private authservice: AuthService,
              private router: Router,
              private alertCtrl: AlertController,
              private loading : LoadingController,
              private navCtr: NavController,
              public toastController: ToastController) { }

  ngOnInit() {
    this.ValidationFormUser = this.formBuilder.group({
      email: new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      perniagaan: new FormControl('', Validators.compose([
        Validators.required
      ])),
      shopname: new FormControl('', Validators.compose([
        Validators.required
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required
      ])),
      alamat: new FormControl('', Validators.compose([
        Validators.required
      ])),
      poskod: new FormControl('', Validators.compose([
        Validators.required
      ])),
      state: new FormControl('', Validators.compose([
        Validators.required
      ])),
      warganegara: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    })
  }

  check(event){
    console.log(event.target.value)
    if(event.target.value == this.passwords){
      this.confirms = true;
    }else{
      this.confirms =false;
    }
  }

  public registerUser() {
    console.log(this.ValidationFormUser.value);

    this.spinner = true;
    this.disabled = true;
 
    this.authservice
      .signupUser(this.ValidationFormUser.value)
      .then(async res => {
        console.log(res);
              // this.auth.loggedInUser(res)
              this.router.navigate(['login']);
              console.log(res)
              const toast = await this.toastController.create({
                header: 'Successfull',
                message: 'You have successfully registered. Please login to continue',
                position: 'bottom',
                buttons: [{
                  text: 'Okey',
                  role: 'cancel',
                  handler: () => {
                    console.log('Cancel clicked');
                  }
                }
                ]
              });
              toast.present();
              this.spinner = false;
              this.disabled = false;
         
            })
       .catch(async err => {
        const toast = await this.toastController.create({
          header: 'Authentication Error',
          message: 'This ID has been registered before. Please use another ID.',
          position: 'bottom',
          buttons: [{
            text: 'Okey',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
          ]
        });
        toast.present();
        this.spinner = false;
        this.disabled = false;
        console.log(err.message);
      });

  }

  // registerUser(value){
  //   this.showalert();
  //   try{
  //     this.authservice.signupUser(value).then(response =>{
  //       console.log(response);
  //       if (response.user) {
        
  //         this.loading.dismiss();
  //         this.router.navigate(['login']);
  //       }
  //     }, error=>{
  //       this.loading.dismiss();
  //       this.errorLoading(error.message);
  //     })
  //   }catch(err){
  //     console.log(err);
  //   }
  // }

  // async errorLoading(message: any){
  //   const loading = await this.alertCtrl.create({
  //     header: "Error Registering",
  //     message: message,
  //     buttons: [{
  //       text: 'okay',
  //       handler: ()=>{
  //         this.navCtr.navigateBack(['signup'])
  //       }
  //     }]
  //   })
  // }

  // async showalert(){
  //   var load = await this.alertCtrl.create({
  //     message: "please wait...",
  //   })
  //   load.present();
  // }
}
