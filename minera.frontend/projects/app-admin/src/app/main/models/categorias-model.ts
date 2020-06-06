export class CategoriasModel {
    constructor(public id: number, public nomeCategoria: string) { }

}

export interface Categorias {
    total: number, categorias: CategoriasModel[]
}
