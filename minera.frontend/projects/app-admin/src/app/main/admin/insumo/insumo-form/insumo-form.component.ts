import { InsumoService } from './../../../services/insumo.service';
import { InsumoModel } from './../../../models/insumo-model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from './../../../../util/base-component';
import { fuseAnimations } from './../../../../../@fuse/animations/index';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar, MatCheckboxChange, MatOptionSelectionChange } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';

@Component({
  selector: 'app-insumo-form',
  templateUrl: './insumo-form.component.html',
  styleUrls: ['./insumo-form.component.scss'],
  animations: fuseAnimations
})
export class InsumoFormComponent extends BaseComponent implements OnInit {
  @ViewChild('matTableSKU', { static: true }) matTableSKU: ElementRef;

  displayedColumns = ['nome', 'descricao', 'dataAquisicao', 'status', 'dataProximaManutencao', 'dataUltimaManutencao,'];
  dataSource: MatTableDataSource<InsumoModel>;

  public usuario: InsumoModel;

  insumoDetail: any;
  showButtonSalvar = false;
  insumoDetailId = this.route.snapshot.params.id;

  form = new FormGroup({
    id: new FormControl(),
    nome: new FormControl("", [
      Validators.required
    ]),
    descricao: new FormControl("", [
      Validators.required
    ]),
    status: new FormControl(true, [
      Validators.required
    ]),
    dataAquisicao: new FormControl(Date, [
      Validators.required
    ]),
    dataProximaManutencao: new FormControl(Date, [
      Validators.required
    ]),
    dataUltimaManutencao: new FormControl(Date, [
      Validators.required
    ]),
  });

  constructor(
    private route: ActivatedRoute,
    private _matDialog: MatDialog,
    private insumoService: InsumoService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {
    super();
  }

  ngOnInit() {
    if (this.insumoDetailId) {
      this.getInsumo();
    }
  }

  getInsumo() {
    const form = this.form;
    const url = this.route.snapshot.routeConfig.path;
    if (url !== "insumo/novo") {
      this.insumoDetail = true;
      this.showButtonSalvar = true;
      this.insumoService.getInsumos(this.insumoDetailId).subscribe((response) => {
        this.insumoDetail = response;
        form.get('nome').setValue(this.insumoDetail ? this.insumoDetail.nome : '');
        form.get('descricao').setValue(this.insumoDetail ? this.insumoDetail.descricao : '');
        form.get('status').setValue(this.insumoDetail ? this.insumoDetail.status : false);
        form.get('dataAquisicao').setValue(this.insumoDetail ? this.insumoDetail.dataAquisicao : new Date);
        form.get('dataProximaManutencao').setValue(this.insumoDetail ? this.insumoDetail.dataProximaManutencao : new Date);
        form.get('dataUltimaManutencao').setValue(this.insumoDetail ? this.insumoDetail.dataUltimaManutencao : new Date);
      })
    }
  }

  saveInsumo() {
    const body = {
      id: this.insumoDetailId ? this.insumoDetailId : 0,
      nome: this.form.get('nome').value ? this.form.get('nome').value : '',
      descricao: this.form.get('descricao').value ? this.form.get('descricao').value : '',
      status: 1,
      dataAquisicao: this.form.get('dataAquisicao').value ? this.form.get('dataAquisicao').value : new Date,
      dataProximaManutencao: this.form.get('dataProximaManutencao').value ? this.form.get('dataProximaManutencao').value : new Date,
      dataUltimaManutencao: this.form.get('dataUltimaManutencao').value ? this.form.get('dataUltimaManutencao').value : new Date
    }
    if (body.id === 0) {
      this.insumoService.cadastrarInsumo(body).subscribe((response) => {
        this.router.navigate(["/insumo"]);
        if (response.code !== 200) {
          this._snackBar.open('Ocorreu um erro, contate o administrador do sistema', '', { duration: 3000 });
        }
      });
    }
    else {
      this.insumoService.editarInsumo(body).subscribe((response) => {
        if (response.code === 200) {
          this.getInsumo();
          this._snackBar.open('Insumo editado com sucesso!', '', { duration: 3000 });
        } else {
          this._snackBar.open('Ocorreu um erro, contate o administrador do sistema', '', { duration: 3000 });
        }
      });
    }
  }
}
