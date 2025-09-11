import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";

export interface InfoIndice {
    name: string
    shortName: string
    countryName: string
    codeInstrument: string
}

export interface Constituent {
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
    constituents: Constituent[]
}

export interface DataBolsa {
    success: boolean
    code: number
    data: DataIndices
}

const dataindices_void: DataIndices = {
    info:{
        name: "string",
        shortName: "string",
        countryName: "string",
        codeInstrument: "string",
    }, constituents: []
}

@Injectable({ providedIn: 'root' })
export class IndicesService {
    private http = inject(HttpClient);
    
    indices = signal<DataIndices >(dataindices_void);
    tab = signal(0)

    loadIndices(indice: string) {
        this.http.get<DataBolsa>(`/constituyentes/constituensList.json`)
            .subscribe((res: DataBolsa) =>  this.indices.set(
                res?.data?.info?.name == indice ? res.data : dataindices_void));
        return this.indices()
    }
}