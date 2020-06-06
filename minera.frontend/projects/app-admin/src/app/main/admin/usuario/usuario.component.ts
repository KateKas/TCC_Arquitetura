import { UsuarioModel } from './../../models/usuario-model';
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { FuseConfirmDialogComponent } from "../../../../@fuse/components/confirm-dialog/confirm-dialog.component";
import { UsuarioService } from "../../services/usuario.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Component({
    selector: "app-usuario",
    templateUrl: "./usuario.component.html",
    styleUrls: ["./usuario.component.scss"]
})
export class UsuarioComponent implements OnInit {
    list: UsuarioModel[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dialogRef: any;
  noResult: boolean = true;
  myObj: any[] = [];
  paginationParams: any;
  length: number;
  displayedColumns: string[] = [
    "id",
    "nome",
    "papel",
    "buttons"
  ];
  dataSource;

  constructor(
    public matDialog: MatDialog,
    private router: Router,
    private usuarioService: UsuarioService,
    private _snackBar: MatSnackBar,
    private _matDialog: MatDialog,

  ) { }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe((response) => {
      this.myObj = response;
      this.dataSource = new MatTableDataSource(this.myObj);
      this.dataSource.paginator = this.paginator;
      this.myObj.length > 0 ? this.noResult = false : this.noResult = true
    })
  }

  limparFiltro() {
    this.getUsuarios();
  }

  edit(_item) {
    this.router.navigate(["/agrupamento/editar", _item]);
  }

//   removeAgrupamento(id) {
//     this.dialogRef = this._matDialog.open(DeleteAgrupamentoComponent, {
//       panelClass: 'delete-agrupamento-contact-form-dialog',
//       data: id
//     });

//     this.dialogRef.afterClosed()
//       .subscribe((response) => {
//         this.getAgrupamentos();
//         if (!response) {
//           return;
//         }
//       });
//   }
}
