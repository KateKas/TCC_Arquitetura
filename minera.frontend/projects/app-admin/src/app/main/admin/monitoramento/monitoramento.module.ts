import { MonitoramentoComponent } from './monitoramento.component';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatListModule } from "@angular/material/list";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
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
  MatExpansionModule,
  MatDatepickerModule
} from "@angular/material";
import { FuseSharedModule } from "../../../../@fuse/shared.module";
import { GoogleChartsModule } from "angular-google-charts";
import { FileUploadModule } from "../../../util/shared/file-upload/file-upload.module";
import { NgxMaskModule } from "ngx-mask";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

const routes = [
  {
    path: 'monitoramento',
    component: MonitoramentoComponent
  }
];

@NgModule({
  declarations: [MonitoramentoComponent],
  imports: [
    CommonModule,
    RouterModule,
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
    MatDatepickerModule,
    FuseSharedModule,
    MatStepperModule,
    FileUploadModule,
    MatListModule,
    NgxMaskModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatExpansionModule,
    GoogleChartsModule,
    MatCardModule,
    FormsModule,
  ]
})
export class MonitoramentoModule { }
