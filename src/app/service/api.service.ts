import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url="http://127.0.0.1:8000/api/v1/";
  constructor(private http: HttpClient) { }

  //Estadisticas
  verDatos(params:any) {
    return this.http.post(this.url+'publications/cantidad/',params);
  }
}

