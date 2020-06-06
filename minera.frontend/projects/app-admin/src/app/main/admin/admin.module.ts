import { MonitoramentoModule } from './monitoramento/monitoramento.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AgrupamentoModule } from './cadastro/agrupamento/agrupamento.module';
import { AtributoModule } from './cadastro/atributo/atributo.module';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AdminRoutes } from "./admin.routing";
import { MatOptionModule } from '@angular/material/core';
import {

    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatCheckboxModule
} from "@angular/material";
import { SkuDialogComponent } from './cadastro/skus/sku-dialog/sku-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteSkuDialogComponent } from './cadastro/skus/delete-sku-dialog/delete-sku-dialog.component';
import { ConfirmInsercaoSkuDialogComponent } from './cadastro/skus/confirm-insercao-sku-dialog/confirm-insercao-sku-dialog.component';
import { EditRespostasSkuDialogComponent } from './cadastro/skus/edit-respostas-sku-dialog/edit-respostas-sku-dialog.component';
import { InsumoModule } from './insumo/insumo.module';
import { ManutencaoModule } from './manutencao/manutencao.module';
@NgModule({
    imports: [
        RouterModule.forChild(AdminRoutes),
        AtributoModule,
        AgrupamentoModule,
        UsuarioModule,
        InsumoModule,
        MonitoramentoModule,
        ManutencaoModule,
        MonitoramentoModule,
        MatOptionModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        MatSortModule,
        MatTableModule,
        MatCheckboxModule,
        MatDialogModule,
    ],
    declarations: [SkuDialogComponent, DeleteSkuDialogComponent, ConfirmInsercaoSkuDialogComponent, EditRespostasSkuDialogComponent],
    entryComponents: [SkuDialogComponent]
})
export class AdminModule { }
