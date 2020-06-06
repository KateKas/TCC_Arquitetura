import { RespostaModel } from './../../../../models/resposta-model';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { fuseAnimations } from './../../../../../../@fuse/animations/index';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AtributoService } from './../../../../services/atributo.service';
import { AtributoModel } from './../../../../models/atributo-model';
import { Router, ActivatedRoute } from "@angular/router";
import { AgrupamentoService } from '../../../../services/agrupamento.service';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/operators';
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import * as _ from 'lodash';




@Component({
  selector: 'app-atributo-form-dialog',
  templateUrl: './atributo-form-dialog.component.html',
  styleUrls: ['./atributo-form-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AtributoFormDialogComponent implements OnInit {
  action: string;
  atributo: AtributoModel;
  formGroup: FormGroup;
  respostas: RespostaModel[];
  resposta: RespostaModel;
  listRespostas: any = [];
  dialogTitle: string;
  atributos: any;

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  agrupamentoDetailId;
  atributoPost: any[];
  agrupamentoData: any;
  atributosFiltrados: Observable<any[]>;
  atributoSelecionado: any;
  readonly = false;
  loading = false;
  edicao = false;
  respostaEdicao = '';
  atributoEdit: any = [];
  atributoAtualizado: any;
  displayedColumns: string[] = ['nome', 'buttons'];
  dataSource;
  respostaFocus: any;

  /**
 * Constructor
 *
 * @param {MatDialogRef<AtributoFormDialogComponent>} matDialogRef
 * @param _data
 * @param {FormBuilder} _formBuilder
 */

  constructor(
    public matDialogRef: MatDialogRef<AtributoFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private atributoService: AtributoService,
    private route: ActivatedRoute,
    private router: Router,
    private agrupamentoService: AgrupamentoService,
    private _snackBar: MatSnackBar,

  ) {
    // Set the defaults
    this.action = _data.action;
    this.agrupamentoData = _data;
    this.respostas = new Array<RespostaModel>();

    if (this.action === 'edit') {
      this.dialogTitle = 'Editar Atributo';
      this.atributo = _data.atributo;
      this.dataSource = new MatTableDataSource(this.atributo.respostas);
      this.listRespostas = this.atributo.respostas;
    }
    else {
      this.dialogTitle = 'Novo Atributo';
      this.dialogTitle = 'Atributo';
      this.atributo = new AtributoModel();
      this.agrupamentoData;
    }

    this.formGroup = this.createAtributeForm();
    this.agrupamentoDetailId = this.route.snapshot.params.id;

  }

  ngOnInit() {
    this.createAtributeForm();
    this.getAtributos();
    this.atributoEdit = this.agrupamentoData.atributos;
    setTimeout(() => {
      if (this.atributos) {
        this.atributosFiltrados = this.formGroup.get("nome").valueChanges
          .pipe(
            startWith(''),
            map(atributo => atributo ? this.filtraAtributos(atributo) : this.atributos.slice())
          );
      }
    }, 1000);
  }

  filtraAtributos(nome: string) {
    return this.atributos.filter(atributo =>
      atributo.nome.toLowerCase().indexOf(nome.toLowerCase()) === 0);
  }


  /**
   * Create contact form
   *
   * @returns {FormGroup}
   */
  createAtributeForm(): FormGroup {
    return this._formBuilder.group({
      id: this.atributo.id,
      nome: [this.atributo.nome],
      conceito: [this.atributo.conceito, [Validators.required]],
      pergunta: [this.atributo.pergunta, [Validators.required]],
      resposta: ['', [Validators.required]],
      novaResposta: ['']
    });
  }


  getAtributos() {
    if (this.agrupamentoData.codigo === 0) {
      this.atributoService.getAtributos().subscribe((response) => {
        this.atributos = response.data;
      });
    } else {
      this.atributoService.getAtributosPorId(this.agrupamentoData.codigo).subscribe((response) => {
        this.atributos = response.data;
      });
    }
  }

  insereAtributo(data) {
    this.atributoSelecionado = data;
  }

  insereResposta() {
    let novaResposta = this.formGroup.get('novaResposta').value;
    if (novaResposta.trim().length > 0) {
      this.listRespostas.push({ nome: novaResposta });
      this.dataSource = new MatTableDataSource(this.listRespostas);
      this.formGroup.get('novaResposta').setValue('');
    } else {
      this._snackBar.open('Preencha o campo para inserir uma nova resposta', '', { duration: 3000 });
    }
  }

  editarRespostaNome(resposta) {
    const respostaIdx = this.atributo.respostas.findIndex(resp => resp.codigo === resposta.codigo);
    if (respostaIdx !== -1) {
      resposta.nome = this.formGroup.get('resposta').value;
    }
  }

  removeResposta(resposta) {
    const respostaIdx = this.listRespostas.findIndex(resp => resp.nome === resposta.nome);
    if (respostaIdx !== -1) {
      this.listRespostas.splice(respostaIdx, 1);
      this.dataSource = new MatTableDataSource(this.listRespostas);
      if (resposta.codigo) {
        this.atributoService.removeRespostas(this.agrupamentoData.codigo, resposta.codigo).subscribe((response) => {
          this._snackBar.open('Resposta excluida com sucesso!', '', { duration: 3000 });
        });
      }
    }
  }

  saveAtributo() {
    this.loading = true;
    if (this.action === 'edit') {
      this.edicao = true;
      const atributo = this.atributoSelecionado ? this.atributoSelecionado : this.agrupamentoData.atributo;
      const atributoIdx = this.agrupamentoData.atributos.findIndex(atributo => atributo.codigoAtributo === this._data.atributo.codigoAtributo);
      this.agrupamentoData.atributos[atributoIdx] = {
        codigoAtributo: atributo.codigoAtributo,
        codigoAssociacaoAtributoAgrupamento: atributo.codigoAssociacaoAtributoAgrupamento,
        codigoAgrupamento: this.agrupamentoData.codigo,
        nome: this.formGroup.get('nome').value,
        conceito: this.formGroup.get('conceito').value,
        pergunta: this.formGroup.get('pergunta').value,
        respostas: this.listRespostas ? this.listRespostas : [],
        prioridade: 0
      }
    }

    const atributo = this.atributoSelecionado ? this.atributoSelecionado : this.agrupamentoData.atributo;
    this.atributoPost = [{
      codigoAtributo: atributo ? atributo.codigoAtributo : 0,
      codigoAssociacaoAtributoAgrupamento: atributo ? atributo.codigoAssociacaoAtributoAgrupamento : 0,
      codigoAgrupamento: this.agrupamentoData.codigo ? this.agrupamentoData.codigo : 0,
      nome: atributo ? atributo.nome : this.formGroup.get('nome').value,
      conceito: this.formGroup.get('conceito').value ? this.formGroup.get('conceito').value : '',
      pergunta: this.formGroup.get('pergunta').value ? this.formGroup.get('pergunta').value : '',
      respostas: this.listRespostas ? this.listRespostas : [],
      prioridade: 0,
    }];
    const body = {
      codigo: this.agrupamentoData ? this.agrupamentoData.codigo : 0,
      nome: this.agrupamentoData.nomeAgrupamento ? this.agrupamentoData.nomeAgrupamento : '',
      ativo: this.agrupamentoData ? this.agrupamentoData.ativo : true,
      sugerido: this.agrupamentoData ? this.agrupamentoData.sugerido : false,
      atributos: this.edicao ? this.agrupamentoData.atributos : [...this.agrupamentoData.atributos, ...this.atributoPost],
      agrupamentosCorrelatos: this.agrupamentoData ? this.agrupamentoData.agrupamentosCorrelatos : [],
    }

    this.agrupamentoService.editarAgrupamento(body).subscribe((response) => {
      if (response.data !== null) {
        this._snackBar.open('Atributo Cadastrado com sucesso!', '', { duration: 3000 });
        setTimeout(() => {
          this.matDialogRef.close(['save']);
        }, 600);
      }
    });
  }

}
