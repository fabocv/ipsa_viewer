import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";

export interface InfoIndice {
    name: string
    shortName: string
    countryName: string
    codeInstrument: string
}

export interface ConstituentsList {
    codeInstrument: string
    name: string
    shortName: string
    pctDay: number
    pct30D: number
    pctCY: number
    pct1Y: number
    lastPrice: number
    datetimeLastPrice: string
    volumeMoney: number
    accumulatedVolumeMoney: number
    tend: string
    performanceAbsolute: number
    performanceRelative: number
}


export interface DataIndices {
    info: InfoIndice
    constituents: ConstituentsList
}

export interface DataBolsa {
    success: boolean
    code: number
    data: DataIndices
}

@Injectable({ providedIn: 'root' })
export class IndicesService {
    private http = inject(HttpClient);
    
    indices = signal<DataIndices | null>(null);
    tab = signal(0)

    loadIndices(indice: string) {
        this.http.get<DataBolsa>(`/constituyentes/constituensList.json`)
            .subscribe((res: DataBolsa) =>  this.indices.set(
                res?.data?.info?.name == indice ? res.data : null));
        return this.indices()
    }
}