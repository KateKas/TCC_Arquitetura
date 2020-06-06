import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavbarVerticalStyle2Component } from './style-2.component';
import { FuseSharedModule } from '../../../../../../@fuse/shared.module';
import { FuseNavigationModule } from '../../../../../../@fuse/components';


@NgModule({
    declarations: [
        NavbarVerticalStyle2Component
    ],
    imports: [
        MatButtonModule,
        MatIconModule,

        FuseSharedModule,
        FuseNavigationModule
    ],
    exports: [
        NavbarVerticalStyle2Component
    ]
})
export class NavbarVerticalStyle2Module {
}
