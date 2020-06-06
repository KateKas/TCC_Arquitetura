import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { TranslateModule } from "@ngx-translate/core";
import "hammerjs";
import { AppComponent } from "./app.component";
import { FuseModule } from "../@fuse/fuse.module";
import { fuseConfig } from "./fuse-config";
import {
    FuseProgressBarModule,
    FuseSidebarModule,
    FuseThemeOptionsModule
} from "../@fuse/components";
import { FuseSharedModule } from "../@fuse/shared.module";
import { LayoutModule } from "./layout/layout.module";
import { NgxMaskModule, IConfig } from "ngx-mask";
import { LoaderService } from "./main/services/loader.service";
import { LoaderInterceptor } from "./helpers/loader.interceptor";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ErroSnackbarComponent } from "./util/erro-snackbar/erro-snackbar.component";
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { RequestInterceptorService } from "./helpers/http-interceptor.service";
import { JwtInterceptorService } from "./helpers/jwt-interceptor.service";
import { AdminUserGuard } from "./helpers/user-auth.guard";
import { AgmCoreModule } from "@agm/core";
import { MatPaginatorIntl } from "@angular/material";
import { MatPaginatorIntlPtBr } from "./util/MatPaginatorIntlpt-brClass";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

const appRoutes: Routes = [
    {
        path: "auth",
        loadChildren:
            "./main/authentication/authentication.module#AuthenticationModule"
    },
    {
        path: "",
        loadChildren: "./main/admin/admin.module#AdminModule"
    }
];

@NgModule({
    declarations: [AppComponent, ErroSnackbarComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        MatMomentDateModule,

        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,


        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        NgxMaskModule.forRoot(options),

        LayoutModule,
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyBzpspIFgwh18cGesECPhmamx57JcsyTJQ"
        })
    ],
    providers: [
        LoaderService,
        AdminUserGuard,
        { provide: MatPaginatorIntl, useClass: MatPaginatorIntlPtBr },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptorService,
            multi: true
        },

        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptorService,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptorService,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptorService,
            multi: true
        },
        {
            provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
            useValue: { useUtc: true }
        },
        { provide: MAT_DATE_LOCALE, useValue: "pt-br" },
        {
            provide: MAT_DATE_FORMATS,
            useValue: {
                parse: {
                    dateInput: ["L"]
                },
                display: {
                    dateInput: "DD/MM/YYYY"
                }
            }
        }
    ],
    entryComponents: [ErroSnackbarComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule { }
