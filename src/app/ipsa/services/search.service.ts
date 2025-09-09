import { Injectable, signal } from '@angular/core';

const codeInstrumentList = ["IPSA", "AGUAS-A", "ANDINA-B","BCI", "BSANTANDER","CAP"]

@Injectable({ providedIn: 'root' })
export class SearchService {
  instrumento = signal('');
  codeInstruments = codeInstrumentList;
}