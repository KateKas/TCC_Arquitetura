import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AgrupamentoService } from '../../../../services/agrupamento.service';
import { SkusModel } from '../../../../models/sku-model';

@Component({
  selector: 'app-edit-respostas-sku-dialog',
  templateUrl: './edit-respostas-sku-dialog.component.html',
  styleUrls: ['./edit-respostas-sku-dialog.component.scss']
})
export class EditRespostasSkuDialogComponent implements OnInit {

  dialogTitle: string;
  loading = false;
  atributosRespostas: any[];
  respostasSelecionadas = [];
  descricaoProduto: string;
  body: SkusModel[];
  produtoCodigo: any[];
  codigosAtributosRespostasSelecionadas: any[] = [];
  respostas: SkusModel[];
  constructor(
    private _snackBar: MatSnackBar,
    private agrupamentoService: AgrupamentoService,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    public matDialogRef: MatDialogRef<any>,

  ) { }

  ngOnInit() {
    this.getAtributosRespostas();
    this.getRespostasSelecionadas();
    this.descricaoProduto = this._data.produto.descricao;
    this.body = this._data.body
    this.produtoCodigo = this._data.produto.codigo;
    this.getRespostasSelecionadas();
  }



  getAtributosRespostas() {
    this.agrupamentoService.getAtributosRespostas(this._data.codigoAgrupamento).subscribe((response) => {
      this.atributosRespostas = response.data;
    });
  }

  mudaLabel(atributo) {
    atributo.nomeRespostaSelecionada = atributo.nome;
  }

  getRespostasSelecionadas() {
    this.agrupamentoService.getRespostasSelecionadas(this._data.codigoAgrupamento, this._data.produto.codigo).subscribe((response) => {
      this.respostasSelecionadas = response.data.associacaoRespostaAtributo;
      this.respostasSelecionadas.forEach(resposta => {
        const respostaIdx = this.codigosAtributosRespostasSelecionadas.findIndex(resp => resp.codigoAtributo === resposta.codigoAtributo);
        const atributosRespostasIdx = this.atributosRespostas.findIndex(atr => atr.codigoAtributo === resposta.codigoAtributo);
        if (respostaIdx !== -1) {
          this.codigosAtributosRespostasSelecionadas[respostaIdx] = { codigoAtributo: resposta.codigoAtributo, codigoResposta: resposta.codigo };
          // this.atributosRespostas[respostaIdx].nomeRespostaSelecionada = resposta.nomeResposta;
          return;
        }
        this.codigosAtributosRespostasSelecionadas.push({ codigoAtributo: resposta.codigoAtributo, codigoResposta: resposta.codigo });
        this.atributosRespostas[atributosRespostasIdx].nomeRespostaSelecionada = resposta.nomeResposta;
      });
    });
  }

  addRespostaAtributo(resposta) {
    const respostaIdx = this.codigosAtributosRespostasSelecionadas.findIndex(resp => resp.codigoAtributo === resposta.codigoAtributo);
    if (respostaIdx !== -1) {
      this.codigosAtributosRespostasSelecionadas[respostaIdx] = { codigoAtributo: resposta.codigoAtributo, codigoResposta: resposta.codigo };
      return;
    }
    this.codigosAtributosRespostasSelecionadas.push({ codigoAtributo: resposta.codigoAtributo, codigoResposta: resposta.codigo })
  }

  confirm() {
    this._data.body.filtroAtributoCadastrado = this.codigosAtributosRespostasSelecionadas;
    if (this.codigosAtributosRespostasSelecionadas.length > 0) {
      this.agrupamentoService.skuCheckUnico(this.body, this._data.codigoAgrupamento, this.produtoCodigo).subscribe((response) => {
        if (response.code === 200) {
          this.matDialogRef.close();
          this._snackBar.open('As respostas para os atributos do produto foram editadas com sucesso', '', { duration: 1000 });
        }
      });
    } else {
      this._snackBar.open('Para efetuar a edição, selecione ao menos uma resposta para um atributo', '', { duration: 1000 });
    }
  }

}
