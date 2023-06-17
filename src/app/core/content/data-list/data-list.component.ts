import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CoalConf, CoalConfService, PageRequest} from "../../../service/coal-conf.service";
import {PayStatusEnum} from "../../enum/pay-status-enum";
import {SendStatusEnum} from "../../enum/send-status-enum";
import * as moment from "moment";
import {finalize, map} from "rxjs";
import {ReportComponent} from "../data-view/report/report.component";
import {ModalService} from "ng-devui";
import {ReportService} from "../../../service/report.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {

  columns = [
    {
      field: 'phone',
      header: '客户电话',
      fieldType: 'text',
      sortable: true,
      width: '120px'
    },
    {
      field: 'up_M',
      header: 'M',
      fieldType: 'text',
      sortable: true,
      width: '100px'
    },
    {
      field: 'up_A',
      header: 'A',
      fieldType: 'text',
      sortable: true,
      width: '100px'
    },
    {
      field: 'up_V',
      header: 'V',
      fieldType: 'text',
      sortable: true,
      width: '100px'
    },
    {
      field: 'low_m',
      header: 'm',
      fieldType: 'text',
      sortable: true,
      width: '100px'
    },
    {
      field: 'project',
      header: '项目',
      fieldType: 'text',
      sortable: true,
      width: '100px'
    },
    {
      field: 'send',
      header: '是否发送',
      fieldType: 'text',
      sortable: true,
      width: '100px'
    },
    {
      field: 'note1',
      header: '备注',
      fieldType: 'text',
      sortable: true,
      width: '100px'
    },
    {
      field: 'id',
      header: '编号',
      fieldType: 'text',
      sortable: true,
      width: '70px'
    },
    {
      field: 'created_date',
      header: '时间',
      fieldType: 'date',
      sortable: true,
      width: '160px'
    },
    {
      field: 'price2',
      header: '金额',
      fieldType: 'text',
      sortable: true,
      width: '100px'
    },
    {
      field: 'payStatus',
      header: '付款',
      fieldType: 'text',
      sortable: true,
      width: '100px'
    }
  ];
  coalConfList: CoalConf[] = [];

  phone?: string;
  dateRange!: Date[];
  payStatusOptions = [
    {label: '欠款', value: PayStatusEnum.NO_PAY},
    {label: '微信', value: PayStatusEnum.WECHAT},
    {label: '支付宝', value: PayStatusEnum.ALIPAY},
    {label: '会员', value: PayStatusEnum.MEMBER},
    {label: '现金', value: PayStatusEnum.CASH},
    {label: '全部', value: ''}
  ];
  payStatus: any = {label: '全部', value: ''};
  sendOptions = [{label: '已发送', value: SendStatusEnum.SEND}, {
    label: '未发送',
    value: SendStatusEnum.NO_SEND
  }, {label: '全部', value: ''}];
  sendStatus: any = {label: '全部', value: ''};
  page: PageRequest = {page: 0, size: 10, sort: 'id,desc'};
  pager: {
    total: number,
    pageIndex: number,
    pageSize: number
  } = {total: 0, pageSize: 10, pageIndex: 0};
  loading: boolean = false;
  income?: number;
  havePay?: number;
  noPay?: number;

  @Output() dbClickRow = new EventEmitter();

  constructor(private coalConfService: CoalConfService,
              private modalService: ModalService,
              private reportService: ReportService,
              private messageService: NzMessageService) {
  }

  ngOnInit(): void {
    const start_time = moment().startOf("month").toDate();
    const end_time = moment().endOf("month").toDate();
    this.dateRange = [start_time, end_time];
    this.findAll();
  }

  findAll() {
    this.loading = true;
    this.coalConfService.findAll(
      this.dateRange[0].getTime(),
      this.dateRange[1].getTime(),
      this.payStatus.value,
      this.sendStatus.value,
      this.phone ? this.phone as string : '',
      this.page
    ).pipe(
      finalize(() => this.loading = false)
    )
      .subscribe((res: { list?: CoalConf[]; total?: number; income?: number; havePay?: number; noPay?: number }) => {
        const coalConfList = res.list ? res.list : [];
        this.coalConfList = coalConfList.map((coalConf: CoalConf) => {
          if (coalConf.payStatus === PayStatusEnum.CASH) {
            coalConf.payStatus = '现金';
          } else if (coalConf.payStatus === PayStatusEnum.WECHAT) {
            coalConf.payStatus = '微信支付';
          } else if (coalConf.payStatus === PayStatusEnum.NO_PAY) {
            coalConf.payStatus = '支付宝';
          } else if (coalConf.payStatus === PayStatusEnum.ALIPAY) {
            coalConf.payStatus = '会员';
          } else if (coalConf.payStatus === PayStatusEnum.MEMBER) {
            coalConf.payStatus = '欠款';
          }
          if (coalConf.send === SendStatusEnum.NO_SEND) {
            coalConf.send = '未发';
          } else if (coalConf.send === SendStatusEnum.SEND) {
            coalConf.send = '已发';
          }
          return coalConf;
        });
        this.income = res.income ? res.income : 0;
        this.havePay = res.havePay ? res.havePay : 0;
        this.noPay = res.noPay ? res.noPay : 0;
        this.pager = {
          total: res.total as number,
          pageIndex: this.page.page as number + 1,
          pageSize: this.page.size as number
        };
      });
  }

  onChange(dateRange: any) {
    this.dateRange = dateRange;
  }

  changeIndex(event: any) {
    this.pager.pageIndex = event;
    this.page.page = event - 1;
    this.findAll();
  }

  changePageSize(event: any) {
    this.pager.pageSize = event;
    this.page.size = event;
    this.findAll();
  }

  edite(coalConf: CoalConf) {
    this.dbClickRow.emit(coalConf);
  }

  search() {
    this.findAll();
  }

  view(row: CoalConf) {
    const results = this.modalService.open({
      id: 'report-view',
      width: '800px',
      component: ReportComponent,
      backdropCloseable: false,
      data: {
        coalConf: row,
        onClose: () => {
          results.modalInstance.hide();
        },
      }
    });
  }

  download(row: CoalConf) {
    if (row.id) {
      this.reportService.findOne(row.id).pipe(
        map(report => {
          if (report != null && report.id) {
            this.reportService.download(report.id).subscribe(blob => {
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = report.checkDate + '-' + report.phone + '.docx'; // 设置下载的文件名
              link.click();
              URL.revokeObjectURL(url);
            });
          }
        })
      ).subscribe();
    }
  }

  delete(id: number) {
    this.coalConfService.deleteOne(id).subscribe((res: any) => {
      if (res && res.res) {
        this.findAll();
        this.messageService.success('删除成功');
      } else {
        this.messageService.error('删除成功');
      }
    });
  }
}
