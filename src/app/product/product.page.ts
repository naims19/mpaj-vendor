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
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  Products: product[];
  product: any;
  data: any;
  // id: any;

  constructor(public modalCtrl: ModalController,
              private route: Router,
              private Actroute: ActivatedRoute,
              private authService: AuthService,) { }
  ngOnInit() {
    this.getData()
    // this.authService.getProducts().subscribe((res) => {
    //   this.Products = res.map((p) => {
    //     return{
    //       id: p.payload.doc.id,
    //       ...p.payload.doc.data() as product
    //     };
    //   })
    // });
  }
  // get product
  productList(){
    this.authService.getProducts()
    .subscribe((data) => {
      console.log(data)
    })
  }
  // get data from kategori
  getData(){
    this.Actroute.queryParams.subscribe(params => {
      if (this.route.getCurrentNavigation().extras.state) {

        this.data = this.route.getCurrentNavigation().extras.state.Categorys;
        console.log(this.data.uid)
        console.log(this.data.kategori)
        this.authService.getProductCategory(this.data.uid, this.data.kategori).subscribe(product1 => {
          this.product = product1
          console.log(this.product);
        })
      }
      console.log(this.data)
    });
  }

  // modal
  async showModal() {  
    const modal = await this.modalCtrl.create({  
      component: ProductDetailPage  
    });  
    return await modal.present();  
  }
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
