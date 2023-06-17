import { NgModule } from '@angular/core';

import { CoreRoutingModule } from './core-routing.module';
import {SharedModule} from "../shared/shared.module";
import {DataListComponent} from "./content/data-list/data-list.component";
import {DataEditComponent} from "./content/data-view/data-edit/data-edit.component";
import { ContentComponent } from './content/content.component';
import {FormsModule} from "@angular/forms";
import { DataViewComponent } from './content/data-view/data-view.component';
import { ReportComponent } from './content/data-view/report/report.component';
import {HttpClient} from "@angular/common/http";
import { AuthComponent } from './content/auth/auth.component';
import { ExpendComponent } from './content/expend/expend.component';
import { ExpendEditComponent } from './content/expend/expend-edit/expend-edit.component';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import { BondComponent } from './content/bond/bond.component';
import {registerLocaleData} from "@angular/common";
import zh from "@angular/common/locales/zh";
registerLocaleData(zh)

@NgModule({
  declarations: [
    DataListComponent,
    DataEditComponent,
    ContentComponent,
    DataViewComponent,
    ReportComponent,
    AuthComponent,
    ExpendComponent,
    ExpendEditComponent,
    BondComponent
  ],
  imports: [
    SharedModule,
    CoreRoutingModule,
    FormsModule,
    NzButtonModule,
    NzPopconfirmModule
  ],
  providers: [
    HttpClient
  ]
})
export class CoreModule { }
