import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import {map, take} from 'rxjs/operators';

export interface Product {
  id?: String,
  harga: String,
  kategori: String,
  nama: String,
  stok: String,
  gambar: String,
  completed: Boolean,
  date: any,
  uid: any
};

export interface Category {
  id?: String,
  kategori: String,
  completed: Boolean,
  date: any,
  uid: any
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor(private db: AngularFirestore,public auth: AngularFireAuth,
              private route: Router) { }

  // Create product
  createProduct(product){
    return this.db.collection('kedai_item').add(product);
  }
  getProducts(){
    return this.db.collection('kedai_item').snapshotChanges();
  }
  getProduct(id){
    return this.db.collection('kedai_item').doc(id).valueChanges();
  }
  createCategory(category){
    return this.db.collection('kedai_kategori').add(category);
  }
  // View Product
  getCategory(){
    return this.db.collection('kedai_kategori').snapshotChanges();
  }
  getCategorys(id){
    return this.db.collection('kedai_kategori').doc(id).valueChanges();
  }
  getProductCategory(id, kategori){
    return this.db.collection('kedai_item', ref => ref.where('uid', '==', id).where('kategori', '==', kategori)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        });
      })
    );
  }
  // this is for chart
  getAllProduct(){
    return this.db.collection('kedai_item').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        });
      })
    );
  }
  // getCategoryData(id, kategori){
  //   return this.db.collection('kedai_kategori', ref => ref.where('id', '==', id).where('kategori', '==', kategori)).snapshotChanges().pipe(
  //     map(actions => {
  //       return actions.map(a => {
  //         const data = a.payload.doc.data();
  //         const id = a.payload.doc.id;
  //         return { id, data };
  //       })
  //     })
  //   )
  // }
  // Update Product
  update(id, product: Product){
    this.db.collection('kedai_item').doc(id).update(product)
    .then(() => {
      this.route.navigate(['/product']);
    }).catch(error => console.log(error));;
  }
  // Delete Function
  delete(id: string){
    this.db.collection('kedai_item').doc(id).delete();
  }
  // update user detail
  updateUser(id, user){
    this.db.collection('vendor').doc(id).update(user)
    .then(() => {
      this.route.navigate(['/profile']);
    }).catch(error => console.log(error));
  }
  // View user detail
  getUsers(){
    return this.db.collection('vendor').snapshotChanges();
  }
  getUser(id){
    return this.db.collection('vendor').doc(id).valueChanges();
  }
  // Login function
  loginFireAuth(value){
    return new Promise<any> ( (resolve, reject)=>{
      firebase.auth().signInWithEmailAndPassword(value.email, value.password).then(
        res => resolve(res),
        error => reject(error)
      )
    })
  }
  // Signup User Function
  async signupUser(user): Promise<any> {
    console.log(user)
    console.log(user.password)
    let username = user.email;
    const credential = await this.auth.createUserWithEmailAndPassword(
      username,
      user.password
    );
    const uid = credential.user.uid;
    const data = {
      warganegara: user["warganegara"],
      // phone: user["phone"],
      name:user["name"],
      email:user["email"],
      perniagaan: user["perniagaan"],
      alamat:user["alamat"],
      shopname:user["shopname"],
      poskod:user["poskod"],
      state:user["state"],
      uid:uid,
    };
    this.db.collection("vendor").doc(uid).set(data);
    return data;
  }
}
