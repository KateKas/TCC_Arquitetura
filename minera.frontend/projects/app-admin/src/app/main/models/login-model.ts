import { BaseModel } from './base-model';

export interface LoginModel extends BaseModel {
    id: number,
    nome: string;
    papel: string;
    password: string;
    token: string;
    username: string;
}
