import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import {ExcelService} from 'src/app/service/excel.service';
import { ApiService } from '../../service/api.service';

declare var $:any;

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit, AfterViewInit{
  americaDelNorte = ['Bermudas','Canada','Estados Unidos','Groenlandia','México','San Pedro y Miquelón']
  americaDelSur = ['Argentina','Bolivia','Brasil','Chile','Colombia','Ecuador','Guayana Francesa','Guyana','Paraguay','Perú','Surinam','Uruguay','Venezuela']
  americaCentral = ['Belice','Costa Rica','El Salvador','Guatemala','Honduras','Nicaragua','Panamá']
  listPublicaciones:any
  formSearch:FormGroup;
  autoresItems:FormArray; 
  configuracionPaginacion:any;
  datosDisponibles = false;
  sinResultado = false;
  validarExportacion = true;
  cantidad = 0;
  loading = true;
  error = false;

  constructor(private api: ApiService,private formBuilder:FormBuilder,private excelService:ExcelService){  
    this.inicializarFormulario();
    this.configuracionPaginacion = {
      id: 'custom'
    }
  }

  ngOnInit(){
    this.obtenerPublicaciones()
  } 

  ngAfterViewInit(){
    $('select').selectpicker();
  }

  paginacion(len){
    this.configuracionPaginacion = {
      id: 'custom',
      itemsPerPage:10,
      currentPage: 1,
      totalItems: len
    }
  }
  obtenerPublicaciones(){
    this.sinResultado = false
    this.validarExportacion = true
    this.datosDisponibles = false
    this.error = false

    this.api.verPublicaciones().subscribe(response => {
      this.listPublicaciones=response
      this.paginacion(this.listPublicaciones.length)
      this.datosDisponibles = true
      this.cantidad=this.listPublicaciones.length

      if (this.listPublicaciones.length == 0){
        this.sinResultado = true
      }

    }, error => {this.error = true});
  }
  
  inicializarFormulario(){
    this.formSearch = this.formBuilder.group({
      tittle_publication: [''],
      users: this.formBuilder.array([this.crearAutorItem()]),
      country: [''],
      year_initial: [0],
      year_final: [0],
      name_institution: ['']
    })
  }

  crearAutorItem(): FormGroup {
    return this.formBuilder.group({
      name: ''
    })
  }

  addAutorItem(): void {
    this.autoresItems = this.formSearch.get('users') as FormArray;
    this.autoresItems.push(this.crearAutorItem());
  }

  deleteAutor(index): void {
    this.autoresItems = this.formSearch.get('users') as FormArray;
    this.autoresItems.removeAt(index);
  }

  exportarAexcel(){
    if(this.sinResultado){
      this.validarExportacion=false
    }else{
      this.excelService.exportAsExcelFile(this.listPublicaciones, 'busquedaDeCancer');
    }
    
  } 

  buscar(selectPais){
    window.scrollTo(0, 0);
    this.listPublicaciones = []
    this.sinResultado = false
    this.validarExportacion = true
    this.datosDisponibles = false
    this.error = false
    if(selectPais.value=="Todos"){
      this.formSearch.get('country').setValue("")
    }else{
      this.formSearch.get('country').setValue(selectPais.value)
    }
    this.api.buscarPublicaciones(this.formSearch.value).subscribe(response => {
      this.listPublicaciones=response
      this.cantidad=this.listPublicaciones.length
      this.paginacion(this.listPublicaciones.length)
      if (this.listPublicaciones.length==0){
        this.sinResultado=true
      }
      this.datosDisponibles=true
    }, error => {this.error = true} );
  }

  cambiarPagina(event){
    this.configuracionPaginacion.currentPage = event;
    window.scrollTo(0, 0);
  }
  get formData(){ return this.formSearch.get('users') }
}
