import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validationUserMessages={
    email:[
      {type: "required", message:"Please Enter your name, email or your numberphone"},
      {type: "pattern", message: "The detail you entered in incorrect. Try again"}
    ],
    password:[
      {type: "required", message:"Please Enter your Password"},
      {type: "minlength", message: "The password must be at least 6 characters or more"}
    ]
  }

  validationFormUser : FormGroup;

  constructor(public formbuilder: FormBuilder, 
              public authservice: AuthService,
              private route: Router,
              private storageData: Storage) { }

  ngOnInit() {
    this.validationFormUser = this.formbuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    })
  }

  LoginUser(value){
    console.log("logged in");
    try {
      this.authservice.loginFireAuth(value).then( resp =>{
        console.log(resp);
        this.storageData.set('uidM', resp.user.uid)
        this.route.navigate(['home'])
      })
    } catch (err) {
      console.log(err);
      
    }
  }
}
