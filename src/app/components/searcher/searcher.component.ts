import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

declare var $:any;

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements AfterViewInit  {

  articles = [];
  formSearch:FormGroup;
  autoresItems:FormArray;

  constructor(private formBuilder:FormBuilder) {  
    this.inicializarFormulario();
  }

  ngAfterViewInit() {
    $('select').selectpicker();
  } 

  inicializarFormulario(){
    this.formSearch = this.formBuilder.group({
      autores: this.formBuilder.array([this.crearAutorItem()]),
      pais: ['']
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

}
