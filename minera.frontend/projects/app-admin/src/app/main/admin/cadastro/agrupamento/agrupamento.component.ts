import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import {
  MatTableDataSource,
  MatPaginator,
  MatSnackBar
} from "@angular/material";
import { AgrupamentoService } from '../../../services/agrupamento.service';
import { AgrupamentoModel } from './../../../models/agrupamento-model';
import { DeleteAgrupamentoComponent } from './delete-agrupamento/delete-agrupamento.component';


@Component({
  selector: 'app-agrupamento',
  templateUrl: './agrupamento.component.html',
  styleUrls: ['./agrupamento.component.scss']
})
export class AgrupamentoComponent implements OnInit {
  list: AgrupamentoModel[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dialogRef: any;
  noResult: boolean = true;
  myObj = [];
  paginationParams: any;
  agrupamentoDetail;
  agrupamento = '';
  length: number;
  displayedColumns: string[] = [
    "codigo",
    "nomeAgrupamento",
    "ativo",
    "sugerido",
    "produtosAssociados",
    "buttons"
  ];
  dataSource;

  constructor(
    public matDialog: MatDialog,
    private router: Router,
    private agrupamentoService: AgrupamentoService,
    private _snackBar: MatSnackBar,
    private _matDialog: MatDialog,

  ) { }



  ngOnInit() {
    this.getAgrupamentos();
  }

  getAgrupamentos() {
    this.agrupamentoService.getAgrupamento().subscribe((response) => {
      this.myObj = response.data;
      this.dataSource = new MatTableDataSource(this.myObj);
      this.dataSource.paginator = this.paginator;
      this.myObj.length > 0 ? this.noResult = false : this.noResult = true
    })
  }

  filtrarAgrupamento() {
    const removeEspaco = this.agrupamento.trim();
    if (removeEspaco.length > 0) {
      this.agrupamentoService.filtrarAgrupamento(this.agrupamento).subscribe((response) => {
        this.myObj = response.data;
        this.dataSource = new MatTableDataSource(this.myObj);
        this.dataSource.paginator = this.paginator;
        this.myObj.length > 0 ? this.noResult = false : this.noResult = true
      });
    } else {
      this._snackBar.open('Informe um termo para efetuar a busca', '', { duration: 2000 });
    }
  }

  limparFiltro() {
    this.agrupamento = '';
    this.getAgrupamentos();
  }

  edit(_item) {
    this.router.navigate(["/agrupamento/editar", _item]);
  }

  removeAgrupamento(id) {
    this.dialogRef = this._matDialog.open(DeleteAgrupamentoComponent, {
      panelClass: 'delete-agrupamento-contact-form-dialog',
      data: id
    });

    this.dialogRef.afterClosed()
      .subscribe((response) => {
        this.getAgrupamentos();
        if (!response) {
          return;
        }
      });
  }
}
