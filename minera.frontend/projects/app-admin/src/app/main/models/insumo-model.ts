export class InsumoModel {
    id: number;
    nome: string;
    descricao: string;
    status: number;
    dataAquisicao: Date;
    dataProximaManutencao: Date;
    dataUltimaManutencao: Date

    /**
* Constructor
*
* @param insumoModel
*/
    constructor(insumoModel?) {
        insumoModel = insumoModel || {};
    }
}