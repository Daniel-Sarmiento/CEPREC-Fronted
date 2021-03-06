import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import jsPDF from 'jspdf';

declare var $:any;

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit, AfterViewInit {
  americaDelNorte = ['Canada','Estados Unidos','Groenlandia','México','San Pedro y Miquelón']
  americaDelNorteENG = ['canada','usa','greenland','mexico','saint pierre and miquelon']

  americaDelSur = ['Argentina','Bolivia','Brasil','Chile','Colombia','Ecuador','Guayana Francesa','Guyana','Paraguay','Perú','Surinam','Uruguay','Venezuela']
  americaDelSurENH = ['argentina','bolivia','brazil','chile','colombia','ecuador','french guiana','guyana','paraguay','peru','surinam','uruguay','venezuela']
  
  americaCentral = ['Belice','Costa Rica','El Salvador','Guatemala','Honduras','Nicaragua','Panamá']
  americaCentralENG = ['belize','costa rica','the savior','guatemala','honduras','nicaragua', 'panama']
  
  americaCaribe = ['Anguilla','Antigua and Barbuda','Aruba','Bahamas','Barbados','Bermuda','British Virgin Islands', 'Cayman Islands','Cuba','Curaçao',' 	Dominica','Dominican Republic', 'Grenada','Guadeloupe','Haiti','Jamaica', 'Martinique', 'Montserrat','Puerto Rico', 'Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Trinidad and Tobago','US Virgin Islands']
  americaCaribeENG = ['anguilla','antigua and barbuda','aruba','bahamas','barbados','bermuda','british virgin islands','cayman islands','cuba','curaçao','dominica','dominican republic','grenada','guadeloupe','haiti','jamaica','martinique','montserrat','puerto Rico','saint Kitts and nevis','saint lucia','saint vincent and the grenadines','trinidad and tobago','us virgin islands']

  constructor(private api: ApiService, private formBuilder: FormBuilder) {
    this.formSearch = this.formBuilder.group({
      country: [''],
      year_initial: ['0'],
      year_final: ['0'],
      origin:['0']
    })
    this.obtenerOrigenes()
  }
  formSearch: FormGroup;

  public graficaChartOptions = {
    plugins: {
      labels: {
        // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
        render: 'value',
        fontColor: '#000',
      }
    },
    responsive: true,
    scales: {yAxes: [{ticks: {beginAtZero: true}}]},
    scaleShowVerticalLines: false,
  };
  public graficaChartColors = [
    {
      backgroundColor: [
        'rgba(255, 99, 132)',
        'rgba(54, 162, 235)',
        'rgba(255, 206, 86)',
        'rgba(75, 192, 192)',
        'rgba(153, 102, 255)',
        'rgba(255, 159, 64)',   
        'rgba(83, 219, 158)',
        'rgba(195, 66, 174)',
        'rgba(195, 66, 80)',
        'rgba(234, 129, 196)',
        'rgba(54, 196, 97)',
      ],
    },
  ];

  public graficaChartLabels = [];
  public graficaChartData = [];
  public graficaChartType = 'bar';
  public graficaChartLegend = false;
  graficaDisponible = false;
  listaDatos: any;
  listTipoPublicaciones: any;
  listaTipoCancer: any;
  listaOrigenes:any;
  data = [];
  labels = [];
  verLegend = true;
  tipoGrafica = "bar";
  ngOnInit() {
    this.graficaChartType = this.tipoGrafica;
    this.graficaChartLabels = this.labels;
    this.graficaChartData = this.data;
    this.graficaChartLegend = this.verLegend;
  }

  ngAfterViewInit(){
    $('#selectPais').selectpicker();
    
  }

  inicializarFormulario(){
    this.formSearch = this.formBuilder.group({
      country: [''],
      year_initial: ['0'],
      year_final: ['0'],
      origin:['0']
    })
  }

  obtenerOrigenes(){
    this.api.verOrigenes().subscribe(response => {
      this.listaOrigenes=response;
    });
  }
  cambioGrafica(tipoGrafica) {
    if (tipoGrafica == 1) {
      this.tipoGrafica = "bar";
      this.graficaChartOptions = {
        plugins: {
          labels: {
            // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
            render: 'value',
            fontColor: '#000',
          }
        },
        responsive: true,
        scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
        scaleShowVerticalLines: true
      };
      this.verLegend = false;
    }
    if (tipoGrafica == 2) {
      this.tipoGrafica = "pie";
      this.graficaChartOptions={   
        plugins: {
          labels: {
            // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
            render: 'value',
            fontColor: '#fff',
          }
        },
        responsive: true,
        scales: {yAxes: []},
        scaleShowVerticalLines: false};
      this.verLegend = true;
    }
    if (tipoGrafica == 3) {
      this.tipoGrafica = "line";
      this.graficaChartOptions = {
        plugins: {
          labels: {
            // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
            render: 'value',
            fontColor: '#000',
          }
        },
        responsive: true,
        scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
        scaleShowVerticalLines: true
      };
      this.verLegend = false;
    }
    this.ngOnInit();
  }
  graficaTipoCancer(selectPais) {
    var nombres = [];
    var datos = []
    if(selectPais.value=="Todos"){
      this.formSearch.get('country').setValue("")
    }else{
      this.formSearch.get('country').setValue(selectPais.value)
    }
    this.api.verDatos(this.formSearch.value).subscribe(response => { 
      this.listaDatos = response
      this.listaTipoCancer = this.listaDatos.tipos_de_cancer
      console.log(response)
      for (let i = 0; i < this.listaTipoCancer.length; i++) {
        nombres.push(this.listaTipoCancer[i].nombre)
        datos.push(this.listaTipoCancer[i].cantidad)
      }
      console.log(datos)
      this.data = datos;
      this.labels = nombres;
      this.verLegend = false;
      this.ngOnInit();
    });
    this.graficaDisponible = true;
  }

  graficaTipoPublicaciones(selectPais) {
    var nombres = [];
    var datos = []
    if(selectPais.value=="Todos"){
      this.formSearch.get('country').setValue("")
    }else{
      this.formSearch.get('country').setValue(selectPais.value)
    }
    console.log(this.formSearch.value)
    this.api.verDatos(this.formSearch.value).subscribe(response => {
      this.listaDatos = response
      this.listTipoPublicaciones = this.listaDatos.tipos_de_publicaciones
      for (let i = 0; i < this.listTipoPublicaciones.length; i++) {
        nombres.push(this.listTipoPublicaciones[i].nombre)
        datos.push(this.listTipoPublicaciones[i].cantidad)
      }
      this.data = datos;
      this.labels = nombres;
      this.verLegend = false;
      this.ngOnInit();
    });
    this.graficaDisponible = true;
  }

  downloadCanvas(event,formatoGrafica) {
    var anchor = event.target;
    //PNG
    if(formatoGrafica.value=="1"){
      anchor.href = document.getElementsByTagName('canvas')[0].toDataURL();
      anchor.download = "grafica.png";
    }
    //JPEG
    if(formatoGrafica.value=="2"){
      anchor.href = document.getElementsByTagName('canvas')[0].toDataURL("image/jpeg");
      anchor.download = "grafica.jpeg";
    }
    //PDF
    if(formatoGrafica.value=="3"){
      anchor.href = document.getElementsByTagName('canvas')[0].toDataURL();
      var pdf = new jsPDF()
      pdf.addImage(anchor.href, 'PNG', 32, 40, 150, 120);
      pdf.save('grafica.pdf'); //Download the rendered PDF.
    }

  }
}
