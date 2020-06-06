import { EmpresaModel } from "./../models/empresa-model";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BaseRestService } from "./base-rest.service";
import { Observable } from "rxjs";
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
    providedIn: "root"
})
export class EmpresaService extends BaseRestService<EmpresaModel> {
    constructor(public http: HttpClient) {
        super(http, "empresa");
    }

    public aprovarCompra(id) {
        return this.http.post(this.actionUrl + "aprovar/" + id, null);
    }

    public confirmarVoo(id) {
        return this.http.post(this.actionUrl + "confirmar/" + id, null);
    }

    public finalizar(id) {
        return this.http.post(this.actionUrl + "finalizar/" + id, null);
    }

    uploadLogo(id, formData): Observable<any> {
        let logo: FormData = new FormData();
        logo.append("logo", formData);
        return this.http.post(this.getRequestUrl() + "upload-logo/" + id, logo);
    }

    public locationsBySupllier(id):  Observable<any>{
        let options = this.getHttpHeaders();
        return this.http.get(this.actionUrl + 'users-locations/' + id, options);
    }

    public suppliers(): Observable<any>{
        let options = this.getHttpHeaders();
        return this.http.get(this.actionUrl, options);
    }
}
