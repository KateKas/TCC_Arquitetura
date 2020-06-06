import { ManutencaoService } from './../../services/manutencao-service';
import { DeleteManutencaoComponent } from './delete-manutencao/delete-manutencao.component';
import { InsumoService } from './../../services/insumo.service';
import { InsumoModel } from './../../models/insumo-model';
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "../../../../@fuse/components/confirm-dialog/confirm-dialog.component";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: 'app-manutencao',
  templateUrl: './manutencao.component.html',
  styleUrls: ['./manutencao.component.scss']
})
export class ManutencaoComponent implements OnInit {
  list: InsumoModel[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dialogRef: any;
  noResult: boolean = true;
  myObj: any[] = [];
  paginationParams: any;
  length: number;
  displayedColumns: string[] = [
    "id",
    "tipo",
    "data",
    "descricao",
    "status",
    "buttons"
  ];
  dataSource;

  constructor(
    public matDialog: MatDialog,
    private router: Router,
    private manutencaoService: ManutencaoService,
    private _snackBar: MatSnackBar,
    private _matDialog: MatDialog,

  ) { }

  ngOnInit() {
    this.getManutencao();
  }

  getManutencao() {
    this.manutencaoService.getManutencao().subscribe((response) => {
      this.myObj = response;
      this.dataSource = new MatTableDataSource(this.myObj);
      this.dataSource.paginator = this.paginator;
      this.myObj.length > 0 ? this.noResult = false : this.noResult = true
    })
  }

  edit(_item) {
    this.router.navigate(["/manutencao/editar", _item]);
  }

  removeInsumo(id) {
    this.dialogRef = this._matDialog.open(DeleteManutencaoComponent, {
      panelClass: 'delete-agrupamento-contact-form-dialog',
      data: id
    });

    this.dialogRef.afterClosed()
      .subscribe((response) => {
        this.getManutencao();
        if (!response) {
          return;
        }
      });
  }

}
