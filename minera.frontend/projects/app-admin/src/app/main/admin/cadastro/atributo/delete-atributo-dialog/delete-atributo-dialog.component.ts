import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { AgrupamentoModel } from '../../../../models/agrupamento-model';
import { AtributoService } from '../../../../services/atributo.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-delete-atributo-dialog',
  templateUrl: './delete-atributo-dialog.component.html',
  styleUrls: ['./delete-atributo-dialog.component.scss']
})
export class DeleteAtributoDialogComponent implements OnInit {
  _matDialog: any;
  dialogTitle: string;
  atributo;
  agrupamentoAtual;
  responseDelete: boolean;
  loading = false;

  /**
  * Constructor
  *
  * @param {MatDialogRef<AgrupamentoCorrelatosDialogComponent>} matDialogRef
  * @param _data
  */

  constructor(
    public matDialogRef: MatDialogRef<AgrupamentoModel>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private atributoService: AtributoService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.atributo = _data.atributo;
    this.agrupamentoAtual = _data.agrupamentoAtual;
    this.responseDelete = false;
  }

  ngOnInit() {
    this.dialogTitle = this.atributo.nome;
  }

  remove(codigoAtributo) {
    this.loading = true;
    this.atributoService.remove(codigoAtributo).subscribe((response) => {
      if (response.code === 200) {
        this.matDialogRef.close();
        this.responseDelete = true;
        this._snackBar.open('Atributo removido com sucesso!', '', { duration: 3000 });
      }
    });
  }

}
