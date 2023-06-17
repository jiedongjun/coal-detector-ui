import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CoalConf} from "../../../service/coal-conf.service";
import {KeyService} from "../../../service/key.service";
import {ModalService} from "ng-devui";
import {ReportComponent} from "./report/report.component";
import {PayStatusEnum} from "../../enum/pay-status-enum";
import {SendStatusEnum} from "../../enum/send-status-enum";

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss']
})
export class DataViewComponent implements OnInit{

  @Input() coalConf!: CoalConf;
  @Output() closeCoalConf = new EventEmitter();
  title!: string;

  constructor(public keyService: KeyService, private modalService: ModalService) {}

  ngOnInit(): void {
    this.title = '记录 ' + this.coalConf.id;
  }

  closeCoal(){
    this.closeCoalConf.emit(this.coalConf);
  }

  viewReport(){
    const results = this.modalService.open({
      id: 'report-view',
      width: '800px',
      component: ReportComponent,
      backdropCloseable: false,
      data: {
        coalConf: this.coalConf,
        onClose: () => {
          results.modalInstance.hide();
        },
      }
    });
  }

  checkCoalConf(coalConf: CoalConf){
    this.coalConf = coalConf;
  }
}
