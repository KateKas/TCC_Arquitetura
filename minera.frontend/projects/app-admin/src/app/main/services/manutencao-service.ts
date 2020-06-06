import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.hmr';

@Injectable({
    providedIn: 'root'
})
export class ManutencaoService {

    constructor(private http: HttpClient) { }
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    getManutencao(id?): Observable<any> {
        if (id === undefined) {
          return this.http.get<any>(environment.API + 'ativos/manutencao').pipe()
        } else {
          return this.http.get<any>(environment.API + 'ativos/manutencao/' + id).pipe()
        }
      }
    
      cadastrarManutencao(data): Observable<any> {
        return this.http.post<any>(environment.API + 'ativos/manutencao/', JSON.stringify(data), this.httpOptions)
          .pipe(
            catchError(this.errorHandl)
          )
      }
    
      editarManutencao(data): Observable<any> {
        return this.http.put<any>(environment.API + 'ativos/manutencao/', JSON.stringify(data), this.httpOptions)
          .pipe(
            catchError(this.errorHandl)
          )
      }

      excluirManutencao(id): Observable<any> {
        return this.http.delete<any>(environment.API + 'ativos/manutencao/' + id).pipe()
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