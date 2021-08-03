import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular'; 
import {CategoryDetailPage} from '../category-detail/category-detail.page';
import { AuthService } from '../services/auth.service';
import { Router, NavigationExtras  } from '@angular/router';

export class category{
  $key: string;
  kategori: string;
  gambar: string
}

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  Categorys: category[];

  constructor(public modalCtrl: ModalController,
              private authService: AuthService,
              private route : Router) { }

  ngOnInit() {
    this.authService.getCategory().subscribe((res) => {
      this.Categorys = res.map((c) => {
        return{
          id: c.payload.doc.id,
          ...c.payload.doc.data() as category
        };
      })
    });
  
  }
  // get category
  categoryList(){
    this.authService.getCategory()
    .subscribe((data) => {
      console.log(data)
    })
  }

  openDetails(category) {
    let navigationExtras: NavigationExtras = {
      state: {
        Categorys: category
      }
    };
    this.route.navigate(['product'], navigationExtras);
  }

  // modal
  async showModal() {  
    const modal = await this.modalCtrl.create({  
      component: CategoryDetailPage  
    });  
    return await modal.present();  
  }  

}
