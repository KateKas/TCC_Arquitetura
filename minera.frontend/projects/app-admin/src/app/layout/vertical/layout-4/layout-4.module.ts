import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FuseSharedModule } from "../../../../@fuse/shared.module";
import { FuseSidebarModule } from "../../../../@fuse/components";
import { ContentModule } from "../../components/content/content.module";
import { FooterModule } from "../../components/footer/footer.module";
import { NavbarModule } from "../../components/navbar/navbar.module";
import { QuickPanelModule } from "../../components/quick-panel/quick-panel.module";
import { ToolbarModule } from "../../components/toolbar/toolbar.module";
import { VerticalLayout4Component } from "./layout-4.component";

@NgModule({
    declarations: [VerticalLayout4Component],
    imports: [
        RouterModule,

        FuseSharedModule,
        FuseSidebarModule,

        ContentModule,
        FooterModule,
        NavbarModule,
        QuickPanelModule,
        ToolbarModule
    ],
    exports: [VerticalLayout4Component]
})
export class VerticalLayout4Module {}
