import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CoalConf, CoalConfService} from "../../../../service/coal-conf.service";
import {PayStatusEnum} from "../../../enum/pay-status-enum";
import {SendStatusEnum} from "../../../enum/send-status-enum";

@Component({
  selector: 'app-data-edit',
  templateUrl: './data-edit.component.html',
  styleUrls: ['./data-edit.component.scss']
})
export class DataEditComponent implements OnInit{

  @Input() coalConf!: CoalConf;
  payStatusOptions = [
    {label: '欠款', value: PayStatusEnum.NO_PAY},
    {label: '微信', value: PayStatusEnum.WECHAT},
    {label: '支付宝', value: PayStatusEnum.ALIPAY},
    {label: '会员', value: PayStatusEnum.MEMBER},
    {label: '现金', value: PayStatusEnum.CASH}
  ];
  sendOptions = [{label: '已发', value: SendStatusEnum.SEND}, {label: '未发', value: SendStatusEnum.NO_SEND}];
  payStatus?: any;
  sendStatus?: any;
  @Output() checkCoalConf = new EventEmitter();

  constructor(private coalConfService: CoalConfService) {
  }

  complete(){
    if(this.coalConf.up_M1 &&  this.coalConf.up_M2 && this.coalConf.up_M3){
      this.coalConf.up_M4 = (this.coalConf.up_M1 + this.coalConf.up_M2 - this.coalConf.up_M3) / this.coalConf.up_M2 * 100;
    }
    if(this.coalConf.up_A1 && this.coalConf.up_A2 && this.coalConf.up_A3){
      this.coalConf.up_A4 = (this.coalConf.up_A3 - this.coalConf.up_A1) / this.coalConf.up_A2 * 100;
    }
    if(this.coalConf.up_V1 && this.coalConf.up_V2 && this.coalConf.up_V3 && this.coalConf.low_m4){
      this.coalConf.up_V4 = (this.coalConf.up_V1 + this.coalConf.up_V2 - this.coalConf.up_V3) / this.coalConf.up_V2 * 100 - this.coalConf.low_m4;
    }
    if(this.coalConf.low_m1 && this.coalConf.low_m2 && this.coalConf.low_m3){
      this.coalConf.low_m4 = (this.coalConf.low_m1 + this.coalConf.low_m2 - this.coalConf.low_m3) / this.coalConf.low_m2 * 100;
    }
    if(this.coalConf.up_V4 && this.coalConf.up_A4 && this.coalConf.report2 && this.coalConf.up_C && this.coalConf.up_M4){
      this.coalConf.soft3 = ((35860 - 73.7 * this.coalConf.up_V4 - 395.7 * this.coalConf.up_A4 - 702 * this.coalConf.report2 + 173.6 * this.coalConf.up_C + 23 * this.coalConf.report2) * (100 - this.coalConf.up_M4) / (100 - this.coalConf.report2) - 23 * this.coalConf.up_M4) / 4.1816;
    }
    if(this.payStatus){
      this.coalConf.payStatus = this.payStatus.value;
    }
    if(this.sendStatus){
      this.coalConf.send = this.sendStatus.value;
    }
    if(this.coalConf.sc1 && this.coalConf.up_S){
      this.coalConf.eggCone1 = (this.coalConf.sc1 * 4.1816 - (94.1 * this.coalConf.up_S + 0.0012 * this.coalConf.sc1 *4.1816/1000))/4.1816;
      this.coalConf.eggCone1 = Number(this.coalConf.eggCone1.toFixed(0));
    }
    if(this.coalConf.eggCone1 && this.coalConf.sc2 && this.coalConf.up_M4 && this.coalConf.low_m4){
      this.coalConf.eggCone3 = ((this.coalConf.eggCone1 * 4.1816 - 206 * this.coalConf.sc2) * ((100 - this.coalConf.up_M4)/(100 - this.coalConf.low_m4)) - 23 * this.coalConf.up_M4)/4.1816;
      this.coalConf.eggCone3 = Number(this.coalConf.eggCone3.toFixed(0));
    }
    if(this.coalConf.report2 && this.coalConf.up_A4 && this.coalConf.up_V4){
      this.coalConf.eggCone2 = 100 - this.coalConf.report2 - this.coalConf.up_A4 - this.coalConf.up_V4;
    }
    if(this.coalConf.up_V4 && this.coalConf.report2 && this.coalConf.up_A4){
      this.coalConf.sc3 = this.coalConf.up_V4 / (100 - this.coalConf.report2 - this.coalConf.up_A4) * 100;
    }
    if(this.coalConf.sc3 && this.coalConf.up_A4 && this.coalConf.report2){
      this.coalConf.sc2 = this.coalConf.sc3 / (0.1462 * this.coalConf.sc3 + 1.1124) * (100 - this.coalConf.report2 - this.coalConf.up_A4) / 100;
    }
    if(this.coalConf.report3 && this.coalConf.up_M4 && this.coalConf.report2 && this.coalConf.sc2){
      this.coalConf.report1 = ((this.coalConf.report3 * 4.1816 + 23 * this.coalConf.up_M4) * (100 - this.coalConf.report2) / (100 - this.coalConf.up_M4) + 206 * this.coalConf.sc2)/4.1816 + 150;
    }

    this.coalConfService.save(this.coalConf).subscribe(coalConf => {
      this.coalConf = coalConf;
      this.checkCoalConf.emit(this.coalConf);
    });
  }

  ngOnInit(): void {
    this.sendOptions.forEach(item => {
      if(this.coalConf.send === item.value){
        this.sendStatus = item;
      }
    });
    this.payStatusOptions.forEach(item => {
      if(this.coalConf.payStatus === item.value){
        this.payStatus = item;
      }
    })
  }
}
