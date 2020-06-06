import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategoriasModel, Categorias } from '../models/categorias-model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map, tap, } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CategoriasService {

    constructor(private http: HttpClient) { }
    baseurl = 'http://localhost:4202';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    // get(): Observable<CategoriasModel> {
    //     return this.http.get<CategoriasModel>(this.baseurl + '/categorias/')
    //         .pipe(
    //              ,
    //         )
    // }

    search(filter: { nomeCategoria: string } = { nomeCategoria: '' }, page = 1): Observable<Categorias> {
        return this.http.get<Categorias>(this.baseurl + '/categorias/')
            .pipe(
                tap((response: Categorias) => {
                    response.categorias = response.categorias
                        .map(categorias => new CategoriasModel(categorias.id, categorias.nomeCategoria))
                        .filter(categorias => categorias.nomeCategoria.includes(filter.nomeCategoria))
                    return response;
                })
            );
    }
}
