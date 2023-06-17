import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Expend, ExpendService} from "../../../../service/expend.service";
import {DialogService} from "ng-devui";
import {Message} from "../../../../shared/message/message.component";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-expend-edit',
  templateUrl: './expend-edit.component.html',
  styleUrls: ['./expend-edit.component.scss']
})
export class ExpendEditComponent implements OnInit{

  @Input() data: any;
  parent!: HTMLElement;
  expend!: Expend;
  dateConfig = {
    timePicker: true,
    dateConverter: null,
    min: 2000,
    max: 2999,
    format: {
      date: 'MM.dd.y',
      time: 'y-MM-dd HH:mm:ss'
    }
  };
  config = {
    id: 'dialog-service',
    width: '346px',
    maxHeight: '600px',
    zIndex: 1050,
    backdropCloseable: true,
    html: true,
  };
  payTime = new Date();
  title: string = '新增明细';

  constructor(private elr: ElementRef, private expendService: ExpendService, private messageService: NzMessageService) {
  }

  close(message?: Message) {
    this.data.onClose(message);
  }

  save(){
    this.expend.payTime = this.payTime.getTime();
    this.expendService.save(this.expend).subscribe(res => {
      const message = new Message();
      message.type = res ? 'success' : 'danger';
      if(this.expend.id){
        message.msg = '编辑成功';
        this.messageService.success('编辑成功');
      }else{
        message.msg = '添加成功';
        this.messageService.success('添加成功');
      }
      this.close(message);
    });
  }

  ngOnInit(): void {
    this.expend = this.data.data ? this.data.data : new Expend();
    this.title = this.data.data ? '编辑明细' : '新增明细';
    this.parent = this.elr.nativeElement.parentElement;
  }
}
