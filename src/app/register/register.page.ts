import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage{

  get email() {
    return this.registrationForm.get('email');
  }

  get name() {
    return this.registrationForm.get('name');
  }

  get shopname() {
    return this.registrationForm.get('shopname');
  }

  get phone() {
    return this.registrationForm.get('phone');
  }

  get street() {
    return this.registrationForm.get('street');
  }

  get poscode() {
    return this.registrationForm.get('poscode');
  }

  get state() {
    return this.registrationForm.get('state');
  }

  get password(){
    return this.registrationForm.get('password');
  }
  get cpassword(){
    return this.registrationForm.get('cpassword')
  }

  public errorMessages = {
    name: [
      { type: 'required', message: 'Name Is Required' },
      { type: 'maxlength', message: 'Name cant be longer than 100 characters' }
    ],
    shopname: [
      { type: 'required', message: 'Shop Name Is Required' },
      { type: 'maxlength', message: 'Name cant be longer than 100 characters' }
    ],

    email: [
      { type: 'required', message: 'Email Is Required' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    phone: [
      { type: 'required', message: 'Number Phone Is Required' },
      { type: 'pattern', message: 'Please enter a valid phone number' }
    ],
    street: [
      { type: 'required', message: 'Street Name Is Required' },
      { 
        type: 'maxlength', 
        message: 'Street name cant be longer than 100 characters' 
      }
    ],
    poscode: [
      { type: 'required', message: 'Poscode Is Required' },
      { type: 'pattern', message: 'Please enter a valid postcode number' }
    ],
    state: [
      { type: 'required', message: 'state Name Is Required' },
      { 
        type: 'maxlength', 
        message: 'state name cant be longer than 100 characters' 
      }
    ],
  };

  registrationForm = this.formBuilder.group({
    email: [
      '', 
      [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}')
    ]
  ],
    name: ['', [Validators.required, Validators.maxLength(100)]],
    shopname: ['', [Validators.required, Validators.maxLength(100)]],
    phone: [
      '',
       [
        Validators.required,
        Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')
       ]
      ],
      street: ['',[Validators.required, Validators.maxLength(100)]],
      poscode: [
        '',
         [
          Validators.required,
          Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')
         ]
        ],
      state: ['', [Validators.required, Validators.maxLength(100)]],

      passwords: this.formBuilder.group({
        password: ['', Validators.compose([Validators.required])],
        cpassword: ['', Validators.compose([Validators.required])]
      },{
        Validator : this.confirmPasswordMatch('password', 'cpassword')
      })
  });

  confirmPasswordMatch(controlName: string, matchingControlName: string) {    
    return (formGroup: FormGroup) => {
      // console.log(controlName, matchingControlName)
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmPasswordMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

  passwords:any;
  cpasswords:any;
  confirms: boolean=true;

  constructor(private formBuilder: FormBuilder) { }
  ngOnInit() {

  //   document.getElementById('cpassword').onkeyup{
  //     var password = $("#password").val();
  //   var confirm_password = $("#cpassword").val();
  //   if(password != confirm_password) {
  //           this.confirms;
  //   }
  //         else{
             
  //         }
  // }
  }

  check(event){
    console.log(event.target.value)
    if(event.target.value == this.passwords){
      this.confirms = true;
    }else{
      this.confirms =false;
    }
  }

  public submit() {
    console.log(this.registrationForm.value);
  }


}
