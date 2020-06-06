import { FuseSharedModule } from './../../../../@fuse/shared.module';
import { FileUploadModule } from './../../../util/shared/file-upload/file-upload.module';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioComponent } from './usuario.component';
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatExpansionModule } from '@angular/material/expansion';
import { NgModule } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatNativeDateModule, MatRippleModule, MatOptionModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
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
    MatSortHeader
} from "@angular/material";
import { GoogleChartsModule } from "angular-google-charts";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NgxMaskModule } from "ngx-mask";
import { HttpClientModule } from '@angular/common/http';

const routes = [
  {
      path: 'usuario',
      component: UsuarioComponent
  }
];

@NgModule({
  declarations: [UsuarioComponent, UsuarioFormComponent ],
  exports: [
      A11yModule,
      CdkStepperModule,
      CdkTableModule,
      CdkTreeModule,
      DragDropModule,
      MatAutocompleteModule,
      MatBadgeModule,
      MatBottomSheetModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatCardModule,
      MatCheckboxModule,
      MatChipsModule,
      MatStepperModule,
      MatDatepickerModule,
      MatSortHeader,
      MatDialogModule,
      MatDividerModule,
      MatExpansionModule,
      MatGridListModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatMenuModule,
      MatNativeDateModule,
      MatPaginatorModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatRadioModule,
      MatRippleModule,
      MatSelectModule,
      MatSidenavModule,
      MatSliderModule,
      MatSlideToggleModule,
      MatSnackBarModule,
      MatSortModule,
      MatTableModule,
      MatTabsModule,
      MatToolbarModule,
      MatTooltipModule,
      MatTreeModule,
      PortalModule,
      ScrollingModule,
  ],
  imports: [
      RouterModule.forChild(routes),
      CommonModule,
      MatToolbarModule,
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
      MatAutocompleteModule,
      FuseSharedModule,
      MatStepperModule,
      FileUploadModule,
      MatListModule,
      NgxMaskModule,
      MatCheckboxModule,
      MatTooltipModule,
      MatExpansionModule,
      MatOptionModule,
      GoogleChartsModule.forRoot(),
      HttpClientModule,
      MatCardModule,
      MatProgressSpinnerModule,
      InfiniteScrollModule
  ],
  entryComponents: [
      // AgrupamentoCorrelatosDialogComponent,
      // DeleteAgrupamentosCorrelatosDialogComponent,
      // DeleteSkuDialogComponent,
      // DeleteAgrupamentoComponent,
      // ConfirmInsercaoSkuDialogComponent,
      // EditRespostasSkuDialogComponent
  ]
})

export class UsuarioModule { }
