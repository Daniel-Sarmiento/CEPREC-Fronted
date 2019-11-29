import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

declare var $:any;

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit, AfterViewInit {
  americaDelNorte = ['Bermudas', 'Canada', 'Estados Unidos', 'Groenlandia', 'México', 'San Pedro y Miquelón']
  americaDelSur = ['Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Ecuador', 'Guayana Francesa', 'Guyana', 'Paraguay', 'Perú', 'Surinam', 'Uruguay', 'Venezuela']
  americaCentral = ['Belice', 'Costa Rica', 'El Salvador', 'Guatemala', 'Honduras', 'Nicaragua', 'Panamá']

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
    responsive: true,
    scales: {yAxes: [{ticks: {beginAtZero: true}}]},
    scaleShowVerticalLines: false
  };
  public graficaChartColors = [
    {
      backgroundColor: [
        'rgba(255, 99, 132)',
        'rgba(54, 162, 235)',
        'rgba(255, 206, 86)',
        'rgba(75, 192, 192)',
        'rgba(153, 102, 255)',
        'rgba(255, 159, 64)'
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

  obtenerOrigenes(){
    this.api.verOrigenes().subscribe(response => {
      console.log(response)
      this.listaOrigenes=response;
    });
  }
  cambioGrafica(tipoGrafica) {
    if (tipoGrafica == 1) {
      this.tipoGrafica = "bar";
      this.graficaChartOptions = {
        responsive: true,
        scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
        scaleShowVerticalLines: true
      };
      this.verLegend = false;
    }
    if (tipoGrafica == 2) {
      this.tipoGrafica = "pie";
      this.graficaChartOptions={    responsive: true,
        scales: {yAxes: []},
        scaleShowVerticalLines: false};
      this.verLegend = true;
    }
    if (tipoGrafica == 3) {
      this.tipoGrafica = "line";
      this.graficaChartOptions = {
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
    console.log(this.formSearch.value)
    this.api.verDatos(this.formSearch.value).subscribe(response => { 
      this.listaDatos = response
      this.listaTipoCancer = this.listaDatos.tipos_de_cancer
      for (let i = 0; i < this.listaTipoCancer.length; i++) {
        nombres.push(this.listaTipoCancer[i].nombre)
        datos.push(this.listaTipoCancer[i].cantidad)
      }
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
}
