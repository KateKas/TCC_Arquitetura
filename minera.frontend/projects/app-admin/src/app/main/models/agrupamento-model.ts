import { SkusModel } from './sku-model';

export class AgrupamentoModel {
    codigo: number;
    nome: string;
    ativo: boolean;
    sugerido: boolean;
    data: any;
    code: number;
    status: any;
    message: string;
    produtos: SkusModel[]

    /**
 * Constructor
 *
 * @param agrupamentoModel
 */
    constructor(agrupamentoModel?) {
        agrupamentoModel = agrupamentoModel || {};
        // this.codigo = agrupamentoModel.id || 0;
        // this.nome = agrupamentoModel.nome || '';
        // this.ativo = agrupamentoModel.ativo || false;
        // this.sugerido = agrupamentoModel.sugerido || false;
    }
}