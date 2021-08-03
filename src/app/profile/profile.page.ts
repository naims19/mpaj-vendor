import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export class user{
  $key: string;
  alamat: string;
  email: string;
  name: string;
  perniagaan: string;
  poskod: string;
  shopname: string;
  state: string;
  warganegara: string;
  id: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  Users: user[];
  data: any;

  constructor(private route: Router,
              private Actroute: ActivatedRoute,
              private authService: AuthService,) {
               }

  ngOnInit() {
    this.authService.getUsers().subscribe((res) => {
      this.Users = res.map((u) => {
        return{
          id: u.payload.doc.id,
          ...u.payload.doc.data() as user
        };
      })
    })
  }
  userList(){
    this.authService.getUsers()
    .subscribe((data) => {
      console.log(data)
    })
  }
  editUser(id){
    this.route.navigate(['/edit-profile', id]);
  }
}
