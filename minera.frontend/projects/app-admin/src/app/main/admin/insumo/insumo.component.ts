import { DeleteInsumoComponent } from './delete-insumo/delete-insumo.component';
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
  selector: 'app-insumo',
  templateUrl: './insumo.component.html',
  styleUrls: ['./insumo.component.scss']
})
export class InsumoComponent implements OnInit {
  list: InsumoModel[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dialogRef: any;
  noResult: boolean = true;
  myObj: any[] = [];
  paginationParams: any;
  length: number;
  displayedColumns: string[] = [
    "id",
    "nome",
    "descricao",
    "status",
    "dataAquisicao",
    "dataProximaManutencao",
    "dataUltimaManutencao",
    "buttons"
  ];
  dataSource;

  constructor(
    public matDialog: MatDialog,
    private router: Router,
    private insumoService: InsumoService,
    private _snackBar: MatSnackBar,
    private _matDialog: MatDialog,

  ) { }

  ngOnInit() {
    this.getInsumos();
  }

  getInsumos() {
    this.insumoService.getInsumos().subscribe((response) => {
      this.myObj = response;
      this.dataSource = new MatTableDataSource(this.myObj);
      this.dataSource.paginator = this.paginator;
      this.myObj.length > 0 ? this.noResult = false : this.noResult = true
    })
  }

  edit(_item) {
    this.router.navigate(["/insumo/editar", _item]);
  }

  removeInsumo(id) {
    this.dialogRef = this._matDialog.open(DeleteInsumoComponent, {
      panelClass: 'delete-agrupamento-contact-form-dialog',
      data: id
    });

    this.dialogRef.afterClosed()
      .subscribe((response) => {
        this.getInsumos();
        if (!response) {
          return;
        }
      });
  }

}
