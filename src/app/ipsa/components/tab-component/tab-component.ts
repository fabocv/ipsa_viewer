import { Component, computed, inject } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { DataIndices, IndicesService } from '../../services/indices.service';

@Component({
  selector: 'app-tab-component',
  imports: [TabsModule, CommonModule],
  templateUrl: './tab-component.html',
  styleUrl: './tab-component.css'
})
export class TabComponent {
  indiceService = inject(IndicesService)
  tabs : { title: string, value: number, content: string }[]= []
  indiceSeleccionado: DataIndices | null = null;
  dataIndices = computed(() => this.seleccionarIndice(this.tabsIndices[this.indiceService.tab()]) )

  tabsIndices = ["IPSA","IGPA","NASDAQ", "DOW JONES","SP/BLV"]
  ngOnInit() {
    this.tabsIndices.map((item, index) => this.tabs.push(
      { title: item, value: index, content: '' }
    ))
  }
  seleccionarIndice(indice: string) {
    this.indiceSeleccionado = this.indiceService.loadIndices(indice);
    return this.indiceSeleccionado;
  }

  changeTab(event: any){
    this.indiceService.tab.set(event)
    this.seleccionarIndice(this.tabsIndices[event])
  }
}
