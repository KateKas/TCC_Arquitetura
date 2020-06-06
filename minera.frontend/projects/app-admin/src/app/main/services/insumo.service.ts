import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.hmr';

@Injectable({
    providedIn: 'root'
})
export class InsumoService {

    constructor(private http: HttpClient) { }
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    getInsumos(id?): Observable<any> {
        if (id === undefined) {
          return this.http.get<any>(environment.API + 'ativos/insumo').pipe()
        } else {
          return this.http.get<any>(environment.API + 'ativos/insumo/' + id).pipe()
        }
      }
    
      cadastrarInsumo(data): Observable<any> {
        return this.http.post<any>(environment.API + 'ativos/insumo/', JSON.stringify(data), this.httpOptions)
          .pipe(
            catchError(this.errorHandl)
          )
      }
    
      editarInsumo(data): Observable<any> {
        return this.http.put<any>(environment.API + 'ativos/insumo/', JSON.stringify(data), this.httpOptions)
          .pipe(
            catchError(this.errorHandl)
          )
      }

      excluirInsumo(id): Observable<any> {
        return this.http.delete<any>(environment.API + 'ativos/insumo/' + id).pipe()
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