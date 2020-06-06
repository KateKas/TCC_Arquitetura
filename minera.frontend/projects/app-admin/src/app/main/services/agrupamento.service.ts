import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgrupamentoModel } from '../models/agrupamento-model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.hmr';
@Injectable({
  providedIn: 'root'
})
export class AgrupamentoService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  getAgrupamento(id?): Observable<AgrupamentoModel> {
    if (id === undefined) {
      return this.http.get<AgrupamentoModel>(environment.API + 'agrupamentos/').pipe()
    } else {
      return this.http.get<AgrupamentoModel>(environment.API + 'agrupamentos/' + id).pipe()
    }
  }

  removeAgrupamento(id): Observable<AgrupamentoModel> {
    return this.http.delete<AgrupamentoModel>(environment.API + 'agrupamentos/agrupamento/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandl)
      )
  }

  getAtributosRespostas(id): Observable<AgrupamentoModel> {
    return this.http.get<AgrupamentoModel>(environment.API + 'agrupamentos/' + id + '/atributos-respostas').pipe()
  }

  getRespostasSelecionadas(idAgrupamento, idProduto): Observable<AgrupamentoModel> {
    return this.http.get<AgrupamentoModel>(`${environment.API}agrupamentos/buscar-agrupamento-produtos/${idAgrupamento}/${idProduto}`).pipe()
  }

  filtrarAgrupamento(agrupamento): Observable<AgrupamentoModel> {
    return this.http.get<AgrupamentoModel>(environment.API + 'agrupamentos/filtrarAgrupamentos/' + agrupamento).pipe()
  }

  getSkusFiltrados(data, page): Observable<AgrupamentoModel> {
    return this.http.post<AgrupamentoModel>(`${environment.API}sku?page=${page}&size=50`, JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandl)
      )
  }

  getSkusPorAgrupamento(data, page): Observable<AgrupamentoModel> {
    return this.http.post<AgrupamentoModel>(`${environment.API}sku/filtrarSkuAssociados?page=${page}&size=50`, JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandl)
      )
  }

  removeSkusVinculados(data, codigoAgrupamento: number): Observable<AgrupamentoModel> {
    return this.http.put<AgrupamentoModel>(`${environment.API}sku/excluirProdutosAgrupamento/${codigoAgrupamento}`, JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandl)
      )
  }


  getSkus(idAgrupamento: number, page: number): Observable<AgrupamentoModel> {
    return this.http.get<AgrupamentoModel>(`${environment.API}agrupamentos/buscar-agrupamento-produtos/${idAgrupamento}?page=${page}&size=50`).pipe(
      map(response => {
        const data = response;
        return data;
      }));
  }

  cadastrarAgrupamento(data): Observable<AgrupamentoModel> {
    return this.http.post<AgrupamentoModel>(environment.API + 'agrupamentos/', JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandl)
      )
  }

  editarAgrupamento(data): Observable<AgrupamentoModel> {
    return this.http.put<AgrupamentoModel>(environment.API + 'agrupamentos/' + data.codigo, JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandl)
      )
  }

  getAgrupamentoCabecalho(id): Observable<AgrupamentoModel> {
    return this.http.get<AgrupamentoModel>(environment.API + 'agrupamentos/buscar-agrupamento-cabecalho/' + id).pipe()
  }

  getAgrupamentosCorrelatos(id: number): Observable<AgrupamentoModel> {
    return this.http.get<AgrupamentoModel>(environment.API + 'agrupamentos/' + id + '/agrupamentos-correlatos').pipe()
  }

  getMessagemDelecao(id: number): Observable<AgrupamentoModel> {
    return this.http.get<AgrupamentoModel>(`${environment.API}agrupamentos/mensagemExclusaoAgrupamento/${id}`).pipe()
  }

  skuCheckAll(data: any[], idAgrupamento: number): Observable<any> {
    return this.http.post<any>(`${environment.API}agrupamentos/${idAgrupamento}/skus`, JSON.stringify(data), this.httpOptions).pipe();
  }

  skuCheckUnico(data: any[], idAgrupamento, idProduto): Observable<any> {
    return this.http.patch<any>(`${environment.API}agrupamentos/${idAgrupamento}/skus/${idProduto}`, JSON.stringify(data), this.httpOptions).pipe();
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
