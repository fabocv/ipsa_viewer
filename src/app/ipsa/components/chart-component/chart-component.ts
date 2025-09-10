import { Component, effect, inject, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Dataset, SearchService } from '../../services/search.service';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-chart-component',
  imports: [ChartModule, Menubar],
  templateUrl: './chart-component.html',
  styleUrl: './chart-component.css'
})
export class ChartComponent implements OnInit {
  items: MenuItem[] | undefined;
  basicOptions: any;
  basicData: any;
  search = inject(SearchService);
  datetimeLastPrice: string[] = [];
  tiempo: string[] = [];
  lastPrice: number[] = [];
  periodo: number = -1;

  dataset(): Dataset[] | null {
    const dataset = this.search.dataset();
    this.periodo = -1;

    if (!this.dataset) return null;

    this.datetimeLastPrice = [];
    this.tiempo = []
    this.lastPrice = [];
    dataset?.map(
      (item:Dataset) => {
        this.datetimeLastPrice.push(item.datetimeLastPrice);
        this.lastPrice.push(item.lastPrice);
      }
    )
    this.tiempo = this.datetimeLastPrice;

    this.basicOptions = {
      // Add Chart.js options here for customization
      // For example:
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            //color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };

    this.prepararData();
    return dataset
  }

  prepararData() {
    this.basicData = {
      labels: this.tiempo,
      datasets: [
        {
          label: 'Last Prices',
          data: this.lastPrice,
          fill: true,
          borderColor: '#1df04eff',
          tension: 0.1,
          backgroundColor: 'rgba(37, 215, 162, 0.44)'
        },
      ]
    };
  }

  graficarPeriodo(codigo: string){
    if ( codigo == "ALL") {
      this.periodo = -1;
      this.tiempo = this.datetimeLastPrice;
      this.prepararData();
      return;
    }
    this.periodo = codigo.includes("M") ? 30*Number(codigo[0]) : 360;
    const dateLimite = new Date(this.datetimeLastPrice.slice(-1)[0].replace("-","/"));
    dateLimite.setDate(dateLimite.getDate() - this.periodo);

    let indice: number = -1
    this.datetimeLastPrice.forEach(
      (fecha: string, index: number) => {
        if ( new Date(fecha) < dateLimite) indice = index
      }
    )
    if (indice == -1) return;
    this.tiempo = this.datetimeLastPrice.slice(indice);
    this.prepararData();
  }

  ngOnInit(): void {
    this.items = [
      {label:"1M", command: () => this.graficarPeriodo("1M")},
      {label:"3M", command: () => this.graficarPeriodo("3M")},
      {label:"6M", command: () => this.graficarPeriodo("6M")},
      {label:"1A", command: () => this.graficarPeriodo("1A")},
      {label:"Todo", command: () => this.graficarPeriodo("ALL")}
    ]
  }

  padTwoDigits(num: number) {
    return num.toString().padStart(2, "0");
  }
  /***
   * Convierte objeto Date a string formateado
   * https://trymysolution.medium.com/javascript-date-as-in-yyyy-mm-dd-hh-mm-ss-format-or-mm-dd-yyyy-hh-mm-ss-a0c96e8fa888
   */
  dateInDdMmYyyyHhMmSs(date: Date, dateDiveder: string = "-") {
  return (
    [
      this.padTwoDigits(date.getDate()),
      this.padTwoDigits(date.getMonth() + 1),
      date.getFullYear(),
    ].join(dateDiveder) +
    " " +
    [
      this.padTwoDigits(date.getHours()),
      this.padTwoDigits(date.getMinutes()),
      this.padTwoDigits(date.getSeconds()),
    ].join(":")
  );
}
}
