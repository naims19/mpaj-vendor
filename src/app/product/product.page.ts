import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { ProductDetailPage } from '../product-detail/product-detail.page'

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }
  async showModal() {  
    const modal = await this.modalCtrl.create({  
      component: ProductDetailPage  
    });  
    return await modal.present();  
  }  
}
