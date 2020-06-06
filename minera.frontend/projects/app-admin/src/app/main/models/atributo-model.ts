import { RespostaModel } from './resposta-model';
import { BaseModel } from "./base-model";
import { AgrupamentoModel } from './agrupamento-model';

export class AtributoModel {
    id: number;
    nome: [];
    nomeAgrupamento: string;
    conceito: string;
    prioritario: boolean;
    pergunta: string;
    respostas: RespostaModel[];
    code: any;
    ativo;
    sugerido;
    agrupamentosCorrelatos;
    activesSku;
    atributos;

    data;

    /**
* Constructor
*
* @param atributoModel
*/
    constructor(atributoModel?) {
        atributoModel = atributoModel || {};
        this.id = atributoModel.id || 0;
        this.nome = atributoModel.nome || '';
        this.respostas = atributoModel.Respostas || new Array<RespostaModel>();
    }
}