import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Chart, registerables } from 'chart.js';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { NavController } from '@ionic/angular';

export class category{
  $key: string;
  kategori: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  @ViewChild("barCanvas") public barCanvas: ElementRef;
  @ViewChild("doughnutCanvas") public doughnutCanvas: ElementRef;

  barChart: any;
  doughnutChart: any;

  Categorys:  category[];
  product: any;

  // array for kategori
  kat = [];
  
  // array for count product
  kategori1count: any;
  kategori2count: any;
  kategori3count: any;
  makanan = []
  
  constructor(storageData: Storage, 
              private db : AngularFirestore,
              public navCtrl: NavController,
              private authService: AuthService) {

    storageData.get('uidM').then(uid=> {
      console.log(uid)
    })
    // this is for chart
    Chart.register(...registerables);

  }

  ngOnInit(){
    // this is for viewing label in chart
    this.authService.getCategory().subscribe((res) => {
      this.Categorys = res.map((c) => {
        return{
          id: c.payload.doc.id,
          ...c.payload.doc.data() as category
        };
      })
      console.log(this.Categorys);
      this.Categorys.forEach(cat => {
        this.kat.push(cat.kategori);
      })
    });

    this.authService.getAllProduct().subscribe((product) => {
      this.product = product
      var seafood = this.product.filter((a) => {
        return a.data.kategori == 'seafood'
      })
      var western = this.product.filter((a) => {
        return a.data.kategori == 'western'
      })
      var masakan = this.product.filter((a) => {
        return a.data.kategori == 'masakan panas'
      })
      this.kategori1count = seafood.length;
      this.kategori2count = western.length;
      this.kategori3count = masakan.length;

      this.makanan = [this.kategori1count,
                      this.kategori2count,
                      this.kategori3count]

      console.log(this.makanan)
    })
    // timeout for chart
    setTimeout(() => {
      this.pieChartMethod()
      this.barChartMethod()
    }, 2000);
  }

  // pie chart
  pieChartMethod(){
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.kat,
        datasets: [{
          label: "",
          backgroundColor: ["#09D05C","#7009D0", "#0555B6"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          data: this.makanan,
        }]
      }
    })
  }
  // bar chart
  barChartMethod(){
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.kat,
        datasets: [{
          barPercentage: 0.8,
          barThickness: 'flex',
          label: "",
          backgroundColor: ["#09D05C","#7009D0", "#0555B6"],
          data: this.makanan,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }
}
