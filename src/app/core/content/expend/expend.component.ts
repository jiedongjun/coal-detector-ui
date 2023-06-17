import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Expend, ExpendService} from "../../../service/expend.service";
import {PageRequest} from "../../../service/coal-conf.service";
import * as moment from "moment/moment";
import {DialogService, ModalService} from "ng-devui";
import {ExpendEditComponent} from "./expend-edit/expend-edit.component";
import {Message, MessageComponent} from "../../../shared/message/message.component";
import {finalize} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-expend',
  templateUrl: './expend.component.html',
  styleUrls: ['./expend.component.scss']
})
export class ExpendComponent implements OnInit {

  @Input() data: any;
  parent!: HTMLElement;
  columns = [
    {
      field: 'payTime',
      header: '支出时间',
      fieldType: 'date',
      sortable: true,
      width: '180px'
    },
    {
      field: 'amount',
      header: '金额',
      fieldType: 'text',
      sortable: true,
      width: '100px'
    },
    {
      field: 'payWay',
      header: '支出方式',
      fieldType: 'text',
      sortable: true,
      width: '100px'
    },
    {
      field: 'direction',
      header: '说明',
      fieldType: 'text',
      sortable: true,
      width: '200px'
    },
    {
      field: 'writer',
      header: '填写人',
      fieldType: 'text',
      sortable: true,
      width: '100px'
    }
  ];
  page: PageRequest = {page: 0, size: 10, sort: 'id,desc'};
  pager: {
    total: number,
    pageIndex: number,
    pageSize: number
  } = {total: 0, pageSize: 10, pageIndex: 0};
  expendList: Expend[] = [];
  writer: string = '';
  dateRange!: Date[];
  config = {
    id: 'delete-data',
    width: '346px',
    maxHeight: '600px',
    zIndex: 1050,
    backdropCloseable: true,
    html: true,
  };
  loading: boolean = false;
  @ViewChild('message', {static: false}) message!: MessageComponent;

  constructor(private elr: ElementRef,
              private expendService: ExpendService,
              private modalService: ModalService,
              private dialogService: DialogService,
              private messageService: NzMessageService) {
  }

  close(event: any) {
    this.findAll();
    this.data.onClose(event);
  }

  ngOnInit(): void {
    const start_time = moment().startOf("week").toDate();
    const end_time = moment().endOf("week").toDate();
    this.dateRange = [start_time, end_time];
    this.parent = this.elr.nativeElement.parentElement;
    this.findAll();
  }

  findAll() {
    this.loading = true;
    this.expendService.getAll(this.writer, this.dateRange[0].getTime(), this.dateRange[1].getTime(), this.page)
      .pipe(
        finalize(() => this.loading = false)
      ).subscribe(res => {
      this.expendList = res.data ? res.data : [];
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

  create(expend?: Expend){
    const results = this.modalService.open({
      id: 'expend-add',
      width: '600px',
      component: ExpendEditComponent,
      backdropCloseable: true,
      data: {
        data: expend,
        onClose: (message: Message) => {
          this.findAll();
          results.modalInstance.hide();
        },
      }
    });
  }

  delete(expend: Expend){
    this.expendService.delete(expend.id).subscribe(() => {
      this.findAll();
      this.messageService.success('删除成功');
    });
  }
}
