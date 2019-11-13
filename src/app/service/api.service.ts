import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url="https://ceprec-api-publications.herokuapp.com/api/v1/";
  constructor(private http: HttpClient) { }

  //Estadisticas
  verDatos(params:any) {
    return this.http.post(this.url+'publications/cantidad/',params);
  }
  //Origenes
  verOrigenes(){
    return this.http.get(this.url+"origin/");
  }
  //Publicaciones
  verPublicaciones(){
    return this.http.get(this.url+"publications/");
  }
  buscarPublicaciones(params:any){
    return this.http.post(this.url+"publications/lista/",params);
  }
}

