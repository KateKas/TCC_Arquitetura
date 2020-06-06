import { BaseModel } from "./base-model";

export interface BarragemModel extends BaseModel {
    id: number;
    codigo: string;
    razaoSocial: string;
    cnpj: string;
    telefoneCentral: string;
    endereco: string;
    numeroEndereco: string;
    bairro: string;
    estado: string;
    cep: string;
    telefone: string;
    nomeContato: string;
    email: string;
    status: any;
    urlLogomarca: string;
}
