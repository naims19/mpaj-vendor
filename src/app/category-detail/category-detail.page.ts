import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController} from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Product, AuthService, Category } from '../services/auth.service';
import { Storage } from '@ionic/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface imageData {
  Filename: string;
  filePath: string;
  size: number;
}

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.page.html',
  styleUrls: ['./category-detail.page.scss'],
})
export class CategoryDetailPage implements OnInit {

  category = {
    date: new Date(),
    kategori: '',
    completed: false,
    uid: '',
    gambar: ''
  };

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
              private storageData: Storage,
              private db: AngularFirestore,
              private store: AngularFireStorage,
              private route: Router) {
                this.isLoading = false;
                this.isLoaded = false;
                this.imageCollection = this.db.collection<imageData>('kedai_item');
                this.imagefile = this.imageCollection.valueChanges()
              }

  ngOnInit() {
    this.storageData.get('uidM').then(uid=> {
      console.log(uid)
      this.category.uid=uid;
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

    var fileRef = this.store.ref(path);

    this.imageUpload = this.store.upload(path, fileName);

    this.imageUpload.then ( res=>{
      var imagefile = res.task.snapshot.ref.getDownloadURL();
      imagefile.then( downloadableUrl=>{
        console.log("URL", downloadableUrl);
        this.category.gambar = downloadableUrl;
      })
    }) 
  }
  dismiss() {  
    this.modalCtrl.dismiss();  
  }
  async add(){
    if (this.category.kategori=="" || this.category.gambar=="") {
      this.categoryAlertToast();
    }else{
      this.dismiss();
      this.authService.createCategory(this.category);
      this.productAddToast();
      // this.storageData.set('categoryM', this.category.kategori)
    }
  }
  async productAddToast(){
    const toast = await this.toastController.create({
      message: 'Category has been added',
      duration: 2000
    });
    toast.present();
  }
  async categoryAlertToast(){
    const toast = await this.toastController.create({
      message : 'Please add category',
      duration: 2000
    });
    toast.present();
  }
}
