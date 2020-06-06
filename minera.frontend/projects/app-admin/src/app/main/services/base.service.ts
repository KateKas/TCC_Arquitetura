import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

export abstract class BaseService {
    protected actionUrl: string;
    protected configuration: Configuration;

    constructor(protected http: HttpClient, endpointName: string) {
        this.actionUrl =
            new Configuration().serverWithApiUrl + `${endpointName}/`;
    }

    protected getRequestUrl(): string {
        return this.actionUrl;
    }

    protected getHttpHeaders(): any {
        return {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        };
    }
}

@Injectable()
export class Configuration {
    //public server = "http://docker7.frwk.com.br:8080/";
    //public server = 'http://192.168.230.120:8089/'; //Maquina do Matheus
    //public server = 'http://192.168.230.102:8089/';
    //public server = "http://192.168.230.85:8089/"; //Maquina do Raíssa
    //public server = "http://192.168.230.90:8089/"; //Maquina do Bárbara
    //public server = "http://192.168.0.45:8089/"; //Maquina do Maduro
    //public server = "http://192.168.230.11:8089/"; //Maquina do Guilherme
    //public server = "https://api.flyadam.com.br/";
    //public server = "http://54.160.246.59:8089/";
    //public server = "http://192.168.230.89:8089/";
    public server = "http://api.conexaodelivery.com.br:8089/";
    public apiUrl = "";
    public serverWithApiUrl = this.server + this.apiUrl;
}
