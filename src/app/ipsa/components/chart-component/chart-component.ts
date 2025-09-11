import { Component, computed, effect, inject, OnInit } from '@angular/core';
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
  search = inject(SearchService);
  datetimeLastPrice: string[] = [];
  tiempo: string[] = [];
  lastPrice: number[] = [];
  periodo: number = -1;
  basicData = computed(() => this.prepararData(this.search.dataset(), this.search.periodo()))


  constructor(){
    this.basicOptions = {
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
  }

  getDataset(): Dataset[] | null{
    return this.search.dataset();
  }

  prepararData(dataset: Dataset[] | null, periodo: number) {
    if (!dataset) return null;

    const tiempo = dataset.map(d => d.datetimeLastPrice);
    let tiempoPeriodo = tiempo
    const lastPrice = dataset.map(d => d.lastPrice);
    let lastPricePeriodo = lastPrice;

    if (periodo >-1){
      const dateLimite = new Date(tiempo.slice(-1)[0].replace("-","/"));
      dateLimite.setDate(dateLimite.getDate() - periodo);
      let indice: number = -1
      tiempo.forEach(
        (fecha: string, index: number) => {
          if ( new Date(fecha) < dateLimite) indice = index
        }
      )
      tiempoPeriodo = indice>-1 ? tiempo.slice(indice) : tiempo;
      lastPricePeriodo = indice >-1 ? lastPrice.slice(indice) : lastPrice;
    }

    return {
      labels: tiempoPeriodo,
      datasets: [{
        label: 'Last Prices',
        data: lastPricePeriodo,
        fill: true,
        borderColor: '#1df04eff',
        tension: 0.1,
        backgroundColor: 'rgba(37, 215, 162, 0.44)'
      }]
    };
  }

  graficarPeriodo(codigo: string) {
    const periodo: number = codigo != "ALL" ? codigo.includes("M") ? 30*Number(codigo[0]) : 360 : -1;
    this.periodo = periodo;
    this.search.periodo.set(periodo);
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
}
