import { effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const codeInstrumentList = ["IPSA","AGUAS-A", "ANDINA-B", "BCI", "BSANTANDER", "CAP"]
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

@Injectable({ providedIn: 'root' })
export class SearchService {
  private http = inject(HttpClient);
  
  instrumento = signal('');
  resumen = signal<DataResumen | null>(null);
  codeInstruments = codeInstrumentList;

  constructor() {
    // 👇 se ejecuta cada vez que cambia `instrumento`
    effect(() => {
      const code = this.instrumento();
      if (code) {
        this.loadResumen(code);
      }
    });
  }

  loadResumen(instrumento: string) {
    this.http.get<Resumen>(`/resumen/${instrumento}.json`)
      .subscribe((res: Resumen) => this.resumen.set(res.data));
    return this.resumen
  }
}

