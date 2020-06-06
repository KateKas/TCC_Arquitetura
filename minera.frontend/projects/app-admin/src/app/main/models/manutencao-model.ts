export class ManutencaoModel {
    id: number;
    tipo: number;
    descricao: string;
    data: Date;
    status: number;

    /**
* Constructor
*
* @param manutencaoModel
*/
    constructor(manutencaoModel?) {
        manutencaoModel = manutencaoModel || {};
    }
}