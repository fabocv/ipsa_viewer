import { Component, effect, inject } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Dataset, SearchService } from '../../services/search.service';

@Component({
  selector: 'app-chart-component',
  imports: [ChartModule],
  templateUrl: './chart-component.html',
  styleUrl: './chart-component.css'
})
export class ChartComponent {
  basicOptions: any;
  basicData: any;
  dataset: Dataset[] | null= [];
  search = inject(SearchService);
  datetimeLastPrice: string[] = [];
  lastPrice: number[] = [];

  constructor(){
    effect(() => {
    this.dataset = this.search.dataset();
    if (!this.dataset) return;

    this.datetimeLastPrice = [];
    this.lastPrice = [];
    this.dataset.map(
      (item:Dataset) => {
        this.datetimeLastPrice.push(item.datetimeLastPrice);
        this.lastPrice.push(item.lastPrice);
      }
    )
    this.basicData = {
      labels: this.datetimeLastPrice,
      datasets: [
        {
          label: 'Last Prices',
          data: this.lastPrice,
          fill: true,
          borderColor: '#42A5F5',
          tension: 0.7,
          backgroundColor: 'rgba(31, 194, 145, 0.2)'
        },
      ]
    };

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
    });
  }
}
