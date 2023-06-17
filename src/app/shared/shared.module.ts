import { NgModule } from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';

import {DevUIModule, LayoutModule} from "ng-devui";
import {I18nModule} from "ng-devui/i18n";
import {HttpClientModule} from "@angular/common/http";
import { NumberRoundPipe } from './pipe/number-round.pipe';
import { TipModalComponent } from './component/tip-modal/tip-modal.component';
import { MessageComponent } from './message/message.component';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {FormsModule} from "@angular/forms";
import {IconsProviderModule} from "../icons-provider.module";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzMessageService} from "ng-zorro-antd/message";
import zh from "@angular/common/locales/zh";
registerLocaleData(zh)


@NgModule({
  declarations: [
    NumberRoundPipe,
    TipModalComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    DevUIModule,
    LayoutModule,
    I18nModule,
    NzButtonModule,
    NzPopconfirmModule,
    FormsModule,
    HttpClientModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule
  ],
    exports: [
        CommonModule,
        DevUIModule,
        LayoutModule,
        I18nModule,
        NumberRoundPipe,
        TipModalComponent,
        MessageComponent
    ],
  providers: [NzMessageService]
})
export class SharedModule { }
