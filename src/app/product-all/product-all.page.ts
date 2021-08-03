import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { ProductDetailPage } from '../product-detail/product-detail.page'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export class product{
  $key: string;
  nama: string;
  kategori: string;
  harga: string;
  stok: string;
  gambar: string;
  id: String
}

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.page.html',
  styleUrls: ['./product-all.page.scss'],
})
export class ProductAllPage implements OnInit {

  Products: product[];
  data: any;

  constructor(public modalCtrl: ModalController,
              private route: Router,
              private Actroute: ActivatedRoute,
              private authService: AuthService,) { }

  ngOnInit() {
    this.authService.getProducts().subscribe((res) => {
      this.Products = res.map((p) => {
        return{
          id: p.payload.doc.id,
          ...p.payload.doc.data() as product
        };
      })
    });
  }
  productList(){
    this.authService.getProducts()
    .subscribe((data) => {
      console.log(data)
    })
  }
  // modal
  async showModal() {  
    const modal = await this.modalCtrl.create({  
      component: ProductDetailPage  
    });  
    return await modal.present();  
  }
  // update & delete
  editProduct(id){
    this.route.navigate(['/product-update/', id]);
  }
  remove(id){
    console.log(id)
    if (window.confirm('Are You Sure ?')) {
      this.authService.delete(id)
    }
  }
}
