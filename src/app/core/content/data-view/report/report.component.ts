import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {CoalConf} from "../../../../service/coal-conf.service";
import {Report, ReportService} from "../../../../service/report.service";
import {DatePipe} from "@angular/common";
import * as moment from "moment";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit{

  @Input() data: any;
  parent!: HTMLElement;
  report?: Report;


  constructor(private elr: ElementRef, private reportService: ReportService) {
  }

  close(event: any) {
    this.data.onClose(event);
  }

  save(){
    if(this.report){
      this.reportService.save(this.report).subscribe(report => {
        this.report = report;
      });
    }
  }

  export(){
    this.reportService.export(this.report).subscribe(blob => {
      if(this.report){
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = this.report.checkDate + '-' +  this.report.phone + '.docx'; // 设置下载的文件名
        link.click();
        URL.revokeObjectURL(url);
      }
    });
  }

  ngOnInit(): void {
    this.parent = this.elr.nativeElement.parentElement;
    const coalConf: CoalConf = this.data.coalConf;
    if(coalConf.id){
      this.reportService.findOne(coalConf.id).subscribe((report: Report) => {
        if(report == null){
          this.report = new Report();
        }else{
          this.report = report;
        }
        this.report.coalConfId = coalConf.id;
        this.report.phone = coalConf.phone;
        this.report.coalType = coalConf.coalType;
        if(coalConf.created_date){
          this.report.checkDate = moment(coalConf.created_date).format('yyyy-MM-DD');
        }
        if(coalConf.up_M4){
          this.report.up_M4 = Number(coalConf.up_M4?.toFixed(2));
        }
        if(coalConf.up_A4 && coalConf.report2 && coalConf.up_M4){
          this.report.up_Aar = Number((coalConf.up_A4 * (100 - coalConf.up_M4) / (100 - coalConf.report2)).toFixed(2));
        }
        if(coalConf.up_A4){
          this.report.up_A4 = Number(coalConf.up_A4?.toFixed(2));
        }
        if(coalConf.report2 && coalConf.up_A4){
          this.report.up_Ad = Number((coalConf.up_A4 / (100 - coalConf.report2) * 100).toFixed(2));
        }
        if(coalConf.up_M4 && coalConf.up_V4 && coalConf.report2){
          this.report.up_Var = Number((coalConf.up_V4 * (100 - coalConf.up_M4) / (100 - coalConf.report2)).toFixed(2));
        }
        if(coalConf.up_V4){
          this.report.up_V4 = Number(coalConf.up_V4?.toFixed(2));
        }
        if(coalConf.up_V4 && coalConf.report2){
          this.report.up_Vd = Number((coalConf.up_V4 / (100 - coalConf.report2) * 100).toFixed(2));
        }
        if(coalConf.up_V4 && coalConf.report2 && coalConf.up_A4){
          this.report.up_Vdaf = Number((coalConf.up_V4 / (100 - coalConf.report2 - coalConf.up_A4) * 100).toFixed(2));
        }
        if(coalConf.eggCone2){
          this.report.eggCone2 = Number(coalConf.eggCone2?.toFixed(2));
        }
        if(coalConf.report1){
          this.report.report1 = Number(coalConf.report1?.toFixed(0));
        }
        this.report.report2 = coalConf.report2;
        this.report.up_C = coalConf.up_C;
        this.report.up_S = coalConf.up_S;
        this.report.report3 = coalConf.report3;
        this.save();
      });
    }
  }
}
