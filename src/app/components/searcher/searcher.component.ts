import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import {ExcelService} from 'src/app/service/excel.service';

declare var $:any;

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements AfterViewInit  {
  americaDelNorte = ['Bermudas','Canada','Estados Unidos','Groenlandia','México','San Pedro y Miquelón']
  americaDelSur = ['Argentina','Bolivia','Brasil','Chile','Colombia','Ecuador','Guayana Francesa','Guyana','Paraguay','Perú','Surinam','Uruguay','Venezuela']
  americaCentral = ['Belice','Costa Rica','El Salvador','Guatemala','Honduras','Nicaragua','Panamá']
  collection = { count: 1000, articulos: [] };
  formSearch:FormGroup;
  autoresItems:FormArray; 
  configuracionPaginacion: any

  constructor(
    private formBuilder:FormBuilder,
    private excelService:ExcelService
    ) {  
    this.inicializarFormulario();

    for (var i = 0; i < this.collection.count; i++) {
      this.collection.articulos.push(
        {
          id: i + 1,
          titulo: "Titulo del articulo  "+ (i+1),
          autor: "Autor1, author2",
          resumen: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto pariatur sapiente non qui sed omnis animi libero quis! Voluptas, recusandae? Adipisci incidunt aperiam error magni cumque doloribus autem sit alias.",
          fecha: "12/26/1998",
          link: "https://www.cancer.gov/espanol/cancer/naturaleza/que-es"
        }
      );
    }

    this.configuracionPaginacion = {
      id: 'custom',
      itemsPerPage:10,
      currentPage: 1,
      totalItems: this.collection.count
    };
  }

  ngAfterViewInit() {
    $('select').selectpicker();
  } 

  inicializarFormulario(){
    this.formSearch = this.formBuilder.group({
      titulo: [''],
      autores: this.formBuilder.array([this.crearAutorItem()]),
      pais: [''],
      fecha1: [''],
      fecha2: [''],
      institucion: ['']
    })
  }

  crearAutorItem(): FormGroup {
    return this.formBuilder.group({
      name: ''
    })
  }

  addAutorItem(): void {
    this.autoresItems = this.formSearch.get('autores') as FormArray;
    this.autoresItems.push(this.crearAutorItem());
  }

  deleteAutor(index): void {
    this.autoresItems = this.formSearch.get('autores') as FormArray;
    this.autoresItems.removeAt(index);
  }

  buscar(selectPais){
    this.formSearch.get('pais').setValue(selectPais.value)
    console.log(this.formSearch.value)
  }

  cambiarPagina(event){
    this.configuracionPaginacion.currentPage = event;
  }
  exportarAexcel(){
   this.excelService.exportAsExcelFile(this.collection.articulos, 'busquedaDeCancer');
  } 
}
