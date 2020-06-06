import { NgModule } from "@angular/core";
import { VerticalLayout1Module } from "./vertical/layout-1/layout-1.module";
import { VerticalLayout2Module } from "./vertical/layout-2/layout-2.module";
import { VerticalLayout3Module } from "./vertical/layout-3/layout-3.module";
import { VerticalLayout4Module } from "./vertical/layout-4/layout-4.module";
import { HorizontalLayout1Module } from "./horizontal/layout-1/layout-1.module";
import { VerticalLayout5Module } from "./vertical/layout-5/layout-5.module";

@NgModule({
    imports: [
        VerticalLayout1Module,
        VerticalLayout2Module,
        VerticalLayout3Module,
        VerticalLayout4Module,
        VerticalLayout5Module,

        HorizontalLayout1Module
    ],
    exports: [
        VerticalLayout1Module,
        VerticalLayout2Module,
        VerticalLayout3Module,
        VerticalLayout4Module,
        VerticalLayout5Module,

        HorizontalLayout1Module
    ]
})
export class LayoutModule {}
