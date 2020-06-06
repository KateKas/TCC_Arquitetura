import { AtributoService } from './../../../../services/atributo.service';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from './../../../../../../@fuse/animations/index';
import { FuseUtils } from './../../../../../../@fuse/utils/index';
import { RelacaoAgrupamentoService } from './../../../../services/relacao-agrupamento.service';
import { AgrupamentoSkuModel } from './../../../../models/agrupamento-sku-model';
import { RespostaModel } from './../../../../models/resposta-model';
import { RelacaoAgrupamentoModel } from './../../../../models/relacao-agrupamento-model';
import { AtributoModel } from './../../../../models/atributo-model';
import { AgrupamentoAtributoModel } from './../../../../models/agrupamento-atributo-model';
import { BaseComponent } from './../../../../../util/base-component';
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { take } from "rxjs/operators";
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-atributo-form',
  templateUrl: './atributo-form.component.html',
  styleUrls: ['./atributo-form.component.scss'],
  animations: fuseAnimations
})
export class AtributoFormComponent extends BaseComponent implements OnInit {
  displayedColumns = ['checkbox', 'nomeAtributo', 'conceitoAtributo'];

  contacts: any;
  dataSource: MatTableDataSource<AgrupamentoAtributoModel>;
  public atributo: AtributoModel;
  public relacao_atributos: AgrupamentoAtributoModel[];
  public relacao_agrupamento: RelacaoAgrupamentoModel[];
  public relacao_agrupamento_skus: AgrupamentoSkuModel[];
  public form = new FormGroup({
    // id: new FormControl(),
    nomeAtributo: new FormControl("", [
      Validators.required,
      Validators.maxLength(60)
    ]),
  });

  constructor(
    private route: ActivatedRoute,
    private routerLink: Router,
    private _snackBar: MatSnackBar,
    private atributoService: AtributoService,
    private relacaoAgrupamentoService: RelacaoAgrupamentoService,

  ) {
    super();
  }

  ngOnInit() {
  }

  saveAtributo() {
    const body = {
      codigo: 0,
      codigoAgrupamento: 0,
      codigoAtributo: 0,
      nome: this.form.get('nomeAtributo').value,
      conceito: '',
      pergunta: '',
      prioridade: 0,
      respostas: []
    }

    this.atributoService.saveAtributo(body).subscribe((response) => {
      this.routerLink.navigate(["/atributo/"]);
      if (response.code === 200) {
        this._snackBar.open('Atributo criado com sucesso!', '', { duration: 3000 });
      }
    });
  }

}
