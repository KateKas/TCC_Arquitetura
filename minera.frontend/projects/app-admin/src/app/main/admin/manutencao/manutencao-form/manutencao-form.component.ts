import { ManutencaoService } from './../../../services/manutencao-service';
import { ManutencaoModel } from './../../../models/manutencao-model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from './../../../../util/base-component';
import { fuseAnimations } from './../../../../../@fuse/animations/index';
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar, MatCheckboxChange, MatOptionSelectionChange } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';

@Component({
  selector: 'app-manutencao-form',
  templateUrl: './manutencao-form.component.html',
  styleUrls: ['./manutencao-form.component.scss']
})
export class ManutencaoFormComponent extends BaseComponent implements OnInit {
  @ViewChild('matTableSKU', { static: true }) matTableSKU: ElementRef;

  displayedColumns = ['tipo', 'descricao', 'dataAquisicao', 'status', 'data'];
  dataSource: MatTableDataSource<ManutencaoModel>;

  public usuario: ManutencaoModel;

  manutencaoDetail: any;
  showButtonSalvar = false;
  manutencaoDetailId = this.route.snapshot.params.id;

  form = new FormGroup({
    id: new FormControl(),
    tipo: new FormControl(0, [
      Validators.required
    ]),
    data: new FormControl(Date, [
      Validators.required
    ]),
    descricao: new FormControl("", [
      Validators.required
    ]),
    status: new FormControl(true, [
      Validators.required
    ])
  });

  constructor(
    private route: ActivatedRoute,
    private _matDialog: MatDialog,
    private manutencaoService: ManutencaoService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {
    super();
  }

  ngOnInit() {
    if (this.manutencaoDetailId) {
      this.getManutencao();
    }
  }

  getManutencao() {
    const form = this.form;
    const url = this.route.snapshot.routeConfig.path;
    if (url !== "manutencao/novo") {
      this.manutencaoDetail = true;
      this.showButtonSalvar = true;
      this.manutencaoService.getManutencao(this.manutencaoDetailId).subscribe((response) => {
        this.manutencaoDetail = response;
        form.get('tipo').setValue(this.manutencaoDetail ? this.manutencaoDetail.tipo : 0);
        form.get('data').setValue(this.manutencaoDetail ? this.manutencaoDetail.data : new Date);
        form.get('descricao').setValue(this.manutencaoDetail ? this.manutencaoDetail.descricao : '');
        form.get('status').setValue(this.manutencaoDetail ? this.manutencaoDetail.status : false);
      })
    }
  }

  saveManutencao() {
    const body = {
      id: this.manutencaoDetailId ? this.manutencaoDetailId : 0,
      tipo: this.form.get('tipo').value ? this.form.get('tipo').value : 0,
      data: this.form.get('data').value ? this.form.get('data').value : new Date,
      descricao: this.form.get('descricao').value ? this.form.get('descricao').value : '',
      status: 1,
    }
    if (body.id === 0) {
      this.manutencaoService.cadastrarManutencao(body).subscribe((response) => {
        this.router.navigate(["/manutencao"]);
        if (response.code !== 200) {
          this._snackBar.open('Ocorreu um erro, contate o administrador do sistema', '', { duration: 3000 });
        }
      });
    }
    else {
      this.manutencaoService.editarManutencao(body).subscribe((response) => {
        if (response.code === 200) {
          this.getManutencao();
          this._snackBar.open('Manutenção editada com sucesso!', '', { duration: 3000 });
        } else {
          this._snackBar.open('Ocorreu um erro, contate o administrador do sistema', '', { duration: 3000 });
        }
      });
    }
  }

}
