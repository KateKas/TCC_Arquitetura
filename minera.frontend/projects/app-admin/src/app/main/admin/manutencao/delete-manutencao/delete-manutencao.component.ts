import { ManutencaoModel } from './../../../models/manutencao-model';
import { InsumoService } from './../../../services/insumo.service';
import { InsumoModel } from './../../../models/insumo-model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-delete-manutencao',
  templateUrl: './delete-manutencao.component.html',
  styleUrls: ['./delete-manutencao.component.scss']
})
export class DeleteManutencaoComponent implements OnInit {

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
    public matDialogRef: MatDialogRef<ManutencaoModel>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private insumoService: InsumoService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getMensagem();
  }

  getMensagem() {
      this.mensagem = "Deseja excluir essa Manutenção ?";
  }

  remove() {
    this.insumoService.excluirInsumo(this._data).subscribe((response) => {
        this._snackBar.open('Insumo excluido com sucesso!', '', { duration: 3000 });
        this.matDialogRef.close();
    })
  }
}
