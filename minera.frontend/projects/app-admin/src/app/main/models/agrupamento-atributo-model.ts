import { AtributoModel } from './atributo-model';
import { AgrupamentoSkuModel } from './agrupamento-sku-model';
import { BaseModel } from "./base-model";

export class AgrupamentoAtributoModel {
    id: number;
    agrupamento_produtos: AgrupamentoSkuModel;
    atributo: AtributoModel[];
    ordem: number;
    pergunta: string;
    descricao: string;

    /**
* Constructor
*
* @param agrupamentoAtributoModel
*/
    constructor(agrupamentoAtributoModel?) {
        agrupamentoAtributoModel = agrupamentoAtributoModel || {};
        this.id = agrupamentoAtributoModel.id || 0;
        this.agrupamento_produtos = agrupamentoAtributoModel.agrupamento_produtos || new AgrupamentoSkuModel();
        this.atributo = agrupamentoAtributoModel.atributo || new Array<AtributoModel>();
        this.ordem = agrupamentoAtributoModel.ordem || 0;
        this.pergunta = agrupamentoAtributoModel.pergunta || '';
        this.descricao = agrupamentoAtributoModel.descricao || '';
    }
}