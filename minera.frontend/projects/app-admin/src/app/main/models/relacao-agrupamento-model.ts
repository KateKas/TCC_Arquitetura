import { AgrupamentoModel } from './agrupamento-model';
import { BaseModel } from "./base-model";

export interface RelacaoAgrupamentoModel extends BaseModel {
    id: number,
    agrupamento_1: AgrupamentoModel,
    agrupamento_2: AgrupamentoModel,
}