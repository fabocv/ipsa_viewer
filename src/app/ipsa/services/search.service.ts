import { effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const codeInstrumentList = ["AGUAS-A", "ANDINA-B", "BCI", "BSANTANDER", "CAP","IPSA"]
export interface InfoResumen {
  name: string
  shortName: string
  countryName: string;
  currencyName: string;
  currencySymbol: string;
  codeInstrument: string;
  marketName: string;
  hourOpen: string;
  hourClose: string;
  trading: boolean;
  exchangeRate: number;
}

export interface PriceResumen {
  lastPrice: number
  datetimeLastPrice: string
  openPrice: number
  closePrice: number
  datetimeClosePrice: string
  performanceAbsolute: number
  performanceRelative: number
  bid: number
  bidVolume: number
  bidDatetime: string
  ask: number
  askVolume: number
  askDatetime: string
  volumeMoney:number
  accumulatedVolumeMoney: number
  volumeInstrument:number
  accumulatedVolumeInstrument:number
  tend: string
  maxDay:number
  minDay:number
  min52W:number
  max52W:number
  pct30D:number
  pctRelW52:number
  pctRelCY:number
}

export interface DataResumen {
  info: InfoResumen,
  price: PriceResumen
}

export interface Resumen {
  success: boolean
  code: number
  data: DataResumen
}

export interface DataChartInstrumento {
  info: InfoResumen,
  chart: Dataset[]
}

export interface historyInstrumento {
  success: boolean;
  code: number;
  data: DataChartInstrumento
}

export interface Dataset {
  datetimeLastPrice: string;
  datetimeLastPriceTs:number;
  lastPrice: number;
  highPrice:number;
  lowPrice:number;
  openPrice:number;
  closePrice:number;
  volume:number;
  volumeMoney:number;
  performanceRelative:number;
  performanceAbsolute:number;
  tend: string;
}  


@Injectable({ providedIn: 'root' })
export class SearchService {
  private http = inject(HttpClient);
  
  instrumento = signal('');
  periodo = signal(-1); //-1: todos los periodos del dataset a graficar
  resumen = signal<DataResumen | null>(null);
  dataset = signal<Dataset[] | null>(null);
  codeInstruments = codeInstrumentList;

  constructor() {
    effect(() => {
      const code = this.instrumento();
      if (code) {
        this.loadResumen(code);
        if (this.resumen()) this.loadDataset(code);
      }
    });
  }

  loadResumen(instrumento: string) {
    this.http.get<Resumen>(`/resumen/${instrumento}.json`)
      .subscribe({
        next: (res: Resumen) => this.resumen.set(res.data),
        error: (err: any) => {alert("Sin datos"); this.resumen.set(null)}
      });
    return this.resumen
  }

  loadDataset(instrumento: string) {
    this.http.get<historyInstrumento>(`/history/history-${instrumento}.json`)
      .subscribe((res: historyInstrumento) => {
        this.dataset.set(res.data.chart);
      })
  }
}

