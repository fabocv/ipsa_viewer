import { Component, Input, OnInit } from '@angular/core';
import { Constituent } from '../../services/indices.service';
import { InstrumentItemComponent } from '../instrument-item-component/instrument-item-component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Button } from "primeng/button";

@Component({
  selector: 'app-instrument-list-component',
  imports: [InstrumentItemComponent, PaginatorModule, Button],
  templateUrl: './instrument-list-component.html',
  styleUrl: './instrument-list-component.css'
})
export class InstrumentListComponent {
  @Input("indice") indice: Constituent[] = [];
  constituyentes!:  Constituent[];
  first: number = 0;
  rows: number = 10;

  nombreAsc: boolean = true;
  ultimoAsc = true;
  filtros: string[] = []

  constructor() {
    //this.constituyentes = this.indice
  }

  onPageChange(event: any){
    this.first = event.first
  }

  data(){
    this.constituyentes = this.indice
    if (this.filtros.length == 0) return this.constituyentes

    if (this.filtros.includes("NOMBRE")) {
      this.constituyentes = this.indice.sort(
      (a: Constituent, b: Constituent) => !this.nombreAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    ); }
    if (this.filtros.includes("ULT")) {
      this.constituyentes = this.constituyentes.sort(
      (a: Constituent, b: Constituent) => !this.ultimoAsc ? a.lastPrice- b.lastPrice: b.lastPrice - a.lastPrice
    ); }

    return this.constituyentes
  }

  sortNombre(){
    this.filtros = []
    this.filtros.push("NOMBRE")
    this.nombreAsc = !this.nombreAsc
  }

  sortUltimo() {
    this.filtros = []
    this.filtros.push("ULT")
    this.ultimoAsc = !this.ultimoAsc
  }
}
