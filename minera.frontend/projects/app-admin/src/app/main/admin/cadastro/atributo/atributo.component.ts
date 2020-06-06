import { AtributoService } from './../../../services/atributo.service';
import { AtributoModel } from './../../../models/atributo-model';
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from "@angular/material";

@Component({
  selector: 'app-atributo',
  templateUrl: './atributo.component.html',
  styleUrls: ['./atributo.component.scss']
})
export class AtributoComponent implements OnInit {

  list: AtributoModel[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  noResult: boolean = true;
  paginationParams: any;
  length: number;
  atributo = '';
  atributos = [];
  displayedColumns: string[] = ['codigo', 'nome'];
  dataSource;

  constructor(
    private service: AtributoService,
    public matDialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getAtributos();
  }

  getAtributos() {
    this.service.getListaAtributos().subscribe((response) => {
      this.atributos = response.data;
      this.dataSource = new MatTableDataSource(this.atributos);
      this.dataSource.paginator = this.paginator;
      this.atributos ? this.noResult = false : this.noResult = true;
    });
  }


  filtrarAtributo() {
    this.service.filtrarAtributos(0, this.atributo).subscribe((response) => {
      this.atributos = response.data;
      this.dataSource = new MatTableDataSource(this.atributos);
      this.dataSource.paginator = this.paginator;
      this.atributos.length > 0 ? this.noResult = false : this.noResult = true
    });
  }

  limparAtributo() {
    this.atributo = '';
    this.getAtributos();
  }

}
