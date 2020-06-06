import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UsuarioModel } from './../../../models/usuario-model';
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
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss'],
  animations: fuseAnimations
})
export class UsuarioFormComponent extends BaseComponent implements OnInit {
  @ViewChild('matTableSKU', { static: true }) matTableSKU: ElementRef;

  displayedColumns = ['nome', 'papel', 'userName', 'passWord'];
  dataSource: MatTableDataSource<UsuarioModel>;

  public usuario: UsuarioModel;

  usuarioDetail: any;
  showButtonSalvar = false;
  usuarioDetailId = this.route.snapshot.params.id;

  form = new FormGroup({
    id: new FormControl(),
    nome: new FormControl("", [
      Validators.required
    ]),
    papel: new FormControl("", [
      Validators.required
    ]),
    userName: new FormControl("", [
      Validators.required
    ]),
    passWord: new FormControl("", [
      Validators.required
    ]),
  });

  constructor(
    private route: ActivatedRoute,
    private _matDialog: MatDialog,
    private usuarioService: UsuarioService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {
    super();
  }

  ngOnInit() {
    if (this.usuarioDetailId) {
      this.getUsuario();
    }
  }

  getUsuario() {
    const form = this.form;
    const url = this.route.snapshot.routeConfig.path;
    if (url !== "usuario/novo") {
      this.usuarioDetail = true;
      this.showButtonSalvar = true;
      this.usuarioService.getUsuarios(this.usuarioDetailId).subscribe((response) => {
        this.usuarioDetail = response.data;
        form.get('nome').setValue(this.usuarioDetail ? this.usuarioDetail.nome : '');
        form.get('papel').setValue(this.usuarioDetail ? this.usuarioDetail.papel : '');
        form.get('userName').setValue(this.usuarioDetail ? this.usuarioDetail.userName : '');
        form.get('passWord').setValue(this.usuarioDetail ? this.usuarioDetail.passWord : '');
      })
    }
  }

  saveUsuario() {
    const body = {
      id: this.usuarioDetailId ? this.usuarioDetailId : 0,
      nome: this.form.get('nome').value ? this.form.get('nome').value : '',
      papel: this.form.get('papel').value ? this.form.get('papel').value : '',
      userName: this.form.get('userName').value ? this.form.get('userName').value : '',
      passWord: this.form.get('passWord').value ? this.form.get('passWord').value : ''
    }
    if (body.id === 0) {
      this.usuarioService.cadastrarUsuario(body).subscribe((response) => {
        this.router.navigate(["/agrupamento/editar/" + response.data.codigo]);
        if (response.code !== 200) {
          this._snackBar.open('Ocorreu um erro, contate o administrador do sistema', '', { duration: 3000 });
        }
      });
    }
    else {
      this.usuarioService.editarUsuario(body).subscribe((response) => {
        if (response.code === 200) {
          this.getUsuario();
          this._snackBar.open('Usuário editado com sucesso!', '', { duration: 3000 });
        } else {
          this._snackBar.open('Ocorreu um erro, contate o administrador do sistema', '', { duration: 3000 });
        }
      });
    }
  }

}
