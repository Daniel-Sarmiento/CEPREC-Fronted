import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

declare var $:any;

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements AfterViewInit  {

  articles = [];
  formSearch:FormGroup;

  constructor(private formBuilder:FormBuilder) {  
    this.inicializarFormulario();
  }

  ngAfterViewInit() {
    $('select').selectpicker();
  } 

  inicializarFormulario(){
    this.formSearch = this.formBuilder.group({
      autor: [''],
      pais: ['']
    })
  }

  buscar(selectPais){
    this.formSearch.get('pais').setValue(selectPais.value)
    console.log(this.formSearch.value)
  }

}
