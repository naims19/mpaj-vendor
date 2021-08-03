import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  editForm: FormGroup;
  id: any;

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private route: Router,
              public formBuilder: FormBuilder) {
                this.id = this.activatedRoute.snapshot.paramMap.get('id');
                this.authService.getUser(this.id).subscribe((data) => {
                  this.editForm = this.formBuilder.group({
                    name: [data['name']],
                    shopname: [data['shopname']],
                    email: [data['email']],
                    perniagaan: [data['perniagaan']],
                    alamat: [data['alamat']],
                    state: [data['state']],
                    poskod: [data['poskod']],
                    warganegara: [data['warganegara']]
                  })
                });
              }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      name: [],
      shopname: [],
      email: [],
      perniagaan: [],
      alamat: [],
      state: [],
      poskod: [],
      warganegara: []
    })
  }
  onSubmit(){
    this.authService.updateUser(this.id, this.editForm.value)
  }

}
