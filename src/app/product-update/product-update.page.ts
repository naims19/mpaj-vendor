import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.page.html',
  styleUrls: ['./product-update.page.scss'],
})
export class ProductUpdatePage implements OnInit {

  editForm: FormGroup;
  id: any;

  constructor( private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private route: Router,
              public formBuilder: FormBuilder) {
                this.id = this.activatedRoute.snapshot.paramMap.get('id');
                this.authService.getProduct(this.id).subscribe((data) => {
                  this.editForm = this.formBuilder.group({
                    nama: [data['nama']],
                    kategori: [data['kategori']],
                    harga: [data['harga']],
                    stok: [data['stok']]
                  })
                });
               }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      nama: [''],
      kategori: [''],
      harga: [''],
      stok: ['']
    })
  }

  onSubmit(){
    this.authService.update(this.id, this.editForm.value)
  }
  
}
