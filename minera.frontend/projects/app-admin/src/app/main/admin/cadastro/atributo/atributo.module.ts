import { AtributoFormComponent } from './atributo-form/atributo-form.component';
import { AtributoComponent } from './atributo.component';
import { FileUploadModule } from './../../../../util/shared/file-upload/file-upload.module';
import { FuseSharedModule } from './../../../../../@fuse/shared.module';
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatListModule } from "@angular/material/list";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';

import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDividerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatStepperModule,
    MatAutocompleteModule,
} from "@angular/material";
import { GoogleChartsModule } from "angular-google-charts";
import { NgxMaskModule } from "ngx-mask";
import { AtributoFormDialogComponent } from './atributo-form-dialog/atributo-form-dialog.component';
import { DeleteAtributoDialogComponent } from './delete-atributo-dialog/delete-atributo-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes = [
    {
        path: 'cadastro/atributo',
        component: AtributoComponent
    }
];

@NgModule({

    declarations: [AtributoComponent, AtributoFormComponent, AtributoFormDialogComponent, DeleteAtributoDialogComponent],
    imports: [
        RouterModule.forChild(routes),
        MatChipsModule,
        MatExpansionModule,
        MatTabsModule,
        NgxChartsModule,
        AgmCoreModule,
        MatDatepickerModule,
        CommonModule,
        MatRippleModule,
        RouterModule,
        MatButtonModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatMenuModule,
        MatDividerModule,
        MatSnackBarModule,
        MatDialogModule,
        FuseSharedModule,
        MatStepperModule,
        FileUploadModule,
        MatListModule,
        NgxMaskModule,
        MatCheckboxModule,
        MatTooltipModule,
        GoogleChartsModule.forRoot(),
        MatAutocompleteModule,
        MatProgressSpinnerModule
    ],
    entryComponents: [
        AtributoFormDialogComponent,
        DeleteAtributoDialogComponent,
    ]
})
export class AtributoModule { }
