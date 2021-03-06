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
  americaDelNorte = ['Canada','Estados Unidos','Groenlandia','México','San Pedro y Miquelón']
  americaDelNorteENG = ['canada','usa','greenland','mexico','saint pierre and miquelon']

  americaDelSur = ['Argentina','Bolivia','Brasil','Chile','Colombia','Ecuador','Guayana Francesa','Guyana','Paraguay','Perú','Surinam','Uruguay','Venezuela']
  americaDelSurENH = ['argentina','bolivia','brazil','chile','colombia','ecuador','french guiana','guyana','paraguay','peru','surinam','uruguay','venezuela']
  
  americaCentral = ['Belice','Costa Rica','El Salvador','Guatemala','Honduras','Nicaragua','Panamá']
  americaCentralENG = ['belize','costa rica','the savior','guatemala','honduras','nicaragua', 'panama']
  
  americaCaribe = ['Anguilla','Antigua and Barbuda','Aruba','Bahamas','Barbados','Bermuda','British Virgin Islands', 'Cayman Islands','Cuba','Curaçao',' 	Dominica','Dominican Republic', 'Grenada','Guadeloupe','Haiti','Jamaica', 'Martinique', 'Montserrat','Puerto Rico', 'Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Trinidad and Tobago','US Virgin Islands']
  americaCaribeENG = ['anguilla','antigua and barbuda','aruba','bahamas','barbados','bermuda','british virgin islands','cayman islands','cuba','curaçao','dominica','dominican republic','grenada','guadeloupe','haiti','jamaica','martinique','montserrat','puerto Rico','saint Kitts and nevis','saint lucia','saint vincent and the grenadines','trinidad and tobago','us virgin islands']

  listPublicaciones:any
  formSearch:FormGroup;
  autoresItems:FormArray; 
  configuracionPaginacion:any;
  datosDisponibles = true;
  sinResultado = false;
  validarExportacion = true;
  cantidad = 0;
  loading = true;
  error = false;
  textEmpezar=true

  constructor(private api: ApiService,private formBuilder:FormBuilder,private excelService:ExcelService){  
    this.inicializarFormulario();
    this.configuracionPaginacion = {
      id: 'custom',
      itemsPerPage:10,
      currentPage: 1,
      totalItems: 10
    }
  }

  ngOnInit(){
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
    this.textEmpezar=false
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
    console.log(this.formSearch.value)
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
