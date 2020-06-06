import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgrupamentosCorrelatosModel } from '../models/agrupamentos-correlatos-model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.hmr';


@Injectable({
  providedIn: 'root'
})
export class AgrupamentosCorrelatosService {

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getAgrupamentoCorrelatos(id?): Observable<AgrupamentosCorrelatosModel> {
    return this.http.get<AgrupamentosCorrelatosModel>(environment.API + 'agrupamentos/agrupamentos-correlatos?id=' + id, this.httpOptions)
  }

  getCorrelatos(id?): Observable<AgrupamentosCorrelatosModel> {
    return this.http.get<AgrupamentosCorrelatosModel>(environment.API + 'agrupamentos/' + id + '/agrupamentos-correlatos')
  }


  filtrarAgrupamentos(id, agrupamento): Observable<AgrupamentosCorrelatosModel> {
    return this.http.get<AgrupamentosCorrelatosModel>(environment.API + 'agrupamentos/filtrarCorrelatos/' + id + '/' + agrupamento)
  }

  editarPrioridade(idAgrupamento, prioridade, idAgrupamentoCorrelato): Observable<AgrupamentosCorrelatosModel> {
    return this.http.put<AgrupamentosCorrelatosModel>(`${environment.API}agrupamentos/prioridade-agrupamentos-correlatos/${idAgrupamento}/prioridade?aumentar-prioridade=${prioridade}&correlatoId=${idAgrupamentoCorrelato}`, this.httpOptions)
      .pipe(
      )
  }


  vincularAgrupamento(id): Observable<AgrupamentosCorrelatosModel> {
    return this.http.post<AgrupamentosCorrelatosModel>(environment.API + 'agrupamentos/cadastrarAgrupamento', JSON.stringify(id), this.httpOptions)
      .pipe(
        catchError(this.errorHandl)
      )
  }

  remove(id): Observable<AgrupamentosCorrelatosModel> {
    return this.http.delete<AgrupamentosCorrelatosModel>(environment.API + 'agrupamentos/agrupamentos-correlatos/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandl)
      )
  }

  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
