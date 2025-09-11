import { Component, computed, inject } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { Constituent, DataIndices, IndicesService } from '../../services/indices.service';
import { InstrumentListComponent } from "../instrument-list-component/instrument-list-component";

@Component({
  selector: 'app-tab-component',
  imports: [TabsModule, CommonModule, InstrumentListComponent],
  templateUrl: './tab-component.html',
  styleUrl: './tab-component.css'
})
export class TabComponent {
  indiceService = inject(IndicesService)
  tabs : { title: string, value: number, content: string }[]= []
  indiceSeleccionado!: DataIndices;
  constituyentes: Constituent[] = [];
  dataIndices = computed(() => this.seleccionarIndice(this.tabsIndices[this.indiceService.tab()]) )

  tabsIndices = ["IPSA","IGPA","NASDAQ", "DOW JONES","SP/BLV"]
  ngOnInit() {
    this.tabsIndices.map((item, index) => this.tabs.push(
      { title: item, value: index, content: '' }
    ))
  }
  seleccionarIndice(indice: string) {
    this.indiceSeleccionado = this.indiceService.loadIndices(indice);
    this.constituyentes = this.indiceSeleccionado?.constituents;
    return this.indiceSeleccionado;
  }

  changeTab(event: any){
    this.indiceService.tab.set(event)
    this.seleccionarIndice(this.tabsIndices[event])
  }
}
