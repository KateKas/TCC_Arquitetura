import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FiltrosModel } from '../models/filtros-model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.hmr';
@Injectable({
    providedIn: 'root'
})
export class FiltrosService {

    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    // GET
    getDepartamentos(): Observable<FiltrosModel> {
        return this.http.get<FiltrosModel>(environment.API + 'filtros/listarDepartamentos/')
    }

    getDepartamentosPorAgrupamento(idAgrupamento: number): Observable<FiltrosModel> {
        return this.http.get<FiltrosModel>(environment.API + 'filtros/listarDepartamentos/' + idAgrupamento)
    }


    getCategorias(data): Observable<FiltrosModel> {
        return this.http.post<FiltrosModel>(environment.API + 'filtros/listarCategorias', JSON.stringify(data), this.httpOptions)
    }

    getCategoriasPorAgrupamento(data, idAgrupamento: number): Observable<FiltrosModel> {
        return this.http.post<FiltrosModel>(environment.API + 'filtros/listarCategorias/' + idAgrupamento, JSON.stringify(data), this.httpOptions)
    }

    getSubCategorias(data): Observable<FiltrosModel> {
        return this.http.post<FiltrosModel>(environment.API + 'filtros/listarSubCategorias', JSON.stringify(data), this.httpOptions)
    }

    getSubCategoriasPorAgrupamento(data, idAgrupamento: number): Observable<FiltrosModel> {
        return this.http.post<FiltrosModel>(environment.API + 'filtros/listarSubCategorias/' + idAgrupamento, JSON.stringify(data), this.httpOptions)
    }

    getSegmento(data: any[]): Observable<FiltrosModel> {
        return this.http.post<FiltrosModel>(environment.API + 'filtros/listarSegmentos', JSON.stringify(data), this.httpOptions)
    }

    getSegmentoPorAgrupamento(data: any[], idAgrupamento: number): Observable<FiltrosModel> {
        return this.http.post<FiltrosModel>(environment.API + 'filtros/listarSegmentos/' + idAgrupamento, JSON.stringify(data), this.httpOptions)
    }

    getSubSegmento(data: any[]): Observable<FiltrosModel> {
        return this.http.post<FiltrosModel>(environment.API + 'filtros/listarSubSegmentos', JSON.stringify(data), this.httpOptions)
    }
    getSubSegmentoPorAgrupamento(data: any[], idAgrupamento: number): Observable<FiltrosModel> {
        return this.http.post<FiltrosModel>(environment.API + 'filtros/listarSubSegmentos/' + idAgrupamento, JSON.stringify(data), this.httpOptions)
    }
}
