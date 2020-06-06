import { Injectable } from '@angular/core';
import { BaseRestService } from './base-rest.service';
import { CidadeModel } from '../models/cidade-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CidadeService extends BaseRestService<CidadeModel> {

    constructor(public http: HttpClient) {
        super(http, "cidade");
    }

    public listByEstado(estadoId: number): Observable<CidadeModel[]> {
        return this.http.get<CidadeModel[]>(this.actionUrl + "busca-por-estado/" + estadoId);
    }
}
