import { AgrupamentoModel } from './agrupamento-model';
import { BaseModel } from "./base-model";

export class AgrupamentoSkuModel {
    id: number;
    cod_produto: number;
    agrupamento: AgrupamentoModel;

    /**
* Constructor
*
* @param agrupamentoSkuModel
*/
    constructor(agrupamentoSkuModel?) {
        agrupamentoSkuModel = agrupamentoSkuModel || {};
        this.id = agrupamentoSkuModel.id || 0;
        this.cod_produto = agrupamentoSkuModel.cod_produto || 0;
        this.agrupamento = agrupamentoSkuModel.agrupamento || new AgrupamentoModel();
    }
}