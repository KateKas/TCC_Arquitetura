import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AgrupamentoModel } from '../../../../models/agrupamento-model';
import { AgrupamentosCorrelatosService } from '../../../../services/agrupamentos-correlatos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-agrupamentos-correlatos-dialog',
  templateUrl: './delete-agrupamentos-correlatos-dialog.component.html',
  styleUrls: ['./delete-agrupamentos-correlatos-dialog.component.scss']
})
export class DeleteAgrupamentosCorrelatosDialogComponent implements OnInit {
  dialogTitle: string;
  agrupamento;
  agrupamentoAtual;
  responsePut: boolean;
  loading = false;
  /**
* Constructor
*
* @param {MatDialogRef<AgrupamentoCorrelatosDialogComponent>} matDialogRef
* @param _data
*/

  constructor(
    public matDialogRef: MatDialogRef<AgrupamentoModel>,
    private agrupamentosCorrelatosService: AgrupamentosCorrelatosService,
    private router: Router,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private _data: any, ) {
    this.agrupamento = _data.agrupamento;
    this.agrupamentoAtual = _data.agrupamentoAtual;
    this.responsePut = false;
  }

  ngOnInit() {
  }

  remove(codigoAgrupamento) {
    this.loading = true;
    this.agrupamentosCorrelatosService.remove(codigoAgrupamento).subscribe((response) => {
      if (response.code === 200) {
        this.responsePut = true;
        this.matDialogRef.close();
        this._snackBar.open('Agrupamento correlato removido com sucesso!', '', { duration: 3000 });
      }
    });
  }
}

