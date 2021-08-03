import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CategoryDetailPageModule } from './category-detail/category-detail.module';
import { ProductDetailPageModule } from './product-detail/product-detail.module';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireModule} from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { firebaseConfig } from 'src/environments/environment'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
            IonicModule.forRoot(), 
            AppRoutingModule,
            ReactiveFormsModule,
            FormsModule, 
            CategoryDetailPageModule, 
            ProductDetailPageModule,
            AngularFireModule.initializeApp(firebaseConfig),
            AngularFireAuthModule,
            AngularFirestoreModule,
            AngularFireStorageModule,
            IonicStorageModule.forRoot()
          ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
