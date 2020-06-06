import { FuseUtils } from './../../../@fuse/utils/index';
import { AgrupamentoModel } from './agrupamento-model';
import { AtributoModel } from './atributo-model';
import { BaseModel } from "./base-model";
import { MatChipInputEvent } from '@angular/material/chips';


export class RespostaModel {
    id: number;
    codigo: number;
    nome: string;
    atributo: AtributoModel[];
    agrupamento: AgrupamentoModel;


    /**
* Constructor
*
* @param respostaModel
*/
    constructor(respostaModel?) {
        respostaModel = respostaModel || {};
        this.id = respostaModel.id || 0;
        this.nome = respostaModel.resposta || '';
        this.atributo = respostaModel.atributo || new Array<AtributoModel>();
        this.agrupamento = respostaModel.agrupamento || new AgrupamentoModel();
    }
}