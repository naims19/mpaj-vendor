import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, ModalController, ToastController} from '@ionic/angular'; 
import { Product, Category, AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

export interface imageData {
  Filename: string;
  filePath: string;
  size: number;
}

export interface category{
  $key: String;
  kategori: String;
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})

export class ProductDetailPage implements OnInit {

  @Input()
  Category: category[];
  cat: any;

  // add item function
  product: Product = {
    date: new Date(),
    harga: '',
    kategori: '',
    nama: '',
    stok: '',
    gambar: '',
    completed: false,
    uid: ''
  };

  // selectedFile: any;

  fileName: string;
  fileSize: string;
  isLoading: boolean;
  isLoaded: boolean;
  imageUpload: AngularFireUploadTask;
  imagefile: Observable<imageData[]>;
  private imageCollection: AngularFirestoreCollection<imageData>;

  constructor(public modalCtrl: ModalController,
              private authService: AuthService,
              private toastController: ToastController,
              private storage: AngularFireStorage,
              private auth: AngularFireAuth,
              private db: AngularFirestore,
              private storageData: Storage,
              private route: Router) { 
                this.isLoading = false;
                this.isLoaded = false;
                this.imageCollection = this.db.collection<imageData>('kedai_item');
                this.imagefile = this.imageCollection.valueChanges()
              }
  
  ngOnInit() {
    this.storageData.get('uidM').then(uid=> {
      console.log(uid)
      this.product.uid=uid;
    })

    this.authService.getCategory().subscribe((res) => {
      this.Category = res.map((c) => {
        return{
          id: c.payload.doc.id,
          ...c.payload.doc.data() as category
        };
      })
    });
  }

  categoryList(){
    this.authService.getCategory()
    .subscribe((data) => {
      console.log(JSON.stringify(data))
    })
  }

  async chooseFile(event){

    const file = event.target.files;
    console.log(file);
    var fileName = file[0];
    console.log(fileName);

    if (fileName.type.split('/')[0] !=="image") {
      console.error("File is not an image");
      return;
    }

    this.isLoading = true;
    this.isLoaded = false;

    const path = 'kedai_item/'+ fileName.lastModified + '-' + fileName.name;

    var fileRef = this.storage.ref(path);

    this.imageUpload = this.storage.upload(path, fileName);

    this.imageUpload.then ( res=>{
      var imagefile = res.task.snapshot.ref.getDownloadURL();
      imagefile.then( downloadableUrl=>{
        console.log("URL", downloadableUrl);
        this.product.gambar = downloadableUrl;
      })
    }) 
  }

  dismiss() {  
    this.modalCtrl.dismiss();  
  }
  async add(){
    if (this.product.harga=="" || this.product.nama=="" || this.product.kategori=="" || this.product.stok=="" || this.product.gambar=="") {
      this.productAlertToast();
    }else{
      this.dismiss();
      this.authService.createProduct(this.product);
      this.productAddToast();
    }
    console.log(this.product.kategori)
  }
  async productAddToast(){
    const toast = await this.toastController.create({
      message: 'Product has been added',
      duration: 2000
    });
    toast.present();
  }
  async productAlertToast(){
    const toast = await this.toastController.create({
      message: 'Please add product',
      duration: 2000
    });
    toast.present();
  }

  onChange(event){
    console.log(event.detail.value);
  }

}
