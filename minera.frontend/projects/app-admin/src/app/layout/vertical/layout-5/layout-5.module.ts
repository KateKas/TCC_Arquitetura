import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FuseSharedModule } from "../../../../@fuse/shared.module";
import { FuseSidebarModule } from "../../../../@fuse/components";
import { ContentModule } from "../../components/content/content.module";
import { FooterModule } from "../../components/footer/footer.module";
import { NavbarModule } from "../../components/navbar/navbar.module";
import { QuickPanelModule } from "../../components/quick-panel/quick-panel.module";
import { ToolbarModule } from "../../components/toolbar/toolbar.module";
import { VerticalLayout5Component } from "./layout-5.component";

@NgModule({
    declarations: [VerticalLayout5Component],
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
    exports: [VerticalLayout5Component]
})
export class VerticalLayout5Module {}
