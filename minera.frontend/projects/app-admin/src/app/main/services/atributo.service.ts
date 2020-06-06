import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AtributoModel } from '../models/atributo-model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.hmr';

@Injectable({
  providedIn: 'root'
})
export class AtributoService {

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  getAtributos(idAgrupamento?): Observable<AtributoModel> {
    return this.http.get<AtributoModel>(environment.API + 'agrupamentos/buscar-agrupamento-atributos/' + idAgrupamento)
      .pipe(
      )
  }

  getListaAtributos(): Observable<AtributoModel> {
    return this.http.get<AtributoModel>(environment.API + 'atributos/')
      .pipe(
      )
  }

  getAtributosPorId(id): Observable<AtributoModel> {
    return this.http.get<AtributoModel>(environment.API + 'atributos/buscarAtributosPorAgrupamento/' + id)
  }

  filtrarAtributos(idAgrupamento, atributo): Observable<AtributoModel> {
    return this.http.get<AtributoModel>(environment.API + 'atributos/filtrarAtributos/' + idAgrupamento + '/' + atributo)
  }

  remove(id): Observable<AtributoModel> {
    return this.http.put<AtributoModel>(environment.API + 'atributos/excluirAssociacaoAgrupamentoAtributo?codigoAssociacaoAgrupamentoAtributo=' + id, this.httpOptions)
      .pipe(
      )
  }

  removeRespostas(idAgrupamento: number, idResposta: number[]): Observable<AtributoModel> {
    return this.http.put<AtributoModel>(`${environment.API}atributos/excluir-resposta/${idAgrupamento}/${idResposta}`, this.httpOptions);
  }

  saveAtributo(data): Observable<AtributoModel> {
    return this.http.post<AtributoModel>(environment.API + 'atributos', JSON.stringify(data), this.httpOptions)
      .pipe(
      )
  }

  editarPrioridade(atributo, aumentarPrioridade): Observable<AtributoModel> {
    return this.http.put<AtributoModel>(environment.API + 'atributos/agrupamento/' + atributo.codigoAgrupamento + '/prioridade?atributo-id=' + atributo.codigoAtributo + '&aumentar-prioridade=' + aumentarPrioridade, JSON.stringify(atributo), this.httpOptions)
      .pipe(
      )
  }

  updateAtributo(data): Observable<AtributoModel> {
    return this.http.put<AtributoModel>(environment.API + 'sku/filtrarProdutos', JSON.stringify(data), this.httpOptions)
      .pipe(
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
    return throwError(errorMessage);
  }

}
