import { ManutencaoFormComponent } from './manutencao/manutencao-form/manutencao-form.component';
import { ManutencaoComponent } from './manutencao/manutencao.component';
import { InsumoFormComponent } from './insumo/insumo-form/insumo-form.component';
import { InsumoComponent } from './insumo/insumo.component';
import { MonitoramentoComponent } from './monitoramento/monitoramento.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { Routes } from "@angular/router";

export const AdminRoutes: Routes = [
    {
        path: "",
        component: MonitoramentoComponent
    },
    {
        path: "monitoramento",
        component: MonitoramentoComponent
    },
    {
        path: "insumo",
        component: InsumoComponent
    },
    {
        path: "insumo/novo",
        component: InsumoFormComponent
    },
    {
        path: "insumo/editar/:id",
        component: InsumoFormComponent
    },
    {
        path: "manutencao",
        component: ManutencaoComponent
    },
    {
        path: "manutencao/novo",
        component: ManutencaoFormComponent
    },
    {
        path: "manutencao/editar/:id",
        component: ManutencaoFormComponent
    },
    {
        path: "usuario",
        component: UsuarioComponent
    },
    {
        path: "usuario/novo",
        component: UsuarioFormComponent
    },
    {
        path: "usuario/editar/:id",
        component: UsuarioFormComponent
    },
];
