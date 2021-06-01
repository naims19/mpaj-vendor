import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular'; 

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }
  dismiss() {  
    this.modalCtrl.dismiss();  
  }  
}
