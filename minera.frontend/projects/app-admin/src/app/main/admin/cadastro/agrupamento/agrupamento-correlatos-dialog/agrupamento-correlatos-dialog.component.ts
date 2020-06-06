import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AgrupamentoModel } from './../../../../models/agrupamento-model';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from './../../../../../../@fuse/animations/index';
import { Component, OnInit } from '@angular/core';
import { AgrupamentosCorrelatosService } from '../../../../services/agrupamentos-correlatos.service';
import { AgrupamentosCorrelatosModel } from '../../../../models/agrupamentos-correlatos-model';
import { Router, ActivatedRoute } from "@angular/router";
import { AgrupamentoService } from '../../../../services/agrupamento.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-agrupamento-correlatos-dialog',
  templateUrl: './agrupamento-correlatos-dialog.component.html',
  styleUrls: ['./agrupamento-correlatos-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AgrupamentoCorrelatosDialogComponent implements OnInit {

  agrupamentoId: number;
  noResult: boolean = false;
  list: any;
  _matDialog: any;
  paginationParams: any;
  length: number;
  action: string;
  formGroup: FormGroup;
  dialogTitle: string;
  responsePut: any;

  agrupamentosList: any = []
  agrupamentoData: any;
  selectable = true;
  removable = true;
  addOnBlur = true;
  agrupamento = '';
  loading = false;


  displayedColumns: string[] = ["checkbox", "nomeAgrupamento", "sugerido"];
  dataSourceAgrupamentos;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  /**
* Constructor
*
* @param {MatDialogRef<AgrupamentoCorrelatosDialogComponent>} matDialogRef
* @param _data
* @param {FormBuilder} _formBuilder
*/

  constructor(
    public matDialogRef: MatDialogRef<AgrupamentoCorrelatosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private agrupamentosCorrelatosService: AgrupamentosCorrelatosService,
    private agrupamentoService: AgrupamentoService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.action = _data.action;
    this.agrupamentoId = _data.agrupamentoId;
    this.agrupamentoData = _data
    this.dialogTitle = 'Novo Agrupamento';
    this.dialogTitle = 'Agrupamentos Correlatos';
    this.responsePut = [];
  }

  ngOnInit() {
    this.getCorrelatos(this.agrupamentoId);
  }

  /**
 * Create Agrupamentos Correlatos 
 *
 * @returns {FormGroup}
 */


  getCorrelatos(id?) {
    this.agrupamentosCorrelatosService.getAgrupamentoCorrelatos(id).subscribe((response) => {
      this.dataSourceAgrupamentos = new MatTableDataSource(response.data);
      this.dataSourceAgrupamentos.paginator = this.paginator;
      response.data.length > 0 ? this.noResult = false : this.noResult = true;
    });
  }

  insertAgrupamento(agrupamento) {
    if (this.agrupamentosList.indexOf(agrupamento) === -1) {
      this.agrupamentosList.push(agrupamento);
    } else {
      this.agrupamentosList.splice(this.agrupamentosList.indexOf(agrupamento), 1);
    }
  }

  filtrarAgrupamento() {
    const removeEspaco = this.agrupamento.trim();
    if (removeEspaco.length > 0) {
      this.agrupamentosCorrelatosService.filtrarAgrupamentos(this.agrupamentoId, this.agrupamento).subscribe((response) => {
        this.dataSourceAgrupamentos = new MatTableDataSource(response.data);
        this.dataSourceAgrupamentos.paginator = this.paginator;
        response.data.length > 0 ? this.noResult = false : this.noResult = true;
      });
    } else {
      this._snackBar.open('Preencha o campo para efetuar a busca!', '', { duration: 3000 });
    }
  }

  limparFiltro() {
    this.agrupamento = '';
    this.getCorrelatos(this.agrupamentoId);
  }

  saveAgrupamento() {
    this.loading = true;
    this.agrupamentosList = [...this.agrupamentosList, ...this.agrupamentoData.agrupamentosCorrelatos]
    const body = {
      codigo: this.agrupamentoId ? this.agrupamentoId : 0,
      nome: this.agrupamentoData.nomeAgrupamento,
      ativo: this.agrupamentoData.ativo ? this.agrupamentoData.ativo : true,
      sugerido: this.agrupamentoData.sugerido ? this.agrupamentoData.sugerido : false,
      atributos: this.agrupamentoData.atributos.length > 0 ? this.agrupamentoData.atributos : [{ codigoAgrupamento: 0, codigoAtributo: 0, conceito: '', nome: '', pergunta: '', prioridade: 0 }],
      agrupamentosCorrelatos: this.agrupamentosList ? this.agrupamentosList : [],
      produtos: this.agrupamentoData.produtos ? this.agrupamentoData.produtos : []
    }

    this.agrupamentoService.editarAgrupamento(body).subscribe((response) => {
      if (response.code === 200) {
        this.matDialogRef.close();
        this.responsePut = response.data;
        this._snackBar.open('Agrupamento(s) Correlacionado(s) com sucesso!', '', { duration: 3000 });
      }
    });

  }
}
