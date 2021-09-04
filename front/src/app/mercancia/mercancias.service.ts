import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MercanciasService {
  data: any;

  constructor(
    private http: HttpClient
  ) { }

  getUsers() {
    return this.http.get('/api/usuarios').toPromise();
  }

  getMercancias() {
    return this.http.get('/api/mercancias').toPromise();
  }

  create(datos: any) {
    return this.http.post('/api/mercancias', datos).toPromise();
  }

  getMercanciaById(id: any) {
    const params = new  HttpParams().set('id', id);
    return this.http.get('/api/mercancias', {params}).toPromise();
  }

  update(id: any, datos: any) {
    return this.http.put('/api/mercancias/' + id, datos).toPromise();
  }

  delete(id: any) {
    return this.http.delete('/api/mercancias/' + id).toPromise();
  }

}
