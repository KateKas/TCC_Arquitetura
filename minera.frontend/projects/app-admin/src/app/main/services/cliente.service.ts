import { Observable } from "rxjs";
import { ClienteEnumModel } from "./../models/enum/cliente-enum-model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseRestService } from "./base-rest.service";
import { ClienteModel } from "../models/cliente-model";

@Injectable({
    providedIn: "root"
})
export class ClienteService extends BaseRestService<ClienteModel> {
    constructor(public http: HttpClient) {
        super(http, "cliente");
    }

    getCliente(): Observable<any> {
        return this.http.get<ClienteEnumModel[]>(
            this.actionUrl + "list-clientes-ordenado"
        );
    }
}
