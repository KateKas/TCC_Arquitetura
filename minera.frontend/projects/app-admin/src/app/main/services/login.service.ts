import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FuseNavigationService } from '../../../@fuse/components/navigation/navigation.service';
import { Observable, BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
import { LoginModel } from '../models/login-model';
import { environment } from '../../../environments/environment.hmr';



@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {

  navigation: string;
  userType: BehaviorSubject<any> = new BehaviorSubject('')


  constructor(public http: HttpClient, private _fuseNavigationService: FuseNavigationService) {
    super(http, "usuario");
  }
  user: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  login(data): Observable<LoginModel> {
    return this.http.post<LoginModel>(environment.API + 'usuario/authenticate/', JSON.stringify(data), this.httpOptions)
    .pipe(
      )
  }

  public getUsuario() {
    return this.http.get(this.actionUrl + "me");
  }

  public logout() {
    localStorage.clear();
  }

  public setToken(token) {
    localStorage.setItem('token', token);
    console.log(localStorage.getItem('token'));
  }


  public getToken() {
    return localStorage.getItem('token');
  }

  public setUser(user) {
    localStorage.setItem('usuario', user.usuario);
    // localStorage.setItem('tipoUsuario', user.tipoUsuario);
    // this.userType.next(user.tipoUsuario);
  }

  public getUserName() {
    return localStorage.getItem('usuario');
  }

  public getTipoUsuario() {
    return localStorage.getItem('tipoUsuario');
  }


}