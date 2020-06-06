import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { AgrupamentoModel } from '../../../../models/agrupamento-model';
import { AgrupamentoService } from '../../../../services/agrupamento.service';

@Component({
  selector: 'app-delete-agrupamento',
  templateUrl: './delete-agrupamento.component.html',
  styleUrls: ['./delete-agrupamento.component.scss']
})
export class DeleteAgrupamentoComponent implements OnInit {

  _matDialog: any;
  dialogTitle: string;
  loading = false;
  mensagem: string;
  /**
* Constructor
*
* @param {MatDialogRef<AgrupamentoCorrelatosDialogComponent>} matDialogRef
* @param _data
*/


  constructor(
    public matDialogRef: MatDialogRef<AgrupamentoModel>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private agrupamentosService: AgrupamentoService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getMensagem();
  }

  getMensagem() {
    this.agrupamentosService.getMessagemDelecao(this._data).subscribe((response) => {
      this.mensagem = response.data;
    });
  }

  remove() {
    this.agrupamentosService.removeAgrupamento(this._data).subscribe((response) => {
      if (response.code === 200) {
        this._snackBar.open('Agrupamento excluido com sucesso!', '', { duration: 3000 });
        this.matDialogRef.close();
      }
    })
  }

}
