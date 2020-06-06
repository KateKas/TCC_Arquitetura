
export class UsuarioModel {
    id: number;
    nome: string;
    papel: string;
    userName: string;
    passWord: string;
    token: string;

    /**
* Constructor
*
* @param usuarioModel
*/
    constructor(usuarioModel?) {
        usuarioModel = usuarioModel || {};
    }
}

