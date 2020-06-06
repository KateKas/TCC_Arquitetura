import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { AgrupamentoService } from '../../../../services/agrupamento.service';
import { SkusModel } from '../../../../models/sku-model';

@Component({
  selector: 'app-confirm-insercao-sku-dialog',
  templateUrl: './confirm-insercao-sku-dialog.component.html',
  styleUrls: ['./confirm-insercao-sku-dialog.component.scss']
})
export class ConfirmInsercaoSkuDialogComponent implements OnInit {

  dialogTitle: string;
  atributo;
  agrupamentoAtual;
  responseDelete: boolean;
  loading = false;
  isSave = false;

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
    public matDialogRef: MatDialogRef<any>,
  ) { }

  ngOnInit() { }


  confirmar() {
    this.isSave = true;
    this.loading = true;
    this.agrupamentoService.skuCheckAll(this._data.body, +this._data.body.codigoAgrupamento).subscribe((response) => {
      if (response.code === 200) {
        this._snackBar.open('Todos os SKUS retornados na busca foram vinculados ao agrupamento', '', { duration: 3000 });
        this.matDialogRef.close(['save']);
      }
    })
  }

}
