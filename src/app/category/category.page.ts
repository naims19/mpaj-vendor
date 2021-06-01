import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular'; 
import {CategoryDetailPage} from '../category-detail/category-detail.page';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }
  async showModal() {  
    const modal = await this.modalCtrl.create({  
      component: CategoryDetailPage  
    });  
    return await modal.present();  
  }  

}
