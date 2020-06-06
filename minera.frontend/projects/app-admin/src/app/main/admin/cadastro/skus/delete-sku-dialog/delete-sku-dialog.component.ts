import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { AgrupamentoService } from '../../../../services/agrupamento.service';
import { SkusModel } from '../../../../models/sku-model';

@Component({
  selector: 'app-delete-sku-dialog',
  templateUrl: './delete-sku-dialog.component.html',
  styleUrls: ['./delete-sku-dialog.component.scss']
})
export class DeleteSkuDialogComponent implements OnInit {

  dialogTitle: string;
  atributo;
  agrupamentoAtual;
  responseDelete: boolean;
  loading = false;
  message = 'Deseja realmente desassociar todos os SKUS?'
  /**
  * Constructor
  *
  * @param {MatDialogRef<AtributoFormDialogComponent>} matDialogRef
  * @param _data
  * @param {FormBuilder} _formBuilder
  */

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private agrupamentoService: AgrupamentoService,
    private _snackBar: MatSnackBar,
    public matDialogRef: MatDialogRef<SkusModel>,
  ) { }

  ngOnInit() {
    if (this._data.length === 1) {
      this.message = 'Deseja realmente desassociar este(s) SKU(S)?'
      return
    }
  }

  remove() {
    this.loading = true;
    this.agrupamentoService.removeSkusVinculados(this._data.skus, this._data.codigoAgrupamento).subscribe((response) => {
      if (response.code === 200) {
        this.matDialogRef.close();
        this._snackBar.open('Produto(s) desassociado(s) com sucesso!', '', { duration: 3000 });
      }
    });
  }

}
