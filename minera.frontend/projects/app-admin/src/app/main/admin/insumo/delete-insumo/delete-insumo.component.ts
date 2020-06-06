import { InsumoService } from './../../../services/insumo.service';
import { InsumoModel } from './../../../models/insumo-model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-delete-insumo',
  templateUrl: './delete-insumo.component.html',
  styleUrls: ['./delete-insumo.component.scss']
})
export class DeleteInsumoComponent implements OnInit {
  _matDialog: any;
  dialogTitle: string;
  loading = false;
  mensagem: string;
  /**
* Constructor
*
* @param _data
* @param {MatDialogRef<any>} matDialogRef
*/


  constructor(
    public matDialogRef: MatDialogRef<InsumoModel>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private insumoService: InsumoService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getMensagem();
  }

  getMensagem() {
      this.mensagem = "Deseja excluir esse Insumo ?";
  }

  remove() {
    this.insumoService.excluirInsumo(this._data).subscribe((response) => {
        this._snackBar.open('Insumo excluido com sucesso!', '', { duration: 3000 });
        this.matDialogRef.close();
    })
  }

}
