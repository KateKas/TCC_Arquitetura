import { CidadeModel } from "./cidade-model";
import { BaseModel } from "./base-model";

export interface MotociclistaModel extends BaseModel {
    id: number;
    nome?: string;
    bairro: string;
    categoriaCnhEnum: string;
    celular: string;
    cep: string;
    cidade: CidadeModel;
    numeroCnh: string;
    cpf: string;
    dataAdesao: Date;
    dataExpiracaoLicenca: Date;
    dataNascimento: Date;
    email: string;
    endereco: string;
    estadoCivil: string;
    nacionalidade: string;
    naturalidade: string;
    nomeConjuge: string;
    nomeMae: string;
    nomePai: string;
    numeroInscricaoInss: string;
    numeroLicenca: string;
    numeroMatricula: string;
    ativo: boolean;
    rg: string;
    telefone: string;
    veiculo: any;
    urlFotoMotociclista: string;
    urlFotoCnh: string;
    urlFotoLicenca: string;
    urlFotoInscricaoInss: string;
    urlFotoDocumentoVeiculo: string;
    aprovacaoMotociclista: string;
}
